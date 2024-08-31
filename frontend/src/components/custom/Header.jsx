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
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";

const products = [
  {
    name: "prd1",
    description: "Get a better understanding of your traffic",
    to: "/prd1",
    icon: ChartPieIcon,
  },
  {
    name: "prd2",
    description: "Speak directly to your customers",
    to: "/prd2",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "prd3",
    description: "Your customers’ data will be safe and secure",
    to: "/prd3",
    icon: FingerPrintIcon,
  },
  {
    name: "prd4",
    description: "Connect with third-party tools",
    to: "/prd4",
    icon: SquaresPlusIcon,
  },
  {
    name: "prd5",
    description: "Build strategic funnels that will convert",
    to: "/prd5",
    icon: ArrowPathIcon,
  },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white">
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
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Products
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                      />
                    </div>
                    <div className="flex-auto">
                      <Link
                        to={item.to}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
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
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          <Button
            variant="none"
            className="flex items-center space-x-1 text-gray-900 hover:text-indigo-600"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span className="ml-1 text-sm">0</span>{" "}
            {/* Placeholder for cart count */}
          </Button>
          <Link
            to="#"
            className="text-gray-900 hover:text-red-600 flex border-r pr-2"
          >
            <HeartIcon className="w-5 h-5" />
            <span className="ml-1 text-sm">0</span>{" "}
          </Link>
          <Link
            to="/profile"
            className="flex items-center space-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            <UserCircleIcon className="w-7 h-7" />
          </Link>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10">
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt="Your Company Logo"
                  src={Logo}
                  className="h-6 w-auto"
                  loading="lazy"
                />
              </Link>
              <Button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="flex items-center justify-between w-full text-sm font-semibold leading-6 text-gray-900">
                      Products
                      <ChevronUpDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {products.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <div>
                    <Link
                      to="/about"
                      className={`text-sm font-semibold leading-6 ${
                        isActive("/about") ? "text-indigo-600" : "text-gray-900"
                      }`}
                    >
                      About
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/contact"
                      className={`text-sm font-semibold leading-6 ${
                        isActive("/contact")
                          ? "text-indigo-600"
                          : "text-gray-900"
                      }`}
                    >
                      Contact
                    </Link>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
                  >
                    <UserCircleIcon className="w-8 h-8" />
                  </Link>
                  <div className="py-6 flex items-center justify-between">
                    <Button
                      variant="outline"
                      className="flex items-center space-x-1 text-gray-900 hover:text-indigo-600 mr-2"
                    >
                      <ShoppingCartIcon className="w-5 h-5" />
                      <span className="ml-1 text-sm">0</span>
                    </Button>
                    <Button
                      to="#"
                      className="text-gray-900 hover:text-red-600"
                      variant="outline"
                    >
                      <HeartIcon className="w-5 h-5" />
                      <span className="ml-1 text-sm">0</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
}

export default Header;
