import { Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import Footer from "./components/custom/Footer";
import { ProductProvider } from "./contexte/ProductContext";

function App() {

  return (
    <>
      <ProductProvider>
        <Header />
        <Outlet />
        <Footer />
      </ProductProvider>
    </>
  );
}

export default App;
