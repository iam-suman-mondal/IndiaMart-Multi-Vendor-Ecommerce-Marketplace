import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getAllOrderForVendor, updateVendorOrderStatus } from '../../../apis/services/order-service';
import { toast } from 'react-toastify';

const Orders = () => {
  const navigate = useNavigate();
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrderForVendor();
      setOrdersList(Array.isArray(data) ? data : data.content || []);
    } catch (error) {
      toast.error("Failed to load vendor orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (vendorOrderId, newStatus) => {
    try {
      await updateVendorOrderStatus(vendorOrderId, newStatus);
      toast.success("Order status updated successfully!");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case 'DELIVERED': return 'bg-success';
      case 'PENDING': return 'bg-warning text-dark';
      case 'SHIPPED':
      case 'OUT_FOR_DELIVERY': return 'bg-info text-dark';
      case 'CANCELLED': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container-fluid pt-5 px-2 px-md-4 bg-light min-vh-100 d-flex flex-column align-items-center">
      <div className="w-100" style={{ maxWidth: '950px' }}>
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-4 gap-2">
          <button 
            className="btn btn-sm btn-outline-secondary px-3 fw-bold rounded-2 shadow-sm"
            onClick={() => navigate('/vendor')}
          >
            ← Dashboard
          </button>
          <div>
            <h2 className="fw-bold text-dark mb-0 fs-2">Incoming Orders</h2>
            <p className="text-muted small mb-0">Track customer purchases, fulfillment cycles, and products</p>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-3 p-3 p-md-4 bg-white w-100" style={{ maxWidth: '950px' }}>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="text-secondary small text-uppercase">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3">Products</th>
                  <th className="py-3">Subtotal</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ordersList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">No orders found.</td>
                  </tr>
                ) : (
                  ordersList.map((order) => (
                    <tr key={order.id}>
                      <td className="py-3 px-4 fw-bold text-primary">ORD-{order.id}</td>
                      <td className="py-3">
                        {order.items && order.items.map((item, idx) => (
                          <div key={idx} className="small text-dark fw-semibold">
                            {item.productName} (x{item.quantity})
                          </div>
                        ))}
                      </td>
                      <td className="py-3 fw-bold text-dark">₹{order.subtotal}</td>
                      <td className="py-3">
                        <span className={`badge ${getBadgeClass(order.status)} px-2.5 py-1.5 rounded-pill`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <select 
                          className="form-select form-select-sm"
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;