import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/CartSlice";

export default function SuccessPaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderId = searchParams.get("orderId") || searchParams.get("order_id");

  const [countdown, setCountdown] = useState(10);


  useEffect(() => {
    // Clear Redux cart after successful payment
    dispatch(clearCart());

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);


    return () => clearInterval(timer);

  }, [dispatch, navigate]);


  return (
    <div
      className="container py-5 d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >

      <div
        className="card text-center p-4 p-sm-5 w-100 shadow-sm border rounded-4"
        style={{ maxWidth: "560px" }}
      >

        <div className="fs-1 text-success mb-3">
          ✓
        </div>


        <span className="badge bg-success-subtle text-success px-3 py-1 rounded-pill mb-2">
          Payment Successful
        </span>


        <h2 className="fw-bold text-dark mb-2">
          Thank You for Your Order!
        </h2>


        <p className="text-muted small mb-4">
          Your payment was processed successfully.
        </p>


        <div className="bg-light p-3 text-start rounded-3 mb-4">

          <div className="d-flex justify-content-between">
            <span className="text-muted">
              Order ID:
            </span>

            <strong>
              #{orderId}
            </strong>
          </div>

        </div>


        <Link
          to="/"
          className="btn btn-primary rounded-pill py-3 fw-bold mb-3"
        >
          🏠 Return to Homepage
        </Link>


        <small className="text-muted">
          Redirecting to home automatically in{" "}
          <strong>{countdown}s</strong>...
        </small>


      </div>

    </div>
  );
}