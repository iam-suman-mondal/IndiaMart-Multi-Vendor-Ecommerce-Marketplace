import { Outlet, Link, Navigate } from "react-router";
import Header from "../pages/public/shared/components/Header";
import Footer from "../pages/public/shared/components/Footer";
import CategoryTab from "../pages/public/shared/components/Categories";
import { useSelector } from "react-redux";

function CustomerLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  
  // Authorization: Only logged-in customers can visit these routes
  if (!isAuthenticated || user?.role !== "ROLE_CUSTOMER") {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default CustomerLayout;
