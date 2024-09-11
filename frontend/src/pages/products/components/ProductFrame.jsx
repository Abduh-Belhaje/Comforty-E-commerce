import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useProductContext } from "../../../contexte/ProductContext";

function ProductFrame(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {watchlist, addToWatchlist, removeFromWatchlist } = useProductContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks
   const [bag, setBag] = useState([]);

  // Add a product to the bag
    const addToBag = (product) => {
        setBag((prev) => [...prev, product]);
    };

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
    <div
        key={props.product.name} // Using props.name as key
              className="group relative bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to={`/products/${props.product.name}`} className="block">
                <div className="relative">
                  <div className="aspect-w-1 aspect-h-1 h-72 w-full object-cover overflow-hidden rounded-lg">
                    <img
                      // eslint-disable-next-line react/prop-types
                      src={props.product.image_url} // Corrected image_url reference
                      alt={props.product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>

                  <div className="absolute top-2 right-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevents link navigation
                        handleWatchlistToggle(props.product);
                      }}
                      className={`flex items-center justify-center p-2 border border-gray-300 rounded-full bg-white shadow-sm ${
                        isInWatchlist(props.product.name)
                          ? "text-red-500 hover:bg-red-50"
                          : "text-gray-500 hover:text-red-500"
                      }`}
                      aria-label="Toggle Watchlist"
                    >
                      <HeartIcon
                        className={`h-6 w-6 ${
                          isInWatchlist(props.product.name)
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div className="absolute top-2 left-2">
                    <p className={`text-xs font-semibold  ${props.product.status == "NEW" && "bg-green-100 text-green-800"}  rounded-full px-2 py-1`}>
                      {props.product.status ==! "AVAILABLE" && props.product.status}
                    </p>{" "}
                    {/* Added status display */}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {props.product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {props.product.description}
                  </p>
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-lg font-medium text-gray-700">
                        {props.product.price ? `$${props.product.price}` : "$0"}
                      </p>
                      <div className="flex justify-end">
                        <Button
                          onClick={(e) => {
                            e.preventDefault(); // Prevents link navigation
                            addToBag(props);
                          }}
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
  )
}

export default ProductFrame