import React, { useState, useEffect } from "react";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button"; // Adjust the import path as necessary
import { useProductContext } from "../../../contexte/ProductContext"; // Adjust the import path as necessary

// Sample chair products
const products = [
  {
    id: 1,
    name: "Ergonomic Office Chair",
    href: "#",
    price: "$199",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Black ergonomic office chair with adjustable armrests and lumbar support.",
  },
  {
    id: 2,
    name: "Gaming Chair",
    href: "#",
    price: "$299",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt: "Red and black gaming chair with reclining feature and footrest.",
  },
  // More products...
];

export default function ListOfProduct() {
  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useProductContext(); // Correct usage of custom hook
  const [bag, setBag] = useState([]);

  // Add a product to the bag
  const addToBag = (product) => {
    setBag((prev) => [...prev, product]);
  };

  // Check if a product is in the watchlist
  const isInWatchlist = (productId) => {
    return watchlist.some((product) => product.id === productId);
  };

  // Handle watchlist toggle
  const handleWatchlistToggle = (product) => {
    if (isInWatchlist(product.id)) {
      removeFromWatchlist(product.id);
    } else {
      addToWatchlist(product);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white border rounded-lg shadow-sm overflow-hidden p-2"
            >
              <a href={product.href} className="block">
                <div className="relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  {/* Watchlist Button */}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevents link navigation
                        handleWatchlistToggle(product);
                      }}
                      className={`flex items-center justify-center p-2 border border-gray-300 rounded-full bg-white shadow-sm ${
                        isInWatchlist(product.id)
                          ? "text-red-500 hover:bg-red-50"
                          : "text-gray-500 hover:text-red-500"
                      }`}
                      aria-label="Toggle Watchlist"
                    >
                      <HeartIcon
                        className={`h-6 w-6  ${
                          isInWatchlist(product.id)
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-lg font-medium text-gray-700 mt-1">
                    {product.price}
                  </p>
                  <Button
                    onClick={(e) => {
                      e.preventDefault(); // Prevents link navigation
                      addToBag(product);
                    }}
                    className="flex justify-end items-center gap-1 mt-4 p-2 text-gray-500 hover:text-green-500 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-green-50"
                    aria-label="Add to Bag"
                  >
                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="text-sm">Add to Bag</span>
                  </Button>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
