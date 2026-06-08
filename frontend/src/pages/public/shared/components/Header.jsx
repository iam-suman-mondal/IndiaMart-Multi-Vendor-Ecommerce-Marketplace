import React from "react";
import templogo from "./templogo.jpg";
import { Link } from "react-router";
import { FaShoppingCart } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top shadow-sm py-2">
      <div className="container-fluid px-3 gap-2">
        
        {/* BRAND / LOGO SECTION */}
        <Link to="/" className="navbar-brand d-flex align-items-center me-0">
          <img
            src={templogo}
            alt="logo"
            className="me-2"
            style={{ height: '36px', width: 'auto' }}
          />
          <span className="fw-bold fs-5">E-Commerce</span>
        </Link>

        {/* SEARCH BAR SECTION (Shrinks nicely, moves below on mobile screens) */}
        <div className="order-3 order-md-2 col-12 col-md-4 col-lg-5 mx-auto my-1 my-md-0">
          <form className="d-flex w-100">
            <input
              className="form-control me-2 rounded-pill bg-white"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success rounded-pill px-3" type="submit">
              Search
            </button>
          </form>
        </div>

        {/* ACTION BUTTONS SECTION (Stays neatly grouped on the right side) */}
        <div className="order-2 order-md-3 d-flex align-items-center gap-2 gap-sm-3 loose-buttons ms-auto ms-md-0">
          <Link
            to="/auth/customer/login"
            className="btn btn-outline-primary btn-sm rounded-pill px-3"
          >
            Login
          </Link>

          <Link
            to="/auth/customer/signup"
            className="btn btn-primary btn-sm rounded-pill px-3"
          >
            Signup
          </Link>

          <Link
            to="/cart"
            className="text-decoration-none text-dark d-flex align-items-center ms-1"
          >
            <FaShoppingCart className="me-1 text-secondary" size={20} />
            <span className="d-none d-sm-inline small fw-semibold">Cart</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}