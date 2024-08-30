import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import {
  Check,
  Info,
  Heart,
  ShoppingCart,
  User2,
  SearchIcon,
} from "lucide-react";

import Logo from "@/assets/Logo.png";

import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="h-11 bg-martinique-950 flex items-center justify-center gap-96">
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
      <div className="h-20 bg-porcelain-100 flex items-center justify-around ">
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
        </div>
        <div>
          <Button variant="outline">
            <ShoppingCart className="w-4 h-4 mr-1" /> Cart
          </Button>
          <Button variant="outline">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="outline" as={Link} to="/">
            <User2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="bg-white h-75 border flex justify-around">
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
            Contact
            <span className="text-gray-800 font-semibold"> (808)555-0111</span>
          </span>
        </div>
      </div>
    </>
  );
}
