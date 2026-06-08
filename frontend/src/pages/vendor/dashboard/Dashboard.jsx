import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const salesData = [
  { day: 'Mon', Sales: 1200 },
  { day: 'Tue', Sales: 2100 },
  { day: 'Wed', Sales: 1500 },
  { day: 'Thu', Sales: 3100 },
  { day: 'Fri', Sales: 4250 }, // Matches the total sales metric card!
];
const Dashboard = () => {
  return (
    <div className="container-fluid pt-4">
 
      {/* Main header part */}
      <div className="mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted small">Here's Your Statistics</p>
      </div>

      {/* blocks */}
      <div className="row g-3">
        {/* block 1 */}
        <div className="col-12 col-md-4">
          <div className="p-3 border rounded bg-white shadow-sm d-flex justify-content-between align-items-center">
            <div>
              <h6 className="text-muted small text-uppercase fw-semibold mb-1">Total Sales</h6>
              <h3 className="fw-bold mb-0">₹4,250.00</h3>
            </div>
            <div className="fs-3">💰</div>
          </div>
        </div>

        {/* block 2 */}
        <div className="col-12 col-md-4">
          <div className="p-3 border rounded bg-white shadow-sm d-flex justify-content-between align-items-center">
            <div>
              <h6 className="text-muted small text-uppercase fw-semibold mb-1">Total Orders</h6>
              <h3 className="fw-bold mb-0">32</h3>
            </div>
            <div className="fs-3">📦</div>
          </div>
        </div>
        
        {/* block 3 */}
        <div className="col-12 col-md-4">
          <div className="p-3 border rounded bg-white shadow-sm d-flex justify-content-between align-items-center">
            <div>
              <h6 className="text-muted small text-uppercase fw-semibold mb-1">Total Products</h6>
              <h3 className="fw-bold mb-0">18</h3>
            </div>
            <div className="fs-3">🏷️</div>
          </div>
        </div>
      </div> {/* Closes blocks row */}
   

 
      {/* VISUAL SALES PERFORMANCE CHART */}
      <div className="mt-4">
        <div className="p-4 border rounded bg-white shadow-sm">
          
          <div className="mb-3">
            <h5 className="fw-bold mb-1">Sales Performance</h5>
            <p className="text-muted small mb-0">Weekly revenue trends analysis</p>
          </div>

          {/* Dynamic container adjusting height to 300px */}
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              
              {/* Using an AreaChart for a premium shaded curve appearance */}
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                
                {/* Horizontal configuration axes lines */}
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6c757d', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6c757d', fontSize: 12 }} />
                
                {/* Clean hover menu box revealing numbers */}
                <Tooltip />
                
                {/* Gradient area line tracking path coordinates */}
                <Area type="monotone" dataKey="Sales" stroke="#0d6efd" fillOpacity={0.1} fill="#0d6efd" strokeWidth={2} />
              </AreaChart>

            </ResponsiveContainer>
          </div>

        </div>
      </div>
      {/* chart part ends here */}

      {/* RECENT ORDERS TABLE CARD*/}
     
      <div className="mt-4">
        <div className="p-4 border rounded bg-white shadow-sm">
          
          {/* Table Header inside Card */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Recent Orders</h5>
          </div>

          {/* Table Responsive Frame wrapper */}
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              
              {/* Table Column Labels Headers */}
              <thead className="table-light text-secondary small">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              
              {/* Table Body Content Rows */}
              <tbody className="small">
                <tr>
                  <td className="fw-semibold">#ORD-96469</td>
                  <td>Prathmesh Rayke</td>
                  <td>2026-06-05</td>
                  <td>₹120.00</td>
                  <td>
                    <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                      Delivered
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="fw-semibold">#ORD-96470</td>
                  <td>Suman Mondal</td>
                  <td>2026-06-06</td>
                  <td>₹45.50</td>
                  <td>
                    <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2 py-1">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>

        </div>
      </div>
      {/* recent table part ends here  */}

    </div> // Closes the main container-fluid
  )
}

export default Dashboard