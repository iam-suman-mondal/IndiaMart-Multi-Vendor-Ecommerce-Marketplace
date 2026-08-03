import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { load } from "@cashfreepayments/cashfree-js";
import { getCustomerOrderDetails } from "../../../apis/services/order-service";

export default function Checkout() {
  const [searchParams] = useSearchParams();

  // Read URL query parameters (?orderId=...&paymentSessionId=...)
  const orderId = searchParams.get("orderId");
  const urlPaymentSessionId =
    searchParams.get("paymentSessionId") || searchParams.get("payment_session_id");

  const [paymentSessionId, setPaymentSessionId] = useState(urlPaymentSessionId || "");
  const [orderDetails, setOrderDetails] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    } else {
      setLoadingOrder(false);
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoadingOrder(true);
      setErrorMsg("");
      console.log("Fetching order details for orderId:", orderId);
      const data = await getCustomerOrderDetails(orderId);
      console.log("Order details received:", data);
      setOrderDetails(data);

      // If backend returns paymentSessionId inside order details, set it automatically
      if (data && (data.paymentSessionId || data.payment_session_id) && !paymentSessionId) {
        setPaymentSessionId(data.paymentSessionId || data.payment_session_id);
      }
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      setErrorMsg("Failed to load order details. Please verify your Order ID.");
    } finally {
      setLoadingOrder(false);
    }
  };
  console.log(fetchOrder)

  const payNow = async () => {
    if (!paymentSessionId.trim()) {
      alert("Please enter a valid Payment Session ID to proceed.");
      return;
    }

    try {
      setIsProcessingPayment(true);

      // Load Cashfree SDK (mode: 'sandbox' or 'production')
      const cashfree = await load({
        mode: "sandbox",
      });

      await cashfree.checkout({
        paymentSessionId: paymentSessionId.trim(),
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Cashfree Checkout Error:", error);
      alert("Unable to start payment. Please check your session ID and try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (loadingOrder) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary my-4" style={{ width: "3rem", height: "3rem" }}></div>
        <h5 className="fw-bold text-dark mb-1">Loading Order Summary...</h5>
        <p className="text-muted small">Retrieving your order details for checkout</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .checkout-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
        }

        .order-item-img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 0.5rem;
          background-color: #f8fafc;
        }

        .pay-now-btn {
          background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
          border: none;
          transition: all 0.25s ease;
        }
        .pay-now-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(13, 110, 253, 0.3) !important;
        }
      `}</style>

      <div className="container py-4 py-md-5" style={{ maxWidth: "880px" }}>
        {/* Page Header */}
        <div className="mb-4 pb-2 border-bottom border-light">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h2 className="fw-bold text-dark mb-1">Order Payment & Checkout</h2>
              <p className="text-muted small mb-0">
                {orderId ? (
                  <>
                    Order ID: <strong className="text-primary">#{orderId}</strong>
                  </>
                ) : (
                  "Review your order summary and complete secure payment"
                )}
              </p>
            </div>
            <Link to="/cart" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
              ← Back to Cart
            </Link>
          </div>
        </div>

        {errorMsg && (
          <div className="alert alert-danger rounded-3 mb-4 shadow-xs">
            ⚠️ {errorMsg}
          </div>
        )}

        <div className="row g-4">
          {/* LEFT COLUMN: ORDER DETAILS SUMMARY */}
          <div className="col-lg-7">
            <div className="card checkout-card shadow-sm p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                  <h5 className="fw-bold text-dark mb-0">Order Summary</h5>
                  <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill fw-semibold">
                    {orderDetails?.items?.length || orderDetails?.orderItems?.length || 0} Items
                  </span>
                </div>

                {/* Items List */}
                <div className="d-flex flex-column gap-3 mb-4" style={{ maxHeight: "320px", overflowY: "auto" }}>
                  {orderDetails && (orderDetails.items || orderDetails.orderItems) ? (
                    (orderDetails.items || orderDetails.orderItems).map((item, idx) => (
                      <div key={idx} className="d-flex align-items-center justify-content-between gap-3 border-bottom pb-3">
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.image || item.productImage || "https://via.placeholder.com/70"}
                            alt={item.name || item.productName}
                            className="order-item-img border"
                          />
                          <div>
                            <h6 className="fw-bold text-dark mb-1 fs-6">{item.name || item.productName}</h6>
                            <p className="text-muted small mb-0">
                              Qty: <strong>{item.quantity || item.qty}</strong> × ₹{Number(item.price).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                        <span className="fw-bold text-dark text-nowrap fs-6">
                          ₹{(Number(item.price) * Number(item.quantity || item.qty)).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted">
                      <p className="mb-0">No item details available for this order.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-light p-3 rounded-3 mt-auto">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary small">Subtotal</span>
                  <strong className="text-dark">
                    ₹{Number(orderDetails?.grandTotal || 0).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary small">Handling Fee</span>
                  <strong className="text-dark">₹{orderDetails?.handlingFee || 5}</strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary small">Delivery Charges</span>
                  <strong className={orderDetails?.deliveryCharge === 0 ? "text-success fw-bold" : "text-dark"}>
                    {orderDetails?.deliveryCharge === 0 ? "FREE" : `₹${orderDetails?.deliveryCharge || 50}`}
                  </strong>
                </div>

                <hr className="my-2" />

                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-dark">Total Amount Due</span>
                  <span className="fw-extrabold text-primary fs-4">
                    ₹{Number(orderDetails?.grandTotal || 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CASHFREE PAYMENT SESSION & PAY NOW BUTTON */}
          <div className="col-lg-5">
            <div className="card checkout-card shadow-sm p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-bold text-dark mb-3">Complete Payment</h5>
                <p className="text-muted small mb-4">
                  Pay securely via Credit/Debit Cards, UPI, NetBanking, or Wallets using Cashfree Gateway.
                </p>
              </div>

              {/* PAY NOW BUTTON */}
              <div>
                <button
                  className="btn btn-primary pay-now-btn w-100 rounded-pill py-3 fw-bold fs-6 shadow-sm mb-3 d-flex align-items-center justify-content-center gap-2"
                  onClick={payNow}
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <>
                      <span className="spinner-border spinner-border-sm"></span>
                      <span>Connecting Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>🔒 Pay Now</span>
                    </>
                  )}
                </button>

                <div className="text-center">
                  <small className="text-muted d-flex align-items-center justify-content-center gap-1" style={{ fontSize: "0.75rem" }}>
                    <span>🛡️</span> 256-bit Encrypted Cashfree Secure Payment
                  </small>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}