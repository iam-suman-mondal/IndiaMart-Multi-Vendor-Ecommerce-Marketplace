import { useEffect, useState } from "react";
import { getAllVendorsByAdmin } from "../../../../apis/services/user-service";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllVenders = async () => {
    const data = await getAllVendorsByAdmin();
    console.log(data);
    setVendors(data);
  };

  useEffect(() => {
    fetchAllVenders();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Filter vendors based on search input (Parameters: ID, name, email, gst)
  const filteredVendors = vendors.filter((vendor) => {
    const name = vendor.user?.name?.toLowerCase() || "";
    const email = vendor.user?.email?.toLowerCase() || "";
    const id = String(vendor.id || "").toLowerCase();
    const gstNo = vendor.gstNo?.toLowerCase() || "";

    const search = searchTerm.toLowerCase();

    return (
      name.includes(search) ||
      email.includes(search) ||
      id.includes(search) ||
      gstNo.includes(search)
    );
  });

  // Helper function to render status badges
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
          <span className="badge bg-secondary bg-opacity-25 text-secondary px-2 py-1 rounded-pill">
            Inactive
          </span>
        );
      default:
        return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      <h3 className="lh-1 fw-bold">Vendor Management</h3>
      <p className="text-muted mb-4">
        Onboard, monitor, and manage vendor accounts and GST details
      </p>

      {/* Main Card Container */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">
          {/* Header & Search Bar */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h5 className="mb-0 fw-semibold">All Vendors</h5>
            <div className="input-group" style={{ maxWidth: "300px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search vendors..."
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
                    GST Number
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
                {filteredVendors.length > 0 ? (
                  filteredVendors.map((vendor, index) => (
                    <tr key={index}>
                      <td className="fw-medium">{vendor.id}</td>
                      <td className="fw-bold text-dark">{vendor.user?.name}</td>
                      <td className="text-muted">{vendor.user?.email}</td>
                      <td>{vendor.user?.phoneNo}</td>
                      <td className="text-uppercase text-muted">
                        {vendor.gstNo}
                      </td>
                      <td>{formatDate(vendor.user?.createdOn)}</td>
                      <td>{getStatusBadge(vendor.user?.isActive)}</td>
                      <td>
                        {/* Action Buttons */}
                        <div className="d-flex justify-content-between gap-1">
                          {!vendor.user?.isActive ? (
                            <button
                              className="btn btn-sm btn-outline-success"
                              style={{ width: "80px" }}
                            >
                              Verify
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm btn-outline-warning"
                              style={{ width: "80px" }}
                            >
                              Suspend
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
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No vendors found matching "{searchTerm}"
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

export default Vendors;
