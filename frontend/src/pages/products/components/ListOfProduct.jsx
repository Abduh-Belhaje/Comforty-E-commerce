import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button"; // Adjust the import path as necessary
import { useProductContext } from "../../../contexte/ProductContext"; // Adjust the import path as necessary

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
  if (selectedCategory) {
    // console.log("reda");
    // const respone = getChairsByCategory(selectedCategory);
    // console.log(respone);
  }
  // Add a product to the bag
  const addToBag = (product) => {
    setBag((prev) => [...prev, product]);
  };

  useEffect(() => {
    if (selectedCategory) {
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Chairs</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {chairs.map((product) => (
            <div
              key={product.name} // Use product.name as the key
              className="group relative bg-white border rounded-lg shadow-sm overflow-hidden"
            >
              <Link to={`/products/${product.name}`} className="block">
                <div className="relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                    <img
                      src={product.image_url} // Ensure image_url is correct
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>

                  <div className="absolute top-2 right-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevents link navigation
                        handleWatchlistToggle(product);
                      }}
                      className={`flex items-center justify-center p-2 border border-gray-300 rounded-full bg-white shadow-sm ${
                        isInWatchlist(product.name)
                          ? "text-red-500 hover:bg-red-50"
                          : "text-gray-500 hover:text-red-500"
                      }`}
                      aria-label="Toggle Watchlist"
                    >
                      <HeartIcon
                        className={`h-6 w-6 ${
                          isInWatchlist(product.name)
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div className="absolute top-2 left-2">
                    <p className="text-xs font-semibold bg-green-100 text-green-800 rounded-full px-2 py-1">
                      {product.status}
                    </p>{" "}
                    {/* Added status display */}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {product.description}
                  </p>
                  <p className="text-lg font-medium text-gray-700 mt-1">
                    {product.price ? `$${product.price}` : "$0"}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={(e) => {
                        e.preventDefault(); // Prevents link navigation
                        addToBag(product);
                      }}
                      className="flex justify-end items-center gap-1 p-2 text-gray-500 hover:text-green-500 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-green-50"
                      aria-label="Add to Bag"
                    >
                      <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                      <span className="text-sm">Add to Bag</span>
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
