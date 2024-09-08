import React from "react";
import SLiderSection from "./components/products-slider";
import RecentlyAdded from "../products/components/RecentlyAdded";
import CategoriesSection from "./components/products-slider/components/CategoriesSection";

export default function Home() {
  return (
    <div className="container">
      {/* Products SLider */}
      <SLiderSection />
      {/* Sponsor */}
      {/* Recently Products */}
      {/* <RecentlyAdded /> cmp */}
      {/* Categories */}
      <CategoriesSection />

      {/* Testimonials */}
    </div>
  );
}
