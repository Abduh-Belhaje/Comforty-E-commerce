import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  HeartIcon,
  ShoppingCartIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/assets/Logo.png";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useProductContext } from "../../contexte/ProductContext";

const services = [
  {
    name: "Service1",
    description: "Get a better understanding of your traffic",
    to: "/service1",
    icon: ChartPieIcon,
  },
  {
    name: "Service2",
    description: "Speak directly to your customers",
    to: "/service2",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Service3",
    description: "Your customers’ data will be safe and secure",
    to: "/service3",
    icon: FingerPrintIcon,
  },
  {
    name: "Service4",
    description: "Connect with third-party tools",
    to: "/service4",
    icon: SquaresPlusIcon,
  },
  {
    name: "Service5",
    description: "Build strategic funnels that will convert",
    to: "/service5",
    icon: ArrowPathIcon,
  },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const { watchlist, removeFromWatchlist } = useProductContext();

  return (
    <header className="bg-white shadow-sm">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Your Company Logo"
              src={Logo}
              className="h-8 w-auto"
              loading="lazy"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/products"
            className={`text-sm font-semibold leading-6 ${
              isActive("/products") ? "text-indigo-600" : "text-gray-900"
            }`}
          >
            Products
          </Link>
          <div className="relative">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
            >
              Categories
              <ChevronDownIcon
                aria-hidden="true"
                className={`h-5 w-5 flex-none text-gray-400 transition-transform ${
                  categoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {categoriesOpen && (
              <div className="absolute left-0 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {services.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="group relative flex items-center gap-x-4 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        />
                      </div>
                      <div className="flex-auto">
                        <p className="font-semibold text-gray-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
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
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <Button
            variant="none"
            className="flex items-center space-x-1 text-gray-900 hover:text-indigo-600"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span className="ml-1 text-sm">0</span>
          </Button>
          <button
            onClick={() => setWatchlistOpen(true)} // Open the sidebar on click
            className="relative flex items-center space-x-1 text-gray-900 hover:text-red-600 border-r pr-2"
          >
            <HeartIcon className="w-5 h-5" />
            <span className=" text-sm"></span>
            {watchlist.length > 0 && (
              <span className="absolute top-0 bottom-1.5 left-2 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {watchlist.length}
              </span>
            )}
          </button>
          <Link
            to="/profile"
            className="flex items-center space-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
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
                className="rounded-md p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
                        onClick={() => removeFromWatchlist(item.id)}
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

      <Dialog
        as="div"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <Dialog.Panel
          focus="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-white px-6 py-6 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="Your Company Logo"
                src={Logo}
                className="h-8 w-auto"
                loading="lazy"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/products"
                  className={`block text-sm font-semibold leading-6 ${
                    isActive("/products") ? "text-indigo-600" : "text-gray-900"
                  }`}
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  className={`block text-sm font-semibold leading-6 ${
                    isActive("/about") ? "text-indigo-600" : "text-gray-900"
                  }`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`block text-sm font-semibold leading-6 ${
                    isActive("/contact") ? "text-indigo-600" : "text-gray-900"
                  }`}
                >
                  Contact
                </Link>
              </div>
              <div className="mt-6 space-y-6">
                <Button
                  variant="none"
                  className="w-full flex items-center justify-between text-gray-900 hover:text-indigo-600"
                >
                  <span>Cart</span>
                  <span>0</span>
                </Button>
                <Button
                  variant="none"
                  onClick={() => setWatchlistOpen(true)} // Open the sidebar on click
                  className="w-full flex items-center justify-between text-gray-900 hover:text-red-600"
                >
                  <span>Watchlist</span>
                  <span>{watchlist.length}</span>
                </Button>
                <Link
                  to="/profile"
                  className="w-full flex items-center justify-between text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Header;
