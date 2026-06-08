import React from "react";
import { Link } from "react-router";

export default function ProductCard({ product }) {
  return (
    <>
      {/* Custom micro-interaction styling for the zoom effect */}
      <style>{`
        .card-hover-effect {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .card-hover-effect:hover {
          transform: scale(1.04);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12) !important;
        }
      `}</style>

      <div className="card h-100 shadow-sm border-0 position-relative rounded-3 overflow-hidden card-hover-effect bg-white">
        {/* Main Card Clickable Link Area */}
        <Link
          to={`/product/${product.productId}`}
          className="text-decoration-none text-dark h-100 d-flex flex-column"
        >
          <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
            <img
              src={product.image}
              className="w-100 h-100"
              alt={product.productName}
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="card-body d-flex flex-column p-3 flex-grow-1">
            <h6 className="card-title text-truncate mb-1 fw-semibold text-dark">
              {product.productName}
            </h6>

            <p className="card-text small text-muted mb-2">
              <span className="fw-medium text-secondary">Brand:</span> {product.brand}
            </p>

            <p
              className="card-text small text-secondary mb-3"
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                minHeight: "38px" // Keeps row sizes uniform
              }}
            >
              {product.productDescription}
            </p>

            <div className="mt-auto pt-2">
              <h5 className="text-dark fw-bold mb-0">₹{product.price.toLocaleString("en-IN")}</h5>
            </div>
          </div>
        </Link>

        {/* Safe External Interactive Button Layer */}
        <div className="px-3 pb-3 pt-0 bg-white">
          <button 
            className="btn btn-primary w-100 fw-medium d-flex align-items-center justify-content-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              alert(`${product.productName} added to cart!`);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}