import React from 'react'
import { Link } from 'react-router';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-4">
        <div className="row">

          <div className="col-md-4 mb-3">
            <h5>E-Commerce</h5>
            <p className="small">
              Your one-stop destination for electronics, fashion,
              home essentials, and more.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/auth/vendor/signup" className="text-light text-decoration-none">Become a vendor</Link></li>
              <li><Link to="/auth/admin/login" className="text-light text-decoration-none">Admin Login (temp)</Link></li>
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-light text-decoration-none">Products</a></li>
              <li><a href="/cart" className="text-light text-decoration-none">Cart</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact Us</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Contact</h5>

            <p className="small d-flex align-items-center mb-2">
              <FaEnvelope className="me-2" />
              support@ecommerce.com
            </p>

            <p className="small d-flex align-items-center mb-2">
              <FaPhone className="me-2" />
              +91 98xxxxxxxx
            </p>

            <p className="small d-flex align-items-center">
              <FaMapMarkerAlt className="me-2" />
              Pune, Maharashtra
            </p>
          </div>

          <div className="d-flex gap-3 mt-3">
            <FaFacebook size={20} />
            <FaInstagram size={20} />
            <FaTwitter size={20} />
            <FaLinkedin size={20} />
          </div>

        </div>
      </div>

      <div className="text-center py-3 border-top border-secondary">
        <small>
          &copy; {new Date().getFullYear()} E-Commerce. All Rights Reserved.
        </small>
      </div>
    </footer>
  );

}