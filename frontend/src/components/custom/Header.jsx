import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  ChevronDownIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/assets/Logo.png";
import { Link, useLocation } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { useProductContext } from "../../contexte/ProductContext";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // New state for cart sidebar
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const { watchlist, removeFromWatchlist, bag, removeFromBag } =
    useProductContext();

  return (
    <header className="bg-white shadow-sm">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:p-6"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="Your Company Logo" src={Logo} className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-gray-900"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-6">
          <Link
            to="/products"
            className={`text-sm font-semibold leading-6 ${
              isActive("/products") ? "text-indigo-600" : "text-gray-900"
            }`}
          >
            Products
          </Link>
          <Link
            to="/about"
            className={`text-sm font-semibold leading-6 ${
              isActive("/about") ? "text-indigo-600" : "text-gray-900"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-semibold leading-6 ${
              isActive("/contact") ? "text-indigo-600" : "text-gray-900"
            }`}
          >
            Contact
          </Link>
        </div>
        <div className=" ml-4 hidden lg:flex lg:items-center lg:space-x-6">
          {/* Cart Icon */}
          <button
            onClick={() => setCartOpen(true)} // Open the cart sidebar on click
            className="relative flex items-center space-x-2 text-gray-900 hover:text-indigo-600"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            {bag.length > 0 && (
              <span className="absolute bottom-3 left-1 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold text-red-100 bg-red-600 rounded-full">
                {bag.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setWatchlistOpen(true)}
            className="relative flex items-center space-x-2 text-gray-900 hover:text-red-600 border-r pr-4"
          >
            <HeartIcon className="w-5 h-5" />
            {watchlist.length > 0 && (
              <span className="absolute bottom-3 left-1 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold text-red-100 bg-red-600 rounded-full">
                {watchlist.length}
              </span>
            )}
          </button>
          <Link
            to="/profile"
            className="flex items-center space-x-2 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            <UserCircleIcon className="w-7 h-7" />
          </Link>
        </div>
      </nav>

      {/* Watchlist Sidebar */}
      {watchlistOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            aria-hidden="true"
            onClick={() => setWatchlistOpen(false)}
          ></div>
          <div className="relative z-50 flex w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Watchlist</h2>
              <button
                type="button"
                onClick={() => setWatchlistOpen(false)}
                className="rounded-md p-2 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 p-4">
              {watchlist.length > 0 ? (
                <ul className="space-y-4">
                  {watchlist.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">{item.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromWatchlist(item.name)}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  Your watchlist is empty.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            aria-hidden="true"
            onClick={() => setCartOpen(false)}
          ></div>
          <div className="relative z-50 flex w-full max-w-xs flex-col overflow-y-auto bg-white ">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="rounded-md p-2 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 p-4">
              {bag.length > 0 ? (
                <div>
                  <ul className="space-y-4">
                    {bag.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between p-3 border-b border-gray-200 rounded-lg  bg-white"
                      >
                        <Link
                          to={`/products/${item.name}`}
                          className="flex items-center space-x-3"
                        >
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg border border-gray-300"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </Link>
                        <button
                          onClick={() => removeFromBag(item.name)} // Make sure to implement removeFromCart function
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex justify-between items-center border-t border-gray-200 pt-4">
                    <Link
                      to="/order"
                      className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-md px-4 py-2"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Your cart is empty.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Dialog
        as="div"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <Dialog.Panel className="fixed inset-0 z-50 overflow-y-auto bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="Your Company Logo" src={Logo} className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2 text-gray-700 hover:text-gray-900"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 space-y-6">
            <Link
              to="/products"
              className={`block rounded-lg py-2 px-3 text-base font-semibold ${
                isActive("/products") ? "text-indigo-600" : "text-gray-900"
              }`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`block rounded-lg py-2 px-3 text-base font-semibold ${
                isActive("/about") ? "text-indigo-600" : "text-gray-900"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block rounded-lg py-2 px-3 text-base font-semibold ${
                isActive("/contact") ? "text-indigo-600" : "text-gray-900"
              }`}
            >
              Contact
            </Link>
            <Link
              to="/profile"
              className="block rounded-lg py-2.5 px-3 text-base font-semibold text-gray-900"
            >
              Log in
            </Link>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Header;
