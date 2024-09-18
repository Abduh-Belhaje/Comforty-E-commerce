import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, ShoppingCart, Heart, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/Logo.png";
import { useProductContext } from "../../contexte/ProductContext";

export default function Header() {
  const [accessToken, setAccessToken] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist, bag, removeFromBag } =
    useProductContext();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children }) => (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={to}
        className={`text-sm font-semibold leading-6 ${
          isActive(to)
            ? "text-primary"
            : "text-muted-foreground hover:text-primary"
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );

  const NavIcon = ({ icon: Icon, count, onClick, ariaLabel }) => (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className="relative"
        aria-label={ariaLabel}
      >
        <Icon className="h-5 w-5" />
        {count > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
          >
            {count}
          </Badge>
        )}
      </Button>
    </motion.div>
  );

  const SidebarContent = ({ title, items, onRemove }) => (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
      </SheetHeader>
      <div className="flex-grow overflow-auto py-4">
        {items.length > 0 ? (
          <ul className="space-y-4">
            {items.map((item) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    {item.price && <span>${item.price.toFixed(2)}</span>}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </Button>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground">No items yet</p>
        )}
      </div>
      {title === "Your Cart" && items.length > 0 && (
        <div className="pt-4 border-t">
          <Button className="w-full" onClick={() => navigate("/order")}>
            Order Now
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <motion.header
      className="bg-background shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <motion.div
            className="flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={Logo} alt="Your Company" />
            </Link>
          </motion.div>
          <div className="hidden sm:flex sm:space-x-8">
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <NavIcon
                  icon={ShoppingCart}
                  count={bag.length}
                  ariaLabel="Shopping cart"
                />
              </SheetTrigger>
              <SheetContent>
                <SidebarContent
                  title="Your Cart"
                  items={bag}
                  onRemove={(id) => removeFromBag(id)}
                />
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <NavIcon
                  icon={Heart}
                  count={watchlist.length}
                  ariaLabel="Watchlist"
                />
              </SheetTrigger>
              <SheetContent>
                <SidebarContent
                  title="Your Watchlist"
                  items={watchlist}
                  onRemove={(id) => removeFromWatchlist(id)}
                />
              </SheetContent>
            </Sheet>
            {accessToken ? (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/userProfile/user-information">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/auth/sign-in">
                  <Button variant="ghost">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex-grow py-4">
                  <div className="space-y-4">
                    <NavLink to="/products">Products</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
                <div className="pt-4 border-t flex justify-between">
                  <NavIcon
                    icon={ShoppingCart}
                    count={bag.length}
                    ariaLabel="Shopping cart"
                    onClick={() => console.log("Cart clicked")} // Debugging line
                  />
                  <NavIcon
                    icon={Heart}
                    count={watchlist.length}
                    ariaLabel="Watchlist"
                    onClick={() => console.log("Watchlist clicked")} // Debugging line
                  />
                  {accessToken ? (
                    <Link to="/userProfile/user-information">
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth/sign-in">
                      <Button variant="ghost">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
