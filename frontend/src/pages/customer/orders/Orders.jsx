import React from 'react'
import { useNavigate } from 'react-router';

const Orders = () => {
  const navigate= useNavigate();
   const orders = [
    {
      id: 1,
      amount: 113,
      date: "Placed at 16th May 2026, 04:30 pm",
      images: [
                   "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100",
       "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=100",
       "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100",
  "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=100",
      ],
    },
    {
      id: 2,
      amount: 99,
      date: "Placed at 14th May 2026, 07:23 am",
      images: [
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100",
       "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=100",
       "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100",
  "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=100",
      ],
    },
  ];

  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#eef2f7", minHeight: "100vh" }}
    >
      <button
  className="btn btn-outline-dark mb-4"
  onClick={() => navigate("/customer/profile")}
>
  ← Back to Profile
</button>

      {orders.map((order) => (
        <div
          key={order.id}
          className="card border-0 shadow-sm mb-4 rounded-4"
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h4 className="fw-bold">
                  Order delivered ✅
                </h4>

                <p className="text-muted mb-3">
                  {order.date}
                </p>
              </div>

              <h4 className="fw-bold">
                ₹{order.amount} ›
              </h4>
            </div>

            <div className="d-flex gap-3 mb-3">
              {order.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="product"
                  width="60"
                  height="60"
                  className="rounded"
                />
              ))}
            </div>
          </div>

          <div className="border-top text-center py-3">
            <button className="btn btn-link text-dark fw-bold text-decoration-none">
              Rate order
            </button>
          </div>
        </div>
      ))}

      <div className="text-center mt-4">
        <button className="btn btn-outline-danger px-5 py-2 rounded-pill">
          ↓ Load More
        </button>
      </div>
    </div>
  )
}

export default Orders