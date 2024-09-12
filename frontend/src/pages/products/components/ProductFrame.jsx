import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useProductContext } from "../../../contexte/ProductContext";

function ProductFrame({ product }) {
  const { watchlist, addToWatchlist, removeFromWatchlist, addToBag } =
    useProductContext();

  const isInWatchlist = (productName) => {
    return watchlist.some((item) => item.name === productName);
  };

  const handleWatchlistToggle = (product) => {
    if (isInWatchlist(product.name)) {
      removeFromWatchlist(product.name);
    } else {
      addToWatchlist(product);
    }
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/products/${product.name}`} className="block">
        <div className="relative">
          <div className="aspect-w-1 aspect-h-1 h-72 w-full object-cover overflow-hidden rounded-lg">
            <img
              src={product.image_url}
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
                  isInWatchlist(product.name) ? "text-red-500" : "text-gray-500"
                }`}
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="absolute top-2 left-2">
            <p
              className={`text-xs font-semibold ${
                product.status === "NEW" ? "bg-green-100 text-green-800" : ""
              } rounded-full px-2 py-1`}
            >
              {product.status !== "AVAILABLE" && product.status}
            </p>
          </div>
        </div>
        <div className="p-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 truncate">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <p className="text-lg font-medium text-gray-700">
              {product.price ? `$${product.price}` : "$0"}
            </p>
            <div className="flex justify-end">
              <Button
                onClick={() => addToBag(product)}
                className="flex justify-end items-center gap-1 p-2 text-gray-500 hover:text-green-500 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-green-50"
                aria-label="Add to Bag"
              >
                <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                <span className="text-sm">Add to Bag</span>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductFrame;
