import React from 'react'
import { useNavigate } from 'react-router';

const Orders = () => {
  const navigate=useNavigate();

  const ordersList = [
    { id: "ORD-9646", customer: "Rahul Sharma", date: "June 05, 2026", total: "₹3,999", status: "Delivered", badgeClass: "bg-success" },
    { id: "ORD-8821", customer: "Priya Patel", date: "June 06, 2026", total: "₹1,499", status: "Processing", badgeClass: "bg-warning text-dark" },
    { id: "ORD-4310", customer: "Amit Mishra", date: "June 07, 2026", total: "₹7,498", status: "Shipped", badgeClass: "bg-info text-dark" }
  ];
  return (
    <div className="container-fluid pt-5 px-2 px-md-4 bg-light min-vh-100 d-flex flex-column align-items-center">
      
      <div className="w-100" style={{ maxWidth: '900px' }}>
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-4 gap-2">
          <button 
            className="btn btn-sm btn-outline-secondary px-3 fw-bold rounded-2 shadow-sm"
            onClick={() => navigate('/vendor')}
          >
            ← Dashboard
          </button>
          <div>
            <h2 className="fw-bold text-dark mb-0 fs-2">Incoming Orders</h2>
            <p className="text-muted small mb-0">Track customer purchases, fulfillment cycles, and invoices</p>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-3 p-3 p-md-4 bg-white w-100" style={{ maxWidth: '900px' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr className="text-secondary small text-uppercase">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Date Ordered</th>
                <th className="py-3">Total Amount</th>
                <th className="py-3">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order) => (
                <tr key={order.id}>
                  <td className="py-3 px-4 fw-bold text-primary">{order.id}</td>
                  <td className="py-3 fw-semibold text-dark">{order.customer}</td>
                  <td className="py-3 text-muted fs-6">{order.date}</td>
                  <td className="py-3 fw-bold text-dark">{order.total}</td>
                  <td className="py-3">
                    <span className={`badge ${order.badgeClass} px-2.5 py-1.5 rounded-pill`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Orders