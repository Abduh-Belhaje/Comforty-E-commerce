import Filter from "./components/filter";
import ListOfProduct from "./components/listOfProduct";

function Products() {
  return (
    <div>
      {/* product filter */}
      <Filter />

      {/* product list */}
      <ListOfProduct />
    </div>
  );
}

export default Products;
