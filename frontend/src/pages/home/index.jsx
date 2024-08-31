import BannerCarousel from "./components/bannerCarousel";
import { useUser } from "@clerk/clerk-react";
import React from "react";

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <BannerCarousel />
    </div>
  );
}
