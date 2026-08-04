import { Outlet, Link, Navigate } from "react-router";
import Sidebar from "../pages/vendor/shared/components/Sidebar";
import { useSelector } from "react-redux";

function VendorLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  
  // Authorization: Only vendors can visit these routes
  if (!isAuthenticated || user?.role !== "ROLE_VENDOR") {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="d-flex min-vh-100">
      <Sidebar />

      <main className="flex-fill p-3">
        <Outlet />
      </main>
    </div>
  );
}

export default VendorLayout;
