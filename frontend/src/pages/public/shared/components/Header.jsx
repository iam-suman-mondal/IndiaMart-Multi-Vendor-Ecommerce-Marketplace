import React from "react";
import templogo from "./templogo.jpg";
import { Link } from "react-router";
import { FaShoppingCart, FaUser } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid row align-items-center m-0 p-0">

        <div className="col-4 d-flex align-items-center">
          <img
            src={templogo}
            alt="logo"
            className="me-2"
            style={{ height: '40px' }}
          />
          <a className="navbar-brand m-0" href="/">E-Commerce</a>
        </div>

        <div className="col-4">
          <form className="d-flex">
            <input
              className="form-control me-2 rounded-pill"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success rounded-pill" type="submit">Search</button>
          </form>
        </div>

        <div className="col-4 d-flex justify-content-end align-items-center gap-3">

          <Link
            to="/user_login"
            className="btn btn-outline-primary btn-sm"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="btn btn-primary btn-sm"
          >
            Signup
          </Link>

          <Link
            to="/cart"
            className="text-decoration-none text-dark d-flex align-items-center"
          >
            <FaShoppingCart className="me-1" size={22} />
            <span>Cart</span>
          </Link>

        </div>

      </div>
    </nav>
  );
}
