import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllOrdersForCustomer } from "../../../apis/services/order-service";

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchCustomerOrders();
  }, []);

  const fetchCustomerOrders = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      console.log("Fetching customer order history...");
      const data = await getAllOrdersForCustomer();
      console.log("Orders received:", data);
      setOrders(Array.isArray(data) ? data : data?.orders || []);
    } catch (error) {
      console.error("Failed to fetch customer orders:", error);
      setErrorMsg("Failed to load your order history. Please try again later.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Status badge styling helper
  const renderStatusBadge = (status) => {
    const s = (status || "").toUpperCase();
    if (s === "DELIVERED" || s === "COMPLETED") {
      return <span className="badge bg-success-subtle text-success border border-success-subtle px-2.5 py-1 rounded-pill">Delivered ✅</span>;
    }
    if (s === "PAID" || s === "SUCCESS" || s === "PROCESSING") {
      return <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2.5 py-1 rounded-pill">Processing 🚚</span>;
    }
    if (s === "PENDING" || s === "CREATED") {
      return <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2.5 py-1 rounded-pill">Payment Pending ⏳</span>;
    }
    if (s === "FAILED" || s === "CANCELLED") {
      return <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2.5 py-1 rounded-pill">Failed / Cancelled ❌</span>;
    }
    return <span className="badge bg-secondary-subtle text-secondary px-2.5 py-1 rounded-pill">{status || "Placed"}</span>;
  };

  return (
    <div
      className="container-fluid py-4 py-md-5"
      style={{ backgroundColor: "#eef2f7", minHeight: "100vh" }}
    >
      <div className="container" style={{ maxWidth: "800px" }}>
        
        {/* Header Navigation */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <button
            className="btn btn-outline-dark rounded-pill px-3 shadow-xs"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
          <h3 className="fw-bold text-dark mb-0 fs-4">My Order History</h3>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3"></div>
            <p className="text-muted small">Loading your order history...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && errorMsg && (
          <div className="alert alert-danger rounded-3 shadow-xs mb-4">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Empty Orders View */}
        {!loading && !errorMsg && orders.length === 0 && (
          <div className="card border-0 shadow-sm rounded-4 text-center p-5 my-4">
            <div className="fs-1 mb-3">📦</div>
            <h4 className="fw-bold text-dark mb-2">No Orders Found</h4>
            <p className="text-muted mb-4">
              You haven't placed any orders yet. Start exploring our latest products!
            </p>
            <div>
              <button
                className="btn btn-primary rounded-pill px-4 py-2 fw-semibold"
                onClick={() => navigate("/")}
              >
                Browse Products
              </button>
            </div>
          </div>
        )}

        {/* Orders List */}
        {!loading &&
          orders.map((order) => {
            const orderId = order.orderId || order.id;
            const items = order.items || order.orderItems || [];
            // Using grandTotal field name as requested
            const grandTotal = Number(order.grandTotal || order.grand_total || order.total || 0);
            const dateStr = order.createdOn || order.date || order.createdAt;

            return (
              <div
                key={orderId}
                className="card border-0 shadow-sm mb-4 rounded-4 overflow-hidden"
              >
                <div className="card-body p-4">
                  
                  {/* Order Top Header */}
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h5 className="fw-bold text-dark mb-0">Order #{orderId}</h5>
                        {renderStatusBadge(order.status || order.orderStatus)}
                      </div>

                      <p className="text-muted small mb-0">
                        {dateStr
                          ? `Placed at ${new Date(dateStr).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}`
                          : "Recent Order"}
                      </p>
                    </div>

                    <div className="text-end">
                      <span className="text-muted small d-block">Grand Total</span>
                      <h4 className="fw-bold text-primary mb-0 text-nowrap">
                        ₹{grandTotal.toLocaleString("en-IN")}
                      </h4>
                    </div>
                  </div>

                  {/* STACKED ITEMS LIST (One Below Another) */}
                  <div className="d-flex flex-column gap-3 my-3 border-top border-bottom py-3">
                    {items.length > 0 ? (
                      items.map((item, idx) => {
                        const itemPrice = Number(item.price) || 0;
                        const itemQty = Number(item.quantity || item.qty) || 1;
                        const itemTotal = itemPrice * itemQty;

                        return (
                          <div
                            key={idx}
                            className="d-flex align-items-center justify-content-between gap-3"
                          >
                            {/* Image & Title Info */}
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={
                                  item.image ||
                                  item.productImage ||
                                  "https://via.placeholder.com/60"
                                }
                                alt={item.name || item.productName || "Product"}
                                width="56"
                                height="56"
                                className="rounded border flex-shrink-0"
                                style={{ objectFit: "cover", backgroundColor: "#f8fafc" }}
                              />
                              <div>
                                <h6 className="fw-bold text-dark mb-1 fs-6">
                                  {item.name || item.productName || "Product Item"}
                                </h6>
                                <p className="text-muted small mb-0">
                                  Qty: <strong className="text-dark">{itemQty}</strong> × ₹{itemPrice.toLocaleString("en-IN")}
                                </p>
                              </div>
                            </div>

                            {/* Item Total Price */}
                            <span className="fw-bold text-dark text-nowrap fs-6">
                              ₹{itemTotal.toLocaleString("en-IN")}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-muted small mb-0">No item details recorded.</p>
                    )}
                  </div>

                </div>
              </div>
            );
          })}

      </div>
    </div>
  );
}