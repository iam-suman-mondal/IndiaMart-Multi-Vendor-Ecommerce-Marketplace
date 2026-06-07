import React from "react";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="btn btn-dark d-md-none m-3 position-absolute z-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#adminSidebar"
        aria-controls="adminSidebar"
      >
        ☰ Menu
      </button>

      {/* Responsive Offcanvas Sidebar */}
      <aside
        className="offcanvas-md offcanvas-start bg-white border-end vh-100 d-flex flex-column shadow-sm"
        tabIndex="-1"
        id="adminSidebar"
        aria-labelledby="adminSidebarLabel"
        style={{ width: "250px" }}
      >
        {/* Mobile Header */}
        <div className="offcanvas-header d-md-none border-bottom">
          <h5 className="offcanvas-title" id="adminSidebarLabel">
            Ecommerce
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#adminSidebar"
            aria-label="Close"
          ></button>
        </div>

        {/* Sidebar Body */}
        <div className="offcanvas-body d-flex flex-column p-3 h-100">
          {/* Desktop Header */}
          <h4 className="d-none d-md-block border-bottom pb-3 mb-3 fw-bold">
            Ecommerce
          </h4>

          {/* Navigation Links */}
          <nav className="flex-fill">
            <ul className="nav nav-pills flex-column gap-2 mb-auto">
              <li className="nav-item">
                <Link to="/admin" className="nav-link link-dark">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/customers" className="nav-link link-dark">
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/vendors" className="nav-link link-dark">
                  Vendors
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/products" className="nav-link link-dark">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/categories" className="nav-link link-dark">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/profile" className="nav-link link-dark">
                  Profile
                </Link>
              </li>
            </ul>
          </nav>

          <hr />
          {/* Footer / Logout */}
          <button className="btn btn-outline-danger w-100 mt-auto">
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
