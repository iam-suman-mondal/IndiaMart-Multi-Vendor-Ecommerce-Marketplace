import { useState, useEffect } from "react";
import { getAllCustomerDetails } from "../../../../apis/services/user-service";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllCustomers = async () => {
    const data = await getAllCustomerDetails();
    setCustomers(data);
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  // Filter customers based on search input (Parameters: ID, name, email)
  const filteredCustomers = customers.filter((customer) => {
  const name = customer.name?.toLowerCase() || "";
  const email = customer.email?.toLowerCase() || "";
  const id = String(customer.id || "").toLowerCase();

  return (
    name.includes(searchTerm.toLowerCase()) ||
    email.includes(searchTerm.toLowerCase()) ||
    id.includes(searchTerm.toLowerCase())
  );
});

  // function to render status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case true:
        return (
          <span className="badge bg-success bg-opacity-25 text-success px-2 py-1 rounded-pill">
            Active
          </span>
        );
      case false:
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
                      <td>{customer.phoneNo}</td>
                      <td>{customer.createdOn}</td>
                      <td>{getStatusBadge(customer.isActive)}</td>
                      <td>
                        {/* Action Buttons */}
                        <div className="d-flex gap-2">
                          {customer.isActive ? (
                            <button className="btn btn-sm btn-outline-danger">
                              Ban
                            </button>
                          ) : (
                            <button className="btn btn-sm btn-outline-primary">
                              Unban
                            </button>
                          )}
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
