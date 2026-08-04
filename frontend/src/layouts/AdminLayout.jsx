import { Navigate, Outlet, replace } from "react-router";
import Sidebar from "../pages/admin/shared/components/Sidebar";
import { useSelector } from "react-redux";

function AdminLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  
  // Authorization: Only admins can visit these routes
  if (!isAuthenticated || user?.role !== "ROLE_ADMIN") {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="d-flex vh-100 overflow-hidden bg-light">
      <Sidebar />

      <main className="flex-fill h-100 overflow-y-auto w-100">
        <div className="px-3 py-2 px-md-4 py-md-3">
          {/* Spacer for mobile */}
          <div className="d-md-none pt-5"></div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
