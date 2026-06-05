import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header
      className="container-fluid"
      style={{
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>E-Commerce</h2>

      <nav>
        <Link to="/auth/login">Login</Link> | <Link to="/auth/signup">SignUp</Link> |{" "}
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
};

export default Header;
