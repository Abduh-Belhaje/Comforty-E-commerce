import React from "react";
import { useProductContext } from "../../../contexte/ProductContext";
import ProductFrame from "./productFrame";

function RecentlyAdded() {
  const { recentProducts} = useProductContext();

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Recently Added
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {recentProducts.map((item) => (
            <ProductFrame key={item.name} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentlyAdded;
