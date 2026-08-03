import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getProductById } from "../../../../apis/services/product-service";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      console.log("Fetching product id:", id);
      const data = await getProductById(id);
      console.log("Product details received:", data);
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <div className="card p-5 shadow-sm border-0 rounded-4">
          <h3>Product Not Found</h3>
          <Link to="/" className="btn btn-primary mt-3">
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  // Precise star rendering supporting full, half, and empty stars with enlarged size
  const renderStars = (rating = 0) => {
    const stars = [];
    const numRating = Number(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.3 && numRating % 1 <= 0.8;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        // Full Star (Enlarged)
        stars.push(
          <span key={i} className="text-warning fs-3 me-1 align-middle">
            ★
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        // Half Star (SVG Gradient)
        stars.push(
          <svg key={i} className="me-1 align-middle" width="26" height="26" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`half-star-detail-${i}`}>
                <stop offset="50%" stopColor="#ffc107" />
                <stop offset="50%" stopColor="#cbd5e1" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-star-detail-${i})`}
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        );
      } else {
        // Empty Star (Enlarged)
        stars.push(
          <span key={i} className="text-secondary opacity-25 fs-3 me-1 align-middle">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="container py-4 py-md-5">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">{product.category}</li>
          <li className="breadcrumb-item active">{product.name}</li>
        </ol>
      </nav>

      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="row g-0">
          {/* IMAGE */}
          <div className="col-lg-6 p-4">
            <div
              className="bg-light rounded-4 d-flex justify-content-center align-items-center"
              style={{
                height: "450px",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid"
                style={{
                  maxHeight: "420px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-between">
            <div>
              <span className="badge bg-primary mb-2">{product.brand}</span>
              <span className="badge bg-light text-dark ms-2">{product.category}</span>

              <h1 className="fw-bold mt-3">{product.name}</h1>

              {/* Rating Section with Enlarged Accurate Stars */}
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center me-2">
                  {renderStars(product.averageRating)}
                </div>
                <span className="ms-1 fw-bold fs-5 text-dark">
                  {Number(product.averageRating || 0).toFixed(1)}
                </span>
                <span className="text-muted ms-2 small">
                  ({product.totalRatings || 0} ratings)
                </span>
              </div>

              <h2 className="text-primary fw-bold">
                ₹{product.price ? product.price.toLocaleString("en-IN") : "0"}
              </h2>

              <p className="text-secondary mt-3">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto pt-4 border-top border-light">
              <div className="row g-3">
                {/* Add To Cart */}
                <div className="col-6">
                  <button
                    className="btn btn-warning w-100 py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                    onClick={() => alert(`${product.name} added to cart`)}
                  >
                    🛒 Add To Cart
                  </button>
                </div>

                {/* Wishlist */}
                <div className="col-6">
                  <button
                    className={
                      isWishlisted
                        ? "btn btn-danger w-100 py-2.5 rounded-3 fw-semibold"
                        : "btn btn-outline-danger w-100 py-2.5 rounded-3 fw-semibold"
                    }
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    ❤️ {isWishlisted ? "Wishlisted" : "Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}