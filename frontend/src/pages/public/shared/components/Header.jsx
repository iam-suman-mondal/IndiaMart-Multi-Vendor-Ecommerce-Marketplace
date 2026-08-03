import React, { useState } from "react";
import templogo from "./templogo.jpg";
import { Link, useNavigate } from "react-router";
import { FaShoppingCart, FaShoppingBag, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
export default function NavBar() {
  const [searchText, setSearchText] = useState("");
  // Auth state (Set true for logged in, false for logged out)
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [showDrawer, setShowDrawer] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [user, setUser] = useState({
    name: "Prathamesh Rayke",
    email: "suman@example.com",
    avatar: "https://ui-avatars.com/api/?name=Prathamesh+Rayke&background=random",
  });

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?productName=${encodeURIComponent(searchText)}`);
    }
  };

  return (
    <>
      <style>{`
        .ecommerce-header-nav {
          background-color: #ffffff;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          width: 100%;
        }

        .search-input-field:focus {
          border-color: #0d6efd !important;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15) !important;
        }

        .cart-badge-count {
          font-size: 0.68rem;
          padding: 0.25em 0.5em;
        }

        .nav-action-link {
          color: #334155;
          transition: all 0.2s ease;
          border-radius: 0.5rem;
        }
        .nav-action-link:hover {
          color: #0d6efd;
          background-color: #f8fafc;
        }

        /* Mobile Slide Drawer Styling */
        .mobile-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1050;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        .mobile-drawer-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 290px;
          height: 100vh;
          background: #ffffff;
          z-index: 1060;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -8px 0 24px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
        }
        .mobile-drawer.show {
          transform: translateX(0);
        }

        .drawer-header {
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        .drawer-footer {
          border-top: 1px solid #e2e8f0;
          background-color: #ffffff;
        }
      `}</style>

      <nav className="navbar navbar-expand-md navbar-light bg-white sticky-top shadow-sm py-2 w-100 ecommerce-header-nav">
        <div className="container-fluid px-3 px-sm-4 px-md-5">
          <div className="d-flex align-items-center justify-content-between w-100 flex-wrap gap-2 gap-md-3">
            
            {/* 1. LOGO */}
            <Link to="/" className="navbar-brand d-flex align-items-center me-0">
              <img
                src={templogo}
                alt="logo"
                className="me-2 rounded-2"
                style={{
                  height: "38px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
              <span className="fw-bold fs-4 text-dark">INDIA-MART</span>
            </Link>

            {/* 2. SEARCH BAR */}
            <div
              className="flex-grow-1 mx-2 mx-md-4 order-3 order-md-2"
              style={{ maxWidth: "680px" }}
            >
              <form className="d-flex w-100" onSubmit={handleSearch}>
                <input
                  className="form-control me-2 rounded-pill bg-white px-3 py-2 border-secondary-subtle search-input-field"
                  type="search"
                  placeholder="Search products, brands and categories..."
                  aria-label="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  className="btn btn-primary rounded-pill px-4 py-2 fw-semibold text-nowrap shadow-xs"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>

            {/* 3. DESKTOP ACTIONS */}
            <div className="order-2 order-md-3 d-none d-md-flex align-items-center gap-3 ms-auto ms-md-0">
              {/* CART LINK */}
              <Link
                to="/cart"
                className="nav-action-link text-decoration-none d-flex align-items-center px-2 py-1.5"
                title="View Cart"
              >
                <div className="position-relative d-flex align-items-center">
                  <FaShoppingCart className="text-secondary" size={20} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-badge-count">
                    3
                  </span>
                </div>
                <span className="small fw-semibold ms-2">Cart</span>
              </Link>

              {/* LOGGED IN VIEW */}
              {isLoggedIn ? (
                <>
                  {/* MY ORDERS LINK */}
                  <Link
                    to="/customer/orders"
                    className="nav-action-link text-decoration-none d-flex align-items-center px-2 py-1.5"
                    title="My Orders"
                  >
                    <FaShoppingBag className="text-secondary" size={18} />
                    <span className="small fw-semibold ms-2">Orders</span>
                  </Link>

                  {/* USER PROFILE LINK */}
                  <Link
                    to="/customer/profile"
                    className="nav-action-link text-decoration-none d-flex align-items-center gap-2 border-start ps-3 py-1"
                    title="View Profile"
                  >
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="rounded-circle border"
                      style={{ width: "38px", height: "38px", objectFit: "cover" }}
                    />
                    <span className="small fw-bold text-dark" style={{ fontSize: "0.85rem" }}>
                      {user.name.split(" ")[0]}
                    </span>
                  </Link>
                </>
              ) : (
                /* LOGGED OUT VIEW */
                <>
                  <Link
                    to="/auth/customer/login"
                    className="btn btn-outline-primary rounded-pill px-3.5 py-1.5 fw-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/customer/signup"
                    className="btn btn-primary rounded-pill px-3.5 py-1.5 fw-semibold shadow-xs"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>

            {/* 4. MOBILE HAMBURGER TOGGLER */}
            <div className="order-2 d-md-none ms-auto">
              <button
                className="btn btn-light rounded-circle p-2 border"
                onClick={() => setShowDrawer(true)}
                aria-label="Toggle Navigation"
              >
                <FaBars size={20} className="text-dark" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* MOBILE SLIDE DRAWER OVERLAY */}
      <div
        className={`mobile-drawer-overlay ${showDrawer ? "show" : ""}`}
        onClick={() => setShowDrawer(false)}
      />

      {/* MOBILE SLIDE DRAWER */}
      <div className={`mobile-drawer ${showDrawer ? "show" : ""}`}>
        {/* Drawer Header (Links directly to Profile) */}
        <div className="drawer-header p-3 d-flex align-items-center justify-content-between">
          {isLoggedIn ? (
            <Link
              to="/profile"
              onClick={() => setShowDrawer(false)}
              className="text-decoration-none text-dark d-flex align-items-center gap-2.5 flex-grow-1 me-2 overflow-hidden"
              title="View Profile"
            >
              <img
                src={user.avatar}
                alt="Profile"
                className="rounded-circle border flex-shrink-0"
                style={{ width: "42px", height: "42px", objectFit: "cover" }}
              />
              <div className="overflow-hidden">
                <h6 className="fw-bold text-dark mb-0 text-truncate">{user.name}</h6>
                <small className="text-primary d-block text-truncate" style={{ fontSize: "0.75rem" }}>
                  View Profile →
                </small>
              </div>
            </Link>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary-subtle text-primary p-2 rounded-circle">
                <FaUser size={20} />
              </div>
              <h6 className="fw-bold text-dark mb-0">Welcome Guest</h6>
            </div>
          )}

          <button
            className="btn btn-sm btn-light rounded-circle p-1.5 border-0 flex-shrink-0"
            onClick={() => setShowDrawer(false)}
          >
            <FaTimes size={18} className="text-secondary" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body p-3 flex-grow-1">
          <div className="d-flex flex-column gap-2">
            <Link
              to="/cart"
              onClick={() => setShowDrawer(false)}
              className="d-flex align-items-center justify-content-between p-2.5 rounded-3 text-decoration-none text-dark hover-bg-light"
            >
                <div className="position-relative d-flex align-items-center">
      <FaShoppingCart className="text-secondary" size={20} />
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {totalQuantity}
      </span>
    </div>
            </Link>

            {isLoggedIn && (
              <>
                <Link
                  to="/orders"
                  onClick={() => setShowDrawer(false)}
                  className="d-flex align-items-center justify-content-between p-2.5 rounded-3 text-decoration-none text-dark hover-bg-light"
                >
                  <div className="d-flex align-items-center gap-3">
                    <FaShoppingBag className="text-primary" size={18} />
                    <span className="fw-semibold">My Orders</span>
                  </div>
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setShowDrawer(false)}
                  className="d-flex align-items-center justify-content-between p-2.5 rounded-3 text-decoration-none text-dark hover-bg-light"
                >
                  <div className="d-flex align-items-center gap-3">
                    <FaUser className="text-primary" size={18} />
                    <span className="fw-semibold">My Profile</span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Drawer Footer (Login/Signup if logged out) */}
        {!isLoggedIn && (
          <div className="drawer-footer p-3">
            <div className="d-flex flex-column gap-2">
              <Link
                to="/auth/customer/login"
                onClick={() => setShowDrawer(false)}
                className="btn btn-outline-primary w-100 py-2 rounded-pill fw-semibold"
              >
                Login
              </Link>
              <Link
                to="/auth/customer/signup"
                onClick={() => setShowDrawer(false)}
                className="btn btn-primary w-100 py-2 rounded-pill fw-semibold"
              >
                Signup
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}