import React from "react";
import { useProductContext } from "../../../contexte/ProductContext";
import { FilterIcon } from "lucide-react";

function Filter() {
  const { categories, selectedCategory, setSelectedCategory } =
    useProductContext();
  console.log(selectedCategory);

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md flex items-center space-x-4">
      <FilterIcon className="h-6 w-6 text-gray-500" />
      <div className="flex-1">
        <ul className="flex flex-wrap">
          {/* "All" category item */}
          <li
            key="all"
            className={`cursor-pointer px-4 py-2 rounded-lg transition-colors mx-1 my-1 ${
              selectedCategory === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-blue-200"
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </li>

          {/* Map through categories */}
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer px-4 py-2 rounded-lg transition-colors mx-1 my-1 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-blue-200"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Filter;
