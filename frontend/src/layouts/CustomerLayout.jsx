import { Outlet, Link } from "react-router";
import Header from "../pages/customer/shared/components/Header";
import Footer from "../pages/customer/shared/components/Footer";

function CustomerLayout() {
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
