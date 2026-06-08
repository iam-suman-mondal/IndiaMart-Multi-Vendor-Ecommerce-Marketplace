import { useState } from "react";

const customerData = [
  {
    id: "1001",
    name: "Aarav Patel",
    email: "aarav.p@example.in",
    phone: "+91 9876543210",
    joinedOn: "12 Jan, 2024",
    status: "Active",
  },
  {
    id: "1002",
    name: "Priya Sharma",
    email: "priya.sharma@example.in",
    phone: "+91 8765432109",
    joinedOn: "15 Jan, 2024",
    status: "Active",
  },
  {
    id: "1003",
    name: "Rahul Desai",
    email: "r.desai99@example.in",
    phone: "+91 7654321098",
    joinedOn: "02 Feb, 2024",
    status: "Suspended",
  },
  {
    id: "1004",
    name: "Neha Gupta",
    email: "neha.g@example.in",
    phone: "+91 9988776655",
    joinedOn: "20 Feb, 2024",
    status: "Active",
  },
  {
    id: "1005",
    name: "Vikram Singh",
    email: "vikram.singh@example.in",
    phone: "+91 8877665544",
    joinedOn: "05 Mar, 2024",
    status: "Suspended",
  },
  {
    id: "1006",
    name: "Ananya Iyer",
    email: "ananya.iyer@example.in",
    phone: "+91 9123456780",
    joinedOn: "10 Mar, 2024",
    status: "Active",
  },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter customers based on search input (Parameters: ID, name, email)
  const filteredCustomers = customerData.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // function to render status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="badge bg-success bg-opacity-25 text-success px-2 py-1 rounded-pill">
            Active
          </span>
        );
      case "Suspended":
        return (
          <span className="badge bg-danger bg-opacity-25 text-danger px-2 py-1 rounded-pill">
            Suspended
          </span>
        );
      default:
        return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      <h3 className="lh-1 fw-bold">Customer Management</h3>
      <p className="text-muted mb-4">
        Manage customer information and account status efficiently
      </p>

      {/* Main Card Container */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">
          {/* Header & Search Bar */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h5 className="mb-0 fw-semibold">All Customers</h5>
            <div className="input-group" style={{ maxWidth: "300px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle text-nowrap mb-0">
              <thead className="table-secondary text-muted">
                <tr>
                  <th scope="col" className="fw-semibold">
                    ID
                  </th>
                  <th scope="col" className="fw-semibold">
                    Full Name
                  </th>
                  <th scope="col" className="fw-semibold">
                    Email
                  </th>
                  <th scope="col" className="fw-semibold">
                    Phone No
                  </th>
                  <th scope="col" className="fw-semibold">
                    Joined On
                  </th>
                  <th scope="col" className="fw-semibold">
                    Status
                  </th>
                  <th scope="col" className="fw-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer, index) => (
                    <tr key={index}>
                      <td className="fw-medium">{customer.id}</td>
                      <td className="fw-bold text-dark">{customer.name}</td>
                      <td className="text-muted">{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.joinedOn}</td>
                      <td>{getStatusBadge(customer.status)}</td>
                      <td>
                        {/* Action Buttons */}
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary">
                            Suspend
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Empty State if search finds nothing
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No customers found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
