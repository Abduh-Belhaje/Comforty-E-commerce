import ChairPagination from "./components/ChairPagination";
import Filter from "./components/Filter";
import ListOfProduct from "./components/ListOfProduct";

function Products() {
  return (
    <div>
      {/* product filter */}
      <Filter />

      {/* product list */}
      <ListOfProduct />
      <ChairPagination />
    </div>
  );
}

export default Products;
