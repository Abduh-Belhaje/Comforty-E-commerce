import { useEffect } from "react";
import { useProductContext } from "../../contexte/ProductContext";
import {
  getChairsByCategory,
  getAllProducts,
} from "../../services/productsService";
import ChairPagination from "./components/ChairPagination";
import Filter from "./components/Filter";
import ListOfProduct from "./components/ListOfProduct";
import RecentlyAdded from "./components/RecentlyAdded";

function Products() {
  const { recentProducts, selectedCategory, setChairs } = useProductContext();

  // Fetch products by selected category when it changes
  useEffect(() => {
    const fetchChairs = async () => {
      try {
        if (selectedCategory === "all") {
          const allProducts = await getAllProducts(); // Fetch all chairs/products when "all" is selected
          setChairs(allProducts);
        } else if (selectedCategory) {
          const categoryProducts = await getChairsByCategory(selectedCategory);
          setChairs(categoryProducts); // Fetch chairs by category
        }
      } catch (error) {
        console.error("Error fetching chairs:", error);
      }
    };

    fetchChairs(); // Call the function to fetch products
  }, [selectedCategory, setChairs]); // Dependency array to re-run when selectedCategory changes

  return (
    <div className="mb-40">
      <RecentlyAdded recentProducts={recentProducts} />
      <Filter />

      {/* Product list */}
      <ListOfProduct />

      {/* Pagination for chairs */}
      <ChairPagination />
    </div>
  );
}

export default Products;
