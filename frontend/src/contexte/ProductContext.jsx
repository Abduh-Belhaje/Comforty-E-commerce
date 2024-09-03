import React, { createContext, useState, useEffect, useContext } from "react";

// Create a context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage when the app initializes
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
  }, []);

  useEffect(() => {
    try {
      if (watchlist.length != 0) {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
      }
    } catch (error) {
      console.error("Failed to save watchlist to localStorage", error);
    }
  }, [watchlist]);

  // Add a product to the watchlist
  const addToWatchlist = (product) => {
    console.log(watchlist);

    setWatchlist((prev) => {
      // Check if the product is already in the watchlist
      const isProductInWatchlist = prev.some((item) => item.id === product.id);
      if (isProductInWatchlist) return prev; // No duplicates

      const updatedWatchlist = [...prev, product];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  // Remove a product from the watchlist
  const removeFromWatchlist = (productId) => {
    setWatchlist((prev) => {
      const updatedWatchlist = prev.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  return (
    <ProductContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export function useProductContext() {
  return useContext(ProductContext);
}
