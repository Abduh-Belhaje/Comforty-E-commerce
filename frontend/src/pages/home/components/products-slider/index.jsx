import React from "react";
import Product from "./components/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function SliderSection() {
  return (
    <div className=" ">
      <Swiper
        spaceBetween={20}
        slidesPerView={1} // Show one slide at a time
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="mySwiper"
      >
        <SwiperSlide className="flex items-center justify-center bg-white rounded-lg shadow-md p-4">
          <div className="relative  max-w-full mx-auto">
            <Product />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center bg-white rounded-lg shadow-md p-4">
          <div className="relative w-[740px] h-[850px] max-w-full mx-auto md:w-[1400px] md:h-[700px] sm:w-[1000px] sm:h-[500px]">
            <Product />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center bg-white rounded-lg shadow-md p-4">
          <div className="relative w-[1740px] h-[850px] max-w-full mx-auto md:w-[1400px] md:h-[700px] sm:w-[1000px] sm:h-[500px]">
            <Product />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SliderSection;
