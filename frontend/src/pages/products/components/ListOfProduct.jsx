import React, { useEffect, useState } from "react";
import { useProductContext } from "../../../contexte/ProductContext"; // Adjust the import path as necessary
import ProductFrame from "./ProductFrame";

export default function ListOfProduct() {
  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    getChairsByCategory,
    chairs,
    selectedCategory,
  } = useProductContext(); // Ensure chairs is available in context
  const [bag, setBag] = useState([]);

  // Add a product to the bag
  const addToBag = (product) => {
    setBag((prev) => [...prev, product]);
  };

  useEffect(() => {
    if (selectedCategory) {
      //
    }
  }, []);
  // Check if a product is in the watchlist
  const isInWatchlist = (productName) => {
    return watchlist.some((product) => product.name === productName);
  };

  // Handle watchlist toggle
  const handleWatchlistToggle = (product) => {
    if (isInWatchlist(product.name)) {
      removeFromWatchlist(product.name);
    } else {
      addToWatchlist(product);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Chairs</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {chairs.map((item) => (
            <ProductFrame key={item.name} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
