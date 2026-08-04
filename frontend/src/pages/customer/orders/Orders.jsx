import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllOrdersForCustomer } from "../../../apis/services/order-service";
import { addOrUpdateRating } from "../../../apis/services/product-service";

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Track product ratings map: { [productId]: ratingValue }
  const [productRatings, setProductRatings] = useState({});
  const [submittingRatingId, setSubmittingRatingId] = useState(null);

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
      
      const ordersList = Array.isArray(data) ? data : data?.orders || [];
      setOrders(ordersList);

      // Extract existing user ratings across all items & orders
      const initialRatings = {};
      ordersList.forEach((order) => {
        const items = order.items || order.orderItems || [];
        items.forEach((item) => {
          const pId = item.productId || item.product?.productId || item.id || item.product?.id;
          const userGivenRating =
            item.userRating ??
            item.rating ??
            item.productRating ??
            item.product?.userRating ??
            item.product?.rating;

          if (pId && userGivenRating) {
            initialRatings[pId] = Number(userGivenRating);
          }
        });
      });
      setProductRatings(initialRatings);
    } catch (error) {
      console.error("Failed to fetch customer orders:", error);
      setErrorMsg("Failed to load your order history. Please try again later.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Submit / Update product rating with ONLY rating in payload
  const handleRateProduct = async (productId, selectedRating) => {
    if (!productId) {
      console.error("Product ID is missing:", productId);
      alert("Cannot submit rating: Product ID is missing.");
      return;
    }

    try {
      setSubmittingRatingId(productId);
      console.log(`Submitting rating ${selectedRating} for productId:`, productId);

      // Payload containing ONLY rating as requested
      const payload = {
        rating: Number(selectedRating),
      };

      const res = await addOrUpdateRating(productId, payload);
      console.log("Rating response:", res);

      // Update local state instantly and permanently
      setProductRatings((prev) => ({
        ...prev,
        [productId]: Number(selectedRating),
      }));

      alert(`Rating updated to ${selectedRating} ★ successfully!`);
    } catch (error) {
      console.error("Failed to update rating:", error);
      const backendErrMsg =
        error.response?.data?.message ||
        (typeof error.response?.data === "string" ? error.response.data : null) ||
        error.message ||
        "Server error";

      alert(`Failed to submit rating: ${backendErrMsg}`);
    } finally {
      setSubmittingRatingId(null);
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

  // Interactive 5-Star Component with Persistent Rating Display & Edit Capability
  const StarRatingPicker = ({ productId, currentRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const hasGivenRating = Number(currentRating) > 0;

    return (
      <div className="d-flex align-items-center flex-wrap gap-1.5 mt-1">
        <span className="small text-muted me-1" style={{ fontSize: "0.75rem" }}>
          {hasGivenRating ? (
            <>
              Your Rating: <strong className="text-dark">{currentRating} ★</strong>
            </>
          ) : (
            "Rate Product:"
          )}
        </span>

        {/* 5-Star Interactive Array */}
        <div className="d-inline-flex align-items-center">
          {[1, 2, 3, 4, 5].map((star) => {
            const active = star <= (hoverRating || currentRating || 0);
            return (
              <span
                key={star}
                style={{
                  cursor: submittingRatingId === productId ? "wait" : "pointer",
                  fontSize: "1.15rem",
                  color: active ? "#ffc107" : "#cbd5e1",
                  transition: "color 0.15s ease, transform 0.15s ease",
                  display: "inline-block",
                  padding: "0 1px",
                }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRateProduct(productId, star)}
                title={
                  hasGivenRating
                    ? `Click to update rating to ${star} Star${star > 1 ? "s" : ""}`
                    : `Rate ${star} Star${star > 1 ? "s" : ""}`
                }
              >
                ★
              </span>
            );
          })}
        </div>

        {/* Badge Indicator for updating */}
        {hasGivenRating && (
          <span
            className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle ms-1"
            style={{ fontSize: "0.65rem" }}
            title="Click any star to update your rating"
          >
            Edit Rating ✏️
          </span>
        )}
      </div>
    );
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

                  {/* STACKED ITEMS LIST */}
                  <div className="d-flex flex-column gap-3 my-3 border-top border-bottom py-3">
                    {items.length > 0 ? (
                      items.map((item, idx) => {
                        const productId =
                          item.productId ||
                          item.product?.productId ||
                          item.id ||
                          item.product?.id;

                        const itemName =
                          item.name ||
                          item.productName ||
                          item.product?.name ||
                          "Product Item";

                        const itemImage =
                          item.image ||
                          item.productImage ||
                          item.product?.image ||
                          "https://via.placeholder.com/60";

                        const itemPrice = Number(item.price || item.product?.price) || 0;
                        const itemQty = Number(item.quantity || item.qty) || 1;
                        const itemTotal = itemPrice * itemQty;

                        // Check current persistent rating from state or item object
                        const currentRating =
                          productRatings[productId] ??
                          item.userRating ??
                          item.rating ??
                          item.productRating ??
                          item.product?.userRating ??
                          item.product?.rating ??
                          0;

                        const itemStatus = (
                          item.status ||
                          item.itemStatus ||
                          item.orderItemStatus ||
                          order.status ||
                          order.orderStatus ||
                          ""
                        ).toUpperCase();

                        const isItemDelivered =
                          itemStatus === "DELIVERED" || itemStatus === "COMPLETED";

                        return (
                          <div
                            key={idx}
                            className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 border-bottom border-light pb-2"
                          >
                            {/* Image & Title Info */}
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={itemImage}
                                alt={itemName}
                                width="56"
                                height="56"
                                className="rounded border flex-shrink-0"
                                style={{ objectFit: "cover", backgroundColor: "#f8fafc" }}
                              />
                              <div>
                                <div className="d-flex align-items-center gap-2">
                                  <h6 className="fw-bold text-dark mb-0 fs-6">
                                    {itemName}
                                  </h6>
                                  {item.status && (
                                    <span
                                      className={`badge ${
                                        isItemDelivered
                                          ? "bg-success-subtle text-success"
                                          : "bg-warning-subtle text-warning-emphasis"
                                      }`}
                                      style={{ fontSize: "0.65rem" }}
                                    >
                                      {item.status}
                                    </span>
                                  )}
                                </div>

                                <p className="text-muted small mb-0">
                                  Qty: <strong className="text-dark">{itemQty}</strong> × ₹{itemPrice.toLocaleString("en-IN")}
                                </p>

                                {/* Persistent Rating Control (Shows given rating & allows anytime updates) */}
                                {isItemDelivered ? (
                                  <StarRatingPicker
                                    productId={productId}
                                    currentRating={currentRating}
                                  />
                                ) : (
                                  <small
                                    className="text-muted d-block mt-1"
                                    style={{ fontSize: "0.72rem" }}
                                  >
                                    Status:{" "}
                                    <span className="fw-semibold text-warning-emphasis">
                                      {item.status || order.status || "In Transit"}
                                    </span>{" "}
                                    (Rating available after delivery)
                                  </small>
                                )}
                              </div>
                            </div>

                            {/* Item Total Price */}
                            <span className="fw-bold text-dark text-nowrap fs-6 align-self-sm-center">
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