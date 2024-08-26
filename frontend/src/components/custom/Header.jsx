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
                      Es
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
          <Button variant="outline">
            <User2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="container mx-auto flex justify-center">
        <NavigationMenu className="bg-red-600 justify-center">
          <NavigationMenuList className="gap-3">
            <NavigationMenuItem>
              <a href="/#">
                <NavigationMenuLink>Home</NavigationMenuLink>
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a href="/#">
                <NavigationMenuLink>Shop</NavigationMenuLink>
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a href="/#">
                <NavigationMenuLink>Product</NavigationMenuLink>
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>Contact (808)555-0111</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
