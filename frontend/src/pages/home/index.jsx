import BannerCarousel from "./components/bannerCarousel";
import Feature from "../../assets/Feature.png";
import { useUser } from "@clerk/clerk-react";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <BannerCarousel />
      </div>
      <div className="absolute flex justify-center align-center border-black ">
        <img src={Feature} className="border border-black " />
      </div>
    </>
  );
}
