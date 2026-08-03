import React from "react";
import { Link, useSearchParams } from "react-router";

export default function FailedPaymentPage() {
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId") || searchParams.get("order_id");
  const reason = searchParams.get("reason") || "Transaction could not be processed.";

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="card text-center p-4 p-sm-5 w-100 shadow-sm border rounded-4" style={{ maxWidth: "540px" }}>
        <div className="fs-1 text-danger mb-3">✕</div>
        <span className="badge bg-danger-subtle text-danger px-3 py-1.5 rounded-pill mb-2">
          Payment Failed
        </span>
        <h2 className="fw-bold text-dark mb-2">Transaction Unsuccessful</h2>
        <p className="text-muted small mb-4">We couldn't process your payment. Any deducted amount will be refunded.</p>

        <div className="bg-danger-subtle text-danger-emphasis p-3 text-start rounded-3 mb-4 small">
          {orderId && <div>Order ID: <strong>#{orderId}</strong></div>}
          <div>Reason: <strong>{reason}</strong></div>
        </div>

        <Link to={orderId ? `/customer/order_summury?orderId=${orderId}` : "/cart"} className="btn btn-primary rounded-pill py-3 fw-bold mb-2">
          🔄 Try Payment Again
        </Link>
        <Link to="/" className="btn btn-link text-secondary">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}