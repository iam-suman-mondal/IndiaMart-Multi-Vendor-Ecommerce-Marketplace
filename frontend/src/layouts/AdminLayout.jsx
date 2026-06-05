import { Outlet, Link } from "react-router";
import Sidebar from '../pages/admin/shared/components/Sidebar'

function AdminLayout() {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar />

      <main className="flex-fill p-3">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
