import React from "react";
import SliderSection from "./components/products-slider";
import Sponsors from "./components/Sponsors";
import RecentlyAdded from "./../products/components/RecentlyAdded";

import TestimonialSection from "./components/testimonial-section";

export default function Home() {
  return (
    <div>
      {/* ProductsSlider */}
      <SliderSection />
      {/* SPonsor */}
      <Sponsors />
      {/* Featured product */}
      <RecentlyAdded />
      {/* Testimonial */}
      <TestimonialSection />
    </div>
  );
}
