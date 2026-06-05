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
      <h3>Admin Panel</h3>

      <nav>
        <ul>
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>

          <li>
            <Link to="/admin/customers">Customers</Link>
          </li>

          <li>
            <Link to="/admin/vendors">Vendors</Link>
          </li>

          <li>
            <Link to="/admin/products">Products</Link>
          </li>

          <li>
            <Link to="/admin/profile">Profile</Link>
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
