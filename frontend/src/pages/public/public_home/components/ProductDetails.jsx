import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/CartSlice";
import { getProductById } from "../../../../apis/services/product-service";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedAlert, setAddedAlert] = useState(false);

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

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) {
      dispatch(addToCart(product));
      toast.success("Product Added To Cart")
      setAddedAlert(true);
      setTimeout(() => setAddedAlert(false), 2500);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (product) {
      dispatch(addToCart(product));
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "65vh" }}>
        <div className="spinner-border text-primary my-4" style={{ width: "3rem", height: "3rem" }}></div>
        <p className="text-muted small fw-medium">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <div className="card p-5 shadow-sm border-0 rounded-4 mx-auto" style={{ maxWidth: "500px" }}>
          <div className="fs-1 mb-3">🔍</div>
          <h3 className="fw-bold text-dark">Product Not Found</h3>
          <p className="text-muted small">We couldn't find the product you're looking for.</p>
          <Link to="/" className="btn btn-primary rounded-pill px-4 py-2.5 mt-2 fw-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Precise star rendering supporting full, half, and empty stars
  const renderStars = (rating = 0) => {
    const stars = [];
    const numRating = Number(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.3 && numRating % 1 <= 0.8;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        // Full Star
        stars.push(
          <span key={i} className="text-warning fs-4 me-1 align-middle">
            ★
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        // Half Star (SVG Gradient)
        stars.push(
          <svg key={i} className="me-1 align-middle" width="24" height="24" viewBox="0 0 24 24">
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
        // Empty Star
        stars.push(
          <span key={i} className="text-secondary opacity-25 fs-4 me-1 align-middle">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <>
      <style>{`
        .product-main-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
        }

        .product-img-stage {
          background-color: #f8fafc;
          border-radius: 1.25rem;
          height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          overflow: hidden;
        }
        .product-img-stage img {
          max-height: 400px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          transition: transform 0.4s ease;
        }
        .product-img-stage:hover img {
          transform: scale(1.04);
        }

        .btn-add-cart {
          background-color: #ffc107;
          color: #0f172a;
          border: none;
          transition: all 0.25s ease;
        }
        .btn-add-cart:hover {
          background-color: #ffb300;
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(255, 179, 0, 0.3);
        }

        .btn-buy-now {
          background-color: #0d6efd;
          color: #ffffff;
          border: none;
          transition: all 0.25s ease;
        }
        .btn-buy-now:hover {
          background-color: #0b5ed7;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(13, 110, 253, 0.3);
        }
      `}</style>

      <div className="container py-4 py-md-5">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="breadcrumb mb-0 small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">
                Home
              </Link>
            </li>
            {product.category && (
              <li className="breadcrumb-item text-secondary">{product.category}</li>
            )}
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Added Alert Notification */}
        {addedAlert && (
          <div className="alert alert-success alert-dismissible fade show rounded-3 shadow-xs mb-4 d-flex align-items-center gap-2">
            <span>🛒</span>
            <strong>{product.name}</strong> added to cart successfully!
            <Link to="/cart" className="btn btn-sm btn-success ms-auto rounded-pill px-3 py-1 text-decoration-none">
              View Cart →
            </Link>
          </div>
        )}

        <div className="card product-main-card overflow-hidden">
          <div className="row g-0">
            {/* IMAGE SECTION */}
            <div className="col-lg-6 p-4">
              <div className="product-img-stage border">
                <img src={product.image} alt={product.name} className="img-fluid" />
              </div>
            </div>

            {/* DETAILS SECTION */}
            <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-between">
              <div>
                {/* Brand & Category Badges */}
                <div className="d-flex align-items-center gap-2 mb-2">
                  {product.brand && (
                    <span className="badge bg-primary px-3 py-1.5 rounded-pill fw-semibold">
                      {product.brand}
                    </span>
                  )}
                  {product.category && (
                    <span className="badge bg-light text-dark border px-3 py-1.5 rounded-pill fw-medium">
                      {product.category}
                    </span>
                  )}
                </div>

                <h1 className="fw-bold text-dark mt-2 mb-3 fs-3 fs-md-2">{product.name}</h1>

                {/* Rating Section */}
                <div className="d-flex align-items-center mb-3.5 bg-light p-2.5 rounded-3 d-inline-flex">
                  <div className="d-flex align-items-center me-2">
                    {renderStars(product.averageRating)}
                  </div>
                  <span className="ms-1 fw-bold fs-6 text-dark">
                    {Number(product.averageRating || 0).toFixed(1)}
                  </span>
                  <span className="text-muted ms-2 small">
                    ({product.totalRatings || 0} reviews)
                  </span>
                </div>

                {/* Price Display */}
                <div className="my-3">
                  <span className="text-muted small d-block mb-1">Special Price</span>
                  <h2 className="text-primary fw-extrabold fs-1 mb-0">
                    ₹{product.price ? product.price.toLocaleString("en-IN") : "0"}
                  </h2>
                </div>

                {/* Product Description */}
                <div className="mt-4 pt-3 border-top border-light">
                  <h6 className="fw-bold text-dark mb-2">Description</h6>
                  <p className="text-secondary leading-relaxed small mb-0" style={{ lineHeight: "1.6" }}>
                    {product.description}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS (Add to Cart & Buy Now) */}
              <div className="mt-4 pt-4 border-top border-light">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <button
                      className="btn btn-add-cart w-100 py-3 rounded-pill fw-bold fs-6 shadow-xs d-flex align-items-center justify-content-center gap-2"
                      onClick={handleAddToCart}
                    >
                      🛒 Add To Cart
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <button
                      className="btn btn-buy-now w-100 py-3 rounded-pill fw-bold fs-6 shadow-xs d-flex align-items-center justify-content-center gap-2"
                      onClick={handleBuyNow}
                    >
                      ⚡ Buy Now
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}