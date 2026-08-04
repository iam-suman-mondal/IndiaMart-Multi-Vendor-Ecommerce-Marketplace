import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logout } from "../../../../redux/authSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle logout
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully logged out")
    navigate('/auth/login')
  }

  return (
    <aside className="bg-white border-end vh-100 p-3 position-sticky top-0 start-0 d-flex flex-column"
      style={{
        width: "250px",
        minWidth: "250px",
        borderRight: "1px solid #ddd",
        padding: "1rem",
      }}
    >
      <h4 className="fw-bold text-dark mb-4 px-2">Vendor Panel</h4>

      <nav className="flex-grow-1">
        <ul className="list-unstyled d-flex flex-column gap-2 p-0 m-0">
          <li className="nav-item">
            <Link to="/vendor"
              className="btn btn-outline-primary w-100 py-2 fw-semibold "
            >
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/vendor/products"
              className="btn btn-outline-primary w-100 py-1 fw-semibold "
            >
              My Products
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/vendor/orders"
              className="btn btn-outline-primary w-100 py-1 fw-semibold "
            >
              Orders
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/vendor/profile"
              className="btn btn-outline-primary w-100 py-2 fw-semibold "
            >
              Profile
            </Link>
          </li>

          <li>
            <button type="button"
              className="btn btn-outline-danger w-100 py-2 fw-bold rounded-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
