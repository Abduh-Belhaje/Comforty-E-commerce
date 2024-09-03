import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./auth/sign-in/index.jsx";
import Home from "./pages/home/index.jsx";
import ProtectedRoute from "./hooks/ProtectedRoute.jsx";
import SignUpPage from "./auth/sign-up/index.jsx";
import { UserProvider } from "./contexte/UserContext.jsx";

import { Toaster } from "@/components/ui/sonner";
import Products from "./pages/products/index.jsx";
import UserProfile from "./auth/user-profile/[user-profile]/index.jsx";
import Product from "./pages/products/product/[productId]/index.jsx";
import ProductPage from "./pages/products/product/[productId]/index.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
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
    path: "/profile",
    element: <UserProfile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <UserProvider>
        <RouterProvider router={router} />
        <Toaster />
      </UserProvider>
    </ClerkProvider>
  </React.StrictMode>
);
