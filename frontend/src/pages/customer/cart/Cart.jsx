import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../../../redux/CartSlice";
import { createOrder } from "../../../apis/services/order-service";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // Read actual live cart items and totals from Redux Store safely
  const cart = useSelector((state) => state.cart.items || []);
  const subtotal = useSelector((state) => state.cart.totalAmount || 0);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity || 0);

  // Pricing calculations according to platform rules
  const handlingFee = cart.length > 0 ? 5 : 0;
  const deliveryCharge = cart.length > 0 ? (subtotal >= 499 ? 0 : 50) : 0;
  const total = subtotal + handlingFee + deliveryCharge;

  // Create Order API Call & Checkout Redirect Handler
  const handleProceedToCheckout = async () => {
    if (!cart || cart.length === 0) return;

    try {
      setIsSubmittingOrder(true);

      // Format payload according to API contract
      const payload = {
        items: cart.map((item) => ({
          productId: item.productId || item.id,
          quantity: item.quantity || item.qty || 1,
        })),
      };

      console.log("Creating order with payload:", payload);
      const data = await createOrder(payload);
      console.log("Order created successfully:", data);

      const createdOrderId = data.orderId || data.id || (data.data && data.data.orderId);
      const paymentSessionId = data.paymentSessionId || data.payment_session_id || (data.data && data.data.paymentSessionId);

      // Redirect user to customer order summary page with orderId (and paymentSessionId if present)
      if (paymentSessionId) {
        navigate(`/customer/order_summury?orderId=${createdOrderId}&paymentSessionId=${paymentSessionId}`);
      } else {
        navigate(`/customer/order_summury?orderId=${createdOrderId}`);
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <>
      <style>{`
        .cart-item-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          transition: all 0.25s ease;
        }
        .cart-item-card:hover {
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06) !important;
          border-color: rgba(13, 110, 253, 0.2) !important;
        }

        .cart-img-box {
          width: 80px;
          height: 80px;
          background-color: #f8fafc;
          border-radius: 0.75rem;
          overflow: hidden;
          flex-shrink: 0;
        }
        @media (min-width: 576px) {
          .cart-img-box {
            width: 90px;
            height: 90px;
          }
        }
        .cart-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Quantity Controls */
        .qty-control-box {
          border: 1px solid #cbd5e1;
          border-radius: 2rem;
          padding: 2px 6px;
          background-color: #ffffff;
          display: inline-flex;
          align-items: center;
          user-select: none;
        }
        .qty-btn {
          width: 28px;
          height: 28px;
          border: none;
          background: transparent;
          color: #1e293b;
          font-weight: bold;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
        }
        .qty-btn:hover:not(:disabled) {
          background-color: #f1f5f9;
          color: #0d6efd;
        }

        .remove-btn {
          color: #94a3b8;
          transition: color 0.2s ease, background-color 0.2s ease;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: none;
          background: transparent;
          flex-shrink: 0;
        }
        .remove-btn:hover {
          color: #ef4444;
          background-color: #fef2f2;
        }

        .summary-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          overflow: hidden;
          width: 100%;
        }

        @media (min-width: 992px) {
          .summary-sticky {
            position: sticky;
            top: 90px;
            z-index: 10;
          }
        }
      `}</style>

      <div className="container py-4 py-md-5">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom border-light">
          <div>
            <h2 className="fw-bold text-dark mb-1 fs-3 fs-md-2">Shopping Cart</h2>
            <p className="text-muted small mb-0">
              You have <strong>{totalQuantity}</strong> {totalQuantity === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          {cart.length > 0 && (
            <Link to="/" className="btn btn-link text-primary text-decoration-none fw-semibold small p-0">
              ← Continue Shopping
            </Link>
          )}
        </div>

        {cart.length === 0 ? (
          /* EMPTY CART VIEW */
          <div className="card text-center p-4 p-md-5 border-0 shadow-sm rounded-4 mx-auto my-4" style={{ maxWidth: "520px" }}>
            <div className="fs-1 mb-3">🛒</div>
            <h3 className="fw-bold text-dark mb-2">Your Cart is Empty</h3>
            <p className="text-muted mb-4">
              Looks like you haven't added any products to your cart yet.
            </p>
            <div>
              <Link to="/" className="btn btn-primary rounded-pill px-4 py-2.5 fw-semibold shadow-xs">
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* CART CONTENT */
          <div className="row g-4 align-items-start">
            {/* CART ITEMS LIST */}
            <div className="col-lg-8">
              <div className="d-flex flex-column gap-3">
                {cart.map((item) => {
                  const id = item.productId || item.id;
                  const name = item.productName || item.name || "Product";
                  const price = Number(item.price) || 0;
                  const qty = item.quantity || item.qty || 1;

                  return (
                    <div key={id} className="card cart-item-card rounded-4 p-3 shadow-xs">
                      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
                        
                        {/* Product Image & Info */}
                        <div className="d-flex align-items-center gap-3 w-100 w-sm-auto">
                          <div className="cart-img-box border">
                            <img src={item.image} alt={name} />
                          </div>
                          <div className="overflow-hidden">
                            <h6 className="fw-bold text-dark mb-1 fs-6 text-truncate" style={{ maxWidth: "260px" }}>
                              {name}
                            </h6>
                            <p className="text-muted small mb-1">
                              Brand: <span className="fw-medium text-dark">{item.brand || "Standard"}</span>
                            </p>
                            <span className="text-primary fw-bold small text-nowrap">
                              ₹{price.toLocaleString("en-IN")} each
                            </span>
                          </div>
                        </div>

                        {/* Quantity, Subtotal & Remove Button */}
                        <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-2 gap-sm-3 gap-md-4 w-100 w-sm-auto border-top border-light pt-2 pt-sm-0">
                          {/* Quantity Selector */}
                          <div className="qty-control-box">
                            <button
                              className="qty-btn"
                              onClick={() => dispatch(decreaseQuantity(id))}
                              disabled={qty <= 1}
                              title="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="fw-bold text-dark px-2 small">{qty}</span>
                            <button
                              className="qty-btn"
                              onClick={() => dispatch(addToCart(item))}
                              title="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="text-end px-1" style={{ minWidth: "85px" }}>
                            <span className="text-muted fs-7 d-block leading-none d-sm-none">Subtotal</span>
                            <span className="fw-bold text-dark fs-6 text-nowrap">
                              ₹{(price * qty).toLocaleString("en-IN")}
                            </span>
                          </div>

                          {/* Delete Button */}
                          <button
                            className="remove-btn"
                            onClick={() => dispatch(removeFromCart(id))}
                            title="Remove item"
                          >
                            ✕
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="col-lg-4">
              <div className="summary-card summary-sticky shadow-sm">
                <div className="card-body p-3 p-sm-4">
                  <h4 className="fw-bold text-dark mb-3.5 fs-5 fs-md-4">Order Summary</h4>

                  {/* Subtotal */}
                  <div className="d-flex justify-content-between align-items-center mb-2.5 gap-2">
                    <span className="text-secondary small">Subtotal ({totalQuantity} items)</span>
                    <strong className="text-dark text-nowrap">₹{subtotal.toLocaleString("en-IN")}</strong>
                  </div>

                  {/* Platform / Handling Fee */}
                  <div className="d-flex justify-content-between align-items-center mb-2.5 gap-2">
                    <span className="text-secondary small">Handling Fee</span>
                    <strong className="text-dark text-nowrap">₹{handlingFee}</strong>
                  </div>

                  {/* Delivery Charges */}
                  <div className="d-flex justify-content-between align-items-center mb-2.5 gap-2">
                    <span className="text-secondary small">Delivery Charges</span>
                    <strong className={deliveryCharge === 0 ? "text-success fw-bold text-nowrap" : "text-dark text-nowrap"}>
                      {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                    </strong>
                  </div>

                  {/* Free Delivery Threshold Indicator */}
                  {subtotal < 499 && (
                    <div className="alert alert-info py-2 px-3 my-3 small rounded-3 border-0 bg-info-subtle text-info-emphasis">
                      Add <strong>₹{(499 - subtotal).toLocaleString("en-IN")}</strong> more to get <strong>FREE Delivery</strong>!
                    </div>
                  )}

                  <hr className="my-3 text-secondary opacity-25" />

                  {/* Total Amount */}
                  <div className="d-flex justify-content-between align-items-center mb-3.5 gap-2">
                    <div>
                      <span className="fw-bold text-dark fs-6 d-block">Total Amount</span>
                      <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                        Includes all applicable charges
                      </small>
                    </div>
                    <span className="fw-extrabold text-primary fs-4 fs-md-3 text-nowrap">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Proceed to Checkout Button at Bottom with Async Loading Spinner */}
                  <button
                    className="btn btn-primary btn-lg w-100 rounded-pill py-2.5 py-md-3 fw-bold fs-6 shadow-xs d-flex align-items-center justify-content-center gap-2"
                    onClick={handleProceedToCheckout}
                    disabled={isSubmittingOrder}
                  >
                    {isSubmittingOrder ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                        <span>Creating Order...</span>
                      </>
                    ) : (
                      <span>Proceed to Checkout →</span>
                    )}
                  </button>

                  <div className="text-center mt-3">
                    <small className="text-muted d-flex align-items-center justify-content-center gap-1" style={{ fontSize: "0.75rem" }}>
                      <span>🔒</span> 100% Secure Checkout Guaranteed
                    </small>
                  </div>

                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
}