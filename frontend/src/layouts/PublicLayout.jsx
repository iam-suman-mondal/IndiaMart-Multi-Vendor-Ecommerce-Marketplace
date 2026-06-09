import { Outlet, Link } from "react-router";
import Header from "../pages/public/shared/components/Header";
import Footer from "../pages/public/shared/components/Footer";
import CategoryTab from "../pages/public/shared/components/Categories";

import PublicHome from "../pages/public/public_home/pages/home_page";

function PublicLayout() {
  return (
    <>
      <Header />
      <CategoryTab/>
      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default PublicLayout;
