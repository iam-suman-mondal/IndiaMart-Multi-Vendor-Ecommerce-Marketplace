import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import banner1 from "../images/tempBanner.jpg";
import banner2 from "../images/tempBanner.jpg";
import banner3 from "../images/tempBanner.jpg";

// Demo Data
const banners = [
  {
    image: banner1,
    title: "Electronics Sale",

  },
  {
    image: banner2,
    title: "Fashion Deals",

  },
  {
    image: banner3,
    title: "Home Essentials",
   
  },
];

// Reusable Component
function BannerSlider({ banners, height = "250px" }) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
            <img
              src={banner.image}
              alt={banner.title}
              className="w-100 mt-3"
              style={{
                height: 300,
                objectFit: "cover",
                display:"block",
              }}
            />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default function HomeBanner() {
  return (
    <div className="container-fluid p-0 m-0">
      <BannerSlider banners={banners} height="300px" />
    </div>
  );

}