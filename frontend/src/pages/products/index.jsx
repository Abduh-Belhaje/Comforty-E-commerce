import { useProductContext } from "../../contexte/ProductContext";
import RecentProducts from "../../services/productsService";
import ChairPagination from "./components/ChairPagination";
import Filter from "./components/Filter";
import ListOfProduct from "./components/ListOfProduct";
import RecentlyAdded from "./components/RecentlyAdded";

function Products() {
  const { recentProducts, categories } = useProductContext();
  console.log(categories);

  return (
    <div>
      <RecentlyAdded recentProducts={recentProducts} />
      <Filter />

      {/* product list */}
      <ListOfProduct />
      <ChairPagination />
    </div>
  );
}

export default Products;
