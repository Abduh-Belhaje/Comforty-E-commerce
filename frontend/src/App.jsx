import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import AlertDialogComponent from "./components/custom/AlertDialogComponent";
import Footer from "./components/custom/Footer";
import { ProductProvider } from "./contexte/ProductContext";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    const storedPath = sessionStorage.getItem("previousPath");

    if (storedPath) {
      setPathname(storedPath);
      setShowAlert(true);
      sessionStorage.removeItem("previousPath");
    }
  }, []);

  return (
    <>
      <ProductProvider>
        <Header />
        <Outlet />
        <AlertDialogComponent
          open={showAlert}
          onClose={() => setShowAlert(false)}
          pathname={pathname} // Pass pathname as a prop
        />
        <Footer />
      </ProductProvider>
    </>
  );
}

export default App;
