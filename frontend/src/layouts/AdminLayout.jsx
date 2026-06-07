import { Outlet } from "react-router";
import Sidebar from '../pages/admin/shared/components/Sidebar';

function AdminLayout() {
  return (
    <div className="d-flex min-vh-100 overflow-hidden bg-light">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-fill overflow-auto w-100">
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