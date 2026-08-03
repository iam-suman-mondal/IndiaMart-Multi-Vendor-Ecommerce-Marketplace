import { useState } from "react";
import { getCustomerOrderDetails } from "../../../../apis/services/order-service";

const Orders = () => {
  const [searchInput, setSearchInput] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setOrder(null);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getCustomerOrderDetails(searchInput);

      setOrder(response);
    } catch (err) {
      console.error(err);
      setOrder(null);
      setError("Order not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      <h3 className="fw-bold">Orders</h3>

      <p className="text-muted mb-4">
        Search and manage customer orders.
      </p>

      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">
          <div className="input-group" style={{ maxWidth: "450px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter order ID"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>

          {loading && (
            <div className="mt-4">
              <p>Loading...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger mt-4">
              {error}
            </div>
          )}

          {order && (
            <div className="card mt-4 shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h4 className="fw-bold mb-4">Order Details</h4>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <strong>Order ID</strong>
                    <p>{order.orderId}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Status</strong>
                    <p>{order.status}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Subtotal</strong>
                    <p>₹{order.subtotal}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Delivery Charge</strong>
                    <p>₹{order.deliveryCharge}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Handling Fee</strong>
                    <p>₹{order.handlingFee}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Grand Total</strong>
                    <p>₹{order.grandTotal}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Address</strong>
                    <p>{order.address}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>City</strong>
                    <p>{order.city}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>State</strong>
                    <p>{order.state}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Pincode</strong>
                    <p>{order.pincode}</p>
                  </div>
                </div>

                <hr />

                <h5 className="fw-bold mb-3">Ordered Items</h5>

                {order.items?.map((item) => (
                  <div
                    key={item.productId}
                    className="card border-0 bg-light mb-3"
                  >
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-2 text-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{
                              height: "100px",
                              objectFit: "contain",
                            }}
                          />
                        </div>

                        <div className="col-md-10">
                          <h5>{item.name}</h5>

                          <div className="row">
                            <div className="col-md-4">
                              <strong>Product ID:</strong>{" "}
                              {item.productId}
                            </div>

                            <div className="col-md-4">
                              <strong>Vendor ID:</strong>{" "}
                              {item.vendorId}
                            </div>

                            <div className="col-md-4">
                              <strong>Quantity:</strong>{" "}
                              {item.quantity}
                            </div>

                            <div className="col-md-4 mt-2">
                              <strong>Price:</strong> ₹
                              {item.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;