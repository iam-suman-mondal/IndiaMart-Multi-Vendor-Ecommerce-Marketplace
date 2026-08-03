import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

import banner1 from "../images/HomeAppliances.jpeg";
import banner2 from "../images/MobileLaptop.jpeg";
import banner3 from "../images/Perfume.jpeg";

// Demo Data
const banners = [
  {
    image: banner1,
    title: "HomeAppliances Sale",
  },
  {
    image: banner2,
    title: "MobileLaptop Deals",
  },
  {
    image: banner3,
    title: "Perfume Essentials",
  },
];

// Reusable Banner Slider Component
function BannerSlider({ banners }) {
  return (
    <>
      <style>{`
        /* Reduced Responsive Heights */
        .responsive-banner-img {
          width: 100%;
          height: 180px; /* Mobile height */
          object-fit: cover;
          display: block;
        }

        @media (min-width: 576px) {
          .responsive-banner-img {
            height: 220px; /* Small tablets */
          }
        }

        @media (min-width: 768px) {
          .responsive-banner-img {
            height: 260px; /* Tablets */
          }
        }

        @media (min-width: 992px) {
          .responsive-banner-img {
            height: 350px; /* Desktop */
          }
        }
      `}</style>

      <Swiper
        modules={[Autoplay]}
        loop={true}
        allowTouchMove={true}
        grabCursor={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="home-banner-swiper overflow-hidden shadow-sm"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner.image}
              alt={banner.title}
              className="responsive-banner-img"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default function HomeBanner() {
  return (
    <div className="container-fluid p-0 my-2">
      <BannerSlider banners={banners} />
    </div>
  );
}