import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Added useLocation
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Logo from "@/assets/Logo.png";
import { Box, ListOrderedIcon, User, WatchIcon } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate(); // Initialize navigation
  const location = useLocation(); // Get the current route path

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      {/* Sidebar Header with Logo */}
      <div className="mb-4 p-4 border-b border-gray-200 flex items-center">
        <img alt="Your Company Logo" src={Logo} className="h-8 w-auto mr-2" />
      </div>

      {/* List of Links */}
      <List className="space-y-2">
        {/* Profile */}
        <ListItem
          onClick={() => navigate("/userProfile/user-information")}
          className={`cursor-pointer hover:bg-gray-100 transition-colors rounded-lg ${
            isActive("/userProfile/user-information") ? "bg-blue-100" : ""
          }`}
        >
          <ListItemPrefix className="mr-2">
            <User className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem
          onClick={() => navigate("/userProfile/orders")}
          className={`cursor-pointer hover:bg-gray-100 transition-colors rounded-lg ${
            isActive("/userProfile/orders") ? "bg-blue-100" : ""
          }`}
        >
          <ListItemPrefix className="mr-2">
            <Box className="h-5 w-5" />
          </ListItemPrefix>
          Orders
        </ListItem>
        <ListItem
          onClick={() => navigate("/userProfile/watchlist")}
          className={`cursor-pointer hover:bg-gray-100 transition-colors rounded-lg ${
            isActive("/userProfile/watchlist") ? "bg-blue-100" : ""
          }`}
        >
          <ListItemPrefix className="mr-2">
            <WatchIcon className="h-5 w-5" />
          </ListItemPrefix>
          Watchlist
        </ListItem>
      </List>
    </Card>
  );
}

export default Sidebar;
