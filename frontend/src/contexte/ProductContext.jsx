import React, { createContext, useState, useEffect, useContext } from "react";
import {
  RecentProducts,
  getCategories,
  getAllProducts,
  nbOfChairs,
} from "../services/productsService";

// Create a context
const ProductContext = createContext();
// Create a provider component
export const ProductProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [chairs, setChairs] = useState([]);
  const [chairsbyCat, setChairsbycat] = useState([]);
  const [totalChairs, setTotalChairs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const chairsPerPage = 8;
  const [bag, setBag] = useState([]); // New bag state

  // Fetch watchlist from localStorage on initial load
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
  }, []);

  // Fetch bag from localStorage on initial load
  useEffect(() => {
    const savedBag = JSON.parse(localStorage.getItem("bag")) || [];
    setBag(savedBag);
  }, []);

  useEffect(() => {
    try {
      if (watchlist.length !== 0) {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
      }
    } catch (error) {
      console.error("Failed to save watchlist to localStorage", error);
    }
  }, [watchlist]);

  useEffect(() => {
    try {
      if (bag.length !== 0) {
        localStorage.setItem("bag", JSON.stringify(bag));
      }
    } catch (error) {
      console.error("Failed to save bag to localStorage", error);
    }
  }, [bag]);

  // Function to fetch recent products
  const getRecentProducts = async () => {
    try {
      const products = await RecentProducts();
      setRecentProducts(products);
    } catch (error) {
      console.error("Failed to fetch recent products:", error);
    }
  };

  // Function to fetch all categories
  const getAllCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Function to fetch all chairs (or products with a specific category)
  const getChairs = async (page = 1, category = selectedCategory) => {
    try {
      const start = (page - 1) * chairsPerPage;
      const products =
        category === "all"
          ? await getAllProducts(start, start + chairsPerPage)
          : await getChairsByCategory(category);
      setChairs(products);
    } catch (error) {
      console.error("Failed to fetch chairs:", error);
    }
  };

  const fetchTotalChairs = async () => {
    try {
      const total = await nbOfChairs();
      setTotalChairs(total);
    } catch (error) {
      console.error("Failed to fetch total number of chairs:", error);
    }
  };

  // Fetch data on component mount (only once)
  useEffect(() => {
    getRecentProducts();
    getAllCategories();
    fetchTotalChairs(); // Fetch total number of chairs for pagination
    getChairs(currentPage);
  }, [currentPage, selectedCategory]);

  // Add a product to the watchlist
  const addToWatchlist = (product) => {
    setWatchlist((prev) => {
      const isProductInWatchlist = prev.some(
        (item) => item.name === product.name
      );
      if (isProductInWatchlist) return prev;

      const updatedWatchlist = [...prev, product];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  // Remove a product from the watchlist
  const removeFromWatchlist = (productName) => {
    setWatchlist((prev) => {
      const updatedWatchlist = prev.filter(
        (product) => product.name !== productName
      );
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  // Add a product to the bag
  const addToBag = (product) => {
    setBag((prev) => {
      const isProductInBag = prev.some((item) => item.name === product.name);
      if (isProductInBag) return prev; // No duplicates

      const updatedBag = [...prev, product];
      localStorage.setItem("bag", JSON.stringify(updatedBag));
      return updatedBag;
    });
  };

  // Remove a product from the bag
  const removeFromBag = (productName) => {
    setBag((prev) => {
      const updatedBag = prev.filter((product) => product.name !== productName);
      localStorage.setItem("bag", JSON.stringify(updatedBag));
      return updatedBag;
    });
  };
  const calculateTotal = () => {
    return bag.reduce((total, item) => total + item.price, 0);
  };

  return (
    <ProductContext.Provider
      value={{
        calculateTotal,
        watchlist,
        recentProducts,
        categories,
        selectedCategory,
        setSelectedCategory,
        chairs,
        setChairs,
        getChairs,
        currentPage,
        setCurrentPage,
        totalChairs,
        chairsPerPage,
        addToWatchlist,
        removeFromWatchlist,
        bag,
        addToBag,
        removeFromBag,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export function useProductContext() {
  return useContext(ProductContext);
}
