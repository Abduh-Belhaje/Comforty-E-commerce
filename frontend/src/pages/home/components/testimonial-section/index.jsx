import React from "react";
import UserReview from "./components/UserReview";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function TestimonialSection() {
  return (
    <div className="py-16">
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
              <UserReview />
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center bg-white rounded-lg shadow-md p-4">
            <div className="relative max-w-full mx-auto ">
              <UserReview />
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center bg-white rounded-lg shadow-md p-4">
            <div className="relative  max-w-full mx-auto">
              <UserReview />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default TestimonialSection;
