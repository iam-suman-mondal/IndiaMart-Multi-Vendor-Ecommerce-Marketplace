import { Outlet, Link } from "react-router";
import Header from "../pages/public/shared/components/Header";
import Footer from "../pages/public/shared/components/Footer";

function PublicLayout() {
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

export default PublicLayout;
