import React, { useState } from "react";
import { Link } from "react-router";

// Swiper React Components & Modules
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Mousewheel } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import {
  FaLaptop,
  FaMobileAlt,
  FaTshirt,
  FaHome,
  FaGamepad,
  FaBook,
  FaFootballBall,
  FaCouch,
} from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";
import { MdSmartToy, MdHealthAndSafety } from "react-icons/md";

export default function CategoryTab() {
  // Initial state is strictly null so NO category is selected by default
  const [selectedCategory, setSelectedCategory] = useState(null);

 const categories = [
  { 
    name: "Electronics", 
    icon: <FaLaptop />, 
    category: "ELECTRONICS" 
  },

  { 
    name: "Clothing", 
    icon: <FaTshirt />, 
    category: "CLOTHING" 
  },

  { 
    name: "Home Appliances", 
    icon: <FaHome />, 
    category: "HOME_APPLIANCES" 
  },

  { 
    name: "Books", 
    icon: <FaBook />, 
    category: "BOOKS" 
  },

  { 
    name: "Sports", 
    icon: <FaFootballBall />, 
    category: "SPORTS" 
  },

  { 
    name: "Beauty", 
    icon: <GiLipstick />, 
    category: "BEAUTY" 
  },

  { 
    name: "Grocery", 
    icon: <MdHealthAndSafety />, 
    category: "GROCERY" 
  }
];

  return (
    <>
      <style>{`
        /* On Desktop (992px+): Spreads items out evenly & locks scrolling */
        @media (min-width: 992px) {
          .category-swiper .swiper-wrapper {
            transform: none !important;
            display: flex !important;
            justify-content: space-between !important;
            width: 100% !important;
          }
          .category-swiper .swiper-slide {
            width: auto !important;
            flex: 1 0 auto !important;
          }
        }

        /* On Mobile/Tablet (< 992px): Enables auto width for smooth scrolling */
        @media (max-width: 991.98px) {
          .category-swiper .swiper-slide {
            width: auto !important;
          }
        }

        .category-item {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid transparent;
          cursor: pointer;
          width: 100%;
        }

        .category-item:hover {
          transform: translateY(-2px);
        }

        .category-item:hover .icon-wrapper {
          color: #0d6efd !important;
        }

        /* Active Highlighted Category */
        .category-item.active-category {
          background-color: rgba(13, 110, 253, 0.08) !important;
          border-color: rgba(13, 110, 253, 0.25) !important;
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.1);
        }

        .category-item.active-category .icon-wrapper {
          color: #0d6efd !important;
          transform: scale(1.1);
        }

        .category-item.active-category .category-name {
          color: #0d6efd !important;
          font-weight: 700 !important;
        }
      `}</style>

      <div className="bg-white border-bottom py-2 px-3 position-relative w-100">
        <Swiper
          modules={[FreeMode, Navigation, Mousewheel]}
          mousewheel={{ forceToAxis: true }}
          className="category-swiper py-1"
          breakpoints={{
            // Mobile & Tablet (<992px): Enable horizontal scroll & drag
            0: {
              slidesPerView: "auto",
              spaceBetween: 16,
              freeMode: true,
              allowTouchMove: true,
            },
            // Desktop (≥992px): Show all items evenly & disable scrolling
            992: {
              slidesPerView: 11,
              spaceBetween: 8,
              freeMode: false,
              allowTouchMove: false,
            },
          }}
        >
          {categories.map((cat) => {
            // Category gets highlighted ONLY when explicitly clicked by the user
            const isActive = selectedCategory?.toLowerCase() === cat.category.toLowerCase();

            return (
              <SwiperSlide key={cat.category}>
                <Link
                  to={`/category/${cat.category}`}
                  onClick={() => setSelectedCategory(cat.category)}
                  className={`category-item d-flex flex-column align-items-center text-decoration-none px-3 py-2 rounded-3 text-dark ${
                    isActive ? "active-category" : ""
                  }`}
                >
                  <span className="icon-wrapper fs-4 mb-1 text-secondary transition-all">
                    {cat.icon}
                  </span>
                  <span
                    className="category-name fw-medium text-secondary text-nowrap text-center"
                    style={{ fontSize: "0.825rem", letterSpacing: "0.2px" }}
                  >
                    {cat.name}
                  </span>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}