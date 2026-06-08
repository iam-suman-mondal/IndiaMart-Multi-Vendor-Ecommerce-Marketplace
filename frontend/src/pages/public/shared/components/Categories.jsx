import React from "react";
import { Link } from "react-router";

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
  const categories = [
    { name: "Electronics", icon: <FaLaptop />, category: "electronics" },
    { name: "Mobiles", icon: <FaMobileAlt />, category: "mobiles" },
    { name: "Fashion", icon: <FaTshirt />, category: "fashion" },
    { name: "Home & Kitchen", icon: <FaHome />, category: "home-kitchen" },
    { name: "Gaming", icon: <FaGamepad />, category: "gaming" },
    { name: "Books", icon: <FaBook />, category: "books" },
    { name: "Sports", icon: <FaFootballBall />, category: "sports" },
    { name: "Toys", icon: <MdSmartToy />, category: "toys" },
    { name: "Furniture", icon: <FaCouch />, category: "furniture" },
    { name: "Beauty", icon: <GiLipstick />, category: "beauty" }, // Fixed lowercase casing
    { name: "Health", icon: <MdHealthAndSafety />, category: "health" },
  ];

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none; 
          scrollbar-width: none;
        }
        .category-item {
          transition: all 0.2s ease-in-out;
        }
        .category-item:hover {
          transform: translateY(-2px);
        }
        .category-item:hover .icon-wrapper {
          color: #0d6efd !important; /* Bootstrap primary blue on hover */
        }
      `}</style>

      {/* Changed justify-content-start to justify-content-between and removed gap-2 */}
      <div className="category-tabs d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom overflow-auto hide-scrollbar w-100">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`category/${category.category}`}
    
            className="category-item d-flex flex-column align-items-center text-decoration-none p-2 text-dark flex-grow-1"
          >
            <span className="icon-wrapper fs-4 mb-2 text-secondary">
              {category.icon}
            </span>
            <span 
              className="fw-medium text-secondary" 
              style={{ fontSize: "0.85rem", letterSpacing: "0.3px" }}
            >
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}