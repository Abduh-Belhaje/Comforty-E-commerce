import React, { createContext, useState, useEffect, useContext } from "react";
import RecentProducts from "../services/productsService";
import getCategories from "../services/productsService";

// Create a context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Load watchlist from localStorage when the app initializes
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
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

  // Function to fetch recent products
  const getRecentProducts = async () => {
    try {
      const products = await RecentProducts(); // Call the service
      setRecentProducts(products); // Store recent products in state
    } catch (error) {
      console.error("Failed to fetch recent products:", error);
    }
  };
  const getALlCategories = async () => {
    try {
      const products = await getCategories(); // Call the service
      setRecentProducts(products); // Store recent products in state
    } catch (error) {
      console.error("Failed to fetch recent products:", error);
    }
  };

  // Fetch recent products on component mount (only once)
  useEffect(() => {
    getRecentProducts(); // Call the function to fetch recent products
  }, []); // Empty dependency array ensures it runs only once

  // Add a product to the watchlist
  const addToWatchlist = (product) => {
    setWatchlist((prev) => {
      // Check if the product is already in the watchlist
      const isProductInWatchlist = prev.some(
        (item) => item.name === product.name
      );
      if (isProductInWatchlist) return prev; // No duplicates

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

  return (
    <ProductContext.Provider
      value={{
        watchlist,
        recentProducts, // Expose recent products
        addToWatchlist,
        removeFromWatchlist,
        categories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export function useProductContext() {
  return useContext(ProductContext);
}
