import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./auth/sign-in/index.jsx";
import Home from "./pages/home/index.jsx";
import SignUpPage from "./auth/sign-up/index.jsx";
import { Toaster } from "@/components/ui/sonner";
import Products from "./pages/products/index.jsx";
import ProductPage from "./pages/products/product/[productId]/index.jsx";
import OrderPage from "./pages/orders/index.jsx";

import UserInformation from "./auth/user-profile/components/UserInformation.jsx";
import UserProfile from "./auth/user-profile/index.jsx";
import Orders from "./auth/user-profile/components/Orders.jsx";
import Watchlist from "./auth/user-profile/components/Watchlist.jsx";
import { ProductProvider } from "./contexte/ProductContext.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/userProfile",
    element: <UserProfile />,
    children: [
      {
        path: "user-information",
        element: <UserInformation />,
      },

      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "watchlist",
        element: <Watchlist />,
      },
      // {
      //   path: "info",
      //   element: <ProfileInfo />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ProductProvider>
  </React.StrictMode>
);
