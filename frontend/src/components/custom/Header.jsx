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
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
<<<<<<< HEAD
    <>
      <div className="h-7 bg-martinique-950 flex items-center justify-center gap-96">
        <span className="text-slate-400 text-sm flex items-center justify-center mr-64">
          <Check className="h-4 w-4 mr-1" />
          Free shippin for orders over 50$
        </span>
        <span>
          <NavigationMenu className="text-slate-400 flex justify-center items-center ">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <Select>
                  <SelectTrigger className="border-none h-7 bg-martinique-950 active:outline-none">
                    <SelectValue placeholder="Eng" />
                  </SelectTrigger>
                  <SelectContent className="bg-martinique-950 text-slate-400 border-none rounded-t-none">
                    <SelectItem
                      value="light"
                      className="hover:bg-blue-950 focus:text-white"
                    >
                      Fr
                    </SelectItem>
                    <SelectItem
                      value="dark"
                      className="hover:bg-blue-950 focus:text-white"
                    >
                      Ar
                    </SelectItem>
                    <SelectItem
                      value="system"
                      className="focus:text-white hover:bg-blue-950 "
                    >
                      Eng
                    </SelectItem>
                  </SelectContent>
                </Select>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="/#">
                  <NavigationMenuLink className="text-sm flex items-center justify-center">
                    Faqs
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem className="flex items-center justify-center">
                <Info className="w-4 h-4 mr-1" />
                <a href="/#">
                  <NavigationMenuLink className="text-sm flex items-center justify-center">
                    Need Help
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </span>
      </div>
      <div className="h-16 bg-porcelain-100 flex items-center justify-around ">
        <img src={Logo} alt="" className="h-10 w-40" />
        <div className="bg-white border border-input rounded-md px-3 flex justify-center items-center">
          <Input
            type="text"
            placeholder="Search Here"
            className="w-96 outline-none"
          />
          <SearchIcon
            className="w-7 h-7 bg-white border-none ring-offset-background mr-2"
            color="#413c73"
          />
=======
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
>>>>>>> master
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
<<<<<<< HEAD
      </div>
      <div className="bg-white h-16 border flex justify-around">
        <NavigationMenu>
          <NavigationMenuList className="gap-3 text-gray-400 text-sm ">
            <NavigationMenuItem>
              <Select>
                <SelectTrigger className=" h-7 px-6 py-4 w-40 bg-white border border-gray-400 active:outline-none ">
                  <SelectValue
                    placeholder="All Categories"
                    className="placeholder-black"
                  />
                </SelectTrigger>
                <SelectContent className="bg-white text-slate-400 border-none rounded-t-none ">
                  <SelectItem
                    value="all_Categories"
                    className="hover:bg-slate-300 focus:text-slate-500 transition duration-300 w-40"
                  >
                    All Categories
                  </SelectItem>
                  <SelectItem
                    value="sofa"
                    className="hover:bg-slate-300 focus:text-slate-500 w-40"
                  >
                    Sofa
                  </SelectItem>
                  <SelectItem
                    value="arm_chair"
                    className="hover:bg-slate-300 focus:text-slate-500 w-40"
                  >
                    Arm Chair
                  </SelectItem>
                  <SelectItem
                    value="wing_chair"
                    className="hover:bg-slate-300 focus:text-slate-500 w-40"
                  >
                    Wing Chair
                  </SelectItem>
                  <SelectItem
                    value="desk_chair"
                    className="hover:bg-slate-300 focus:text-slate-500 w-40"
                  >
                    Desk Chair
                  </SelectItem>
                  <SelectItem
                    value="wooden_chair"
                    className="hover:bg-slate-300 focus:text-slate-500 w-40"
                  >
                    Wooden Chair
                  </SelectItem>
                  <SelectItem
                    value="park_bench"
                    className="hover:bg-slate-300 focus:text-slate-500 w-40"
                  >
                    Park Bench
                  </SelectItem>
                </SelectContent>
              </Select>
            </NavigationMenuItem>
            <NavigationMenuItem className="hover:text-blue-lagoon-800">
              <a href="/">
                <NavigationMenuLink>Home</NavigationMenuLink>
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem className="hover:text-blue-lagoon-800">
              <a href="/#">
                <NavigationMenuLink>New Arrivals</NavigationMenuLink>
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem className="hover:text-blue-lagoon-800">
              <a href="/#">
                <NavigationMenuLink>Sales/Offer</NavigationMenuLink>
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-64 flex justify-center items-center">
          <span className="text-sm text-gray-400">
=======
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
>>>>>>> master
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
          <Link
            to="#"
            className="flex items-center space-x-1 text-gray-900 hover:text-red-600 border-r pr-2"
          >
            <HeartIcon className="w-5 h-5" />
            <span className="ml-1 text-sm">0</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center space-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            <UserCircleIcon className="w-7 h-7" />
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10 bg-black bg-opacity-25" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-20 w-full max-w-sm bg-white p-6 sm:ring-1 sm:ring-gray-900/10">
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
          <div className="mt-6">
            <div className="space-y-6">
              <Disclosure as="div">
                <DisclosureButton className="flex items-center justify-between w-full text-sm font-semibold leading-6 text-gray-900">
                  Services
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 flex-none"
                  />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2">
                  {services.map((item) => (
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
              {/* Watchlist and Cart */}
              <Link
                to="#"
                className="block flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-red-600"
              >
                <HeartIcon className="w-5 h-5 mr-2" />
                Watchlist
              </Link>
              <Link
                to="#"
                className="block flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
              >
                <ShoppingCartIcon className="w-5 h-5 mr-2" />
                Add to Cart
              </Link>
              <Link
                to="/signin"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Sign in
              </Link>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Header;
