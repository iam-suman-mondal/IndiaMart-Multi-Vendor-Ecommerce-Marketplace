import React from "react";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <aside
      style={{
        width: "250px",
        borderRight: "1px solid #ddd",
        padding: "1rem",
      }}
    >
      <h3>Vendor Panel</h3>

      <nav>
        <ul>
          <li>
            <Link to="/vendor">Dashboard</Link>
          </li>

          <li>
            <Link to="/vendor/products">My Products</Link>
          </li>

          <li>
            <Link to="/vendor/orders">Orders</Link>
          </li>

          <li>
            <Link to="/vendor/profile">Profile</Link>
          </li>

          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
