import { useState } from "react";

const vendorData = [
  {
    id: "2001",
    name: "Ramesh Traders",
    email: "contact@rameshtraders.in",
    phone: "+91 9823456710",
    aadhaar: "543678978161",
    gst: "27AADCR1234E1Z5",
    joinedOn: "10 Jan, 2024",
    status: "Active",
  },
  {
    id: "2002",
    name: "TechNova Electronics",
    email: "sales@technova.in",
    phone: "+91 8765432190",
    gst: "29BBENM9876K2Z1",
    aadhaar: "343678978161",
    joinedOn: "18 Jan, 2024",
    status: "Inactive",
  },
  {
    id: "2003",
    name: "Greenfield Organics",
    email: "hello@greenfield.in",
    phone: "+91 7654321089",
    gst: "07CQZPA4567L1Z9",
    aadhaar: "843678978161",
    joinedOn: "05 Feb, 2024",
    status: "Active",
  },
  {
    id: "2004",
    name: "Apex Apparels",
    email: "info@apexapparels.in",
    phone: "+91 9988776644",
    gst: "33DFGHJ8901M1Z2",
    aadhaar: "755428978161",
    joinedOn: "14 Feb, 2024",
    status: "Active",
  },
  {
    id: "2005",
    name: "Royal Furniture Works",
    email: "support@royalfurniture.in",
    phone: "+91 8877665533",
    gst: "24PLMNO3456P1Z8",
    aadhaar: "743678978121",
    joinedOn: "01 Mar, 2024",
    status: "Inactive",
  },
  {
    id: "2006",
    name: "Sunrise Distributors",
    email: "admin@sunrisedist.in",
    phone: "+91 9123456799",
    gst: "10XYZAB1234Q1Z7",
    aadhaar: "643678978161",
    joinedOn: "12 Mar, 2024",
    status: "Active",
  },
];

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter vendors based on search input (Parameters: ID, name, email, gst)
  const filteredVendors = vendorData.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.gst.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Helper function to render status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="badge bg-success bg-opacity-25 text-success px-2 py-1 rounded-pill">
            Active
          </span>
        );
      case "Inactive":
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
                  <th scope="col" className="fw-semibold">ID</th>
                  <th scope="col" className="fw-semibold">Full Name</th>
                  <th scope="col" className="fw-semibold">Email</th>
                  <th scope="col" className="fw-semibold">Phone No</th>
                  <th scope="col" className="fw-semibold">GST Number</th>
                  <th scope="col" className="fw-semibold">Aadhaar</th>
                  <th scope="col" className="fw-semibold">Joined On</th>
                  <th scope="col" className="fw-semibold">Status</th>
                  <th scope="col" className="fw-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.length > 0 ? (
                  filteredVendors.map((vendor, index) => (
                    <tr key={index}>
                      <td className="fw-medium">{vendor.id}</td>
                      <td className="fw-bold text-dark">{vendor.name}</td>
                      <td className="text-muted">{vendor.email}</td>
                      <td>{vendor.phone}</td>
                      <td className="text-uppercase text-muted">{vendor.gst}</td>
                      <td className="text-uppercase text-muted">{vendor.aadhaar}</td>
                      <td>{vendor.joinedOn}</td>
                      <td>{getStatusBadge(vendor.status)}</td>
                      <td>
                        {/* Action Buttons */}
                        <div className="d-flex justify-content-between gap-1">
                          {vendor.status === "Inactive" ? (
                            <button className="btn btn-sm btn-outline-success" style={{width: '80px'}}>
                              Verify
                            </button>
                          ) : (
                            <button className="btn btn-sm btn-outline-warning" style={{width: '80px'}}>
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