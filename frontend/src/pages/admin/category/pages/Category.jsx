import React, { useState } from "react";

// Mock Data for Categories
const initialCategories = [
  {
    id: "7001",
    name: "Electronics",
    description: "Mobile phones, laptops, and accessories",
    products: 124,
    status: "Active",
    image: "https://placehold.co/40x40/png",
  },
  {
    id: "7002",
    name: "Fashion",
    description: "Men and women clothing, shoes, and apparel",
    products: 389,
    status: "Active",
    image: "https://placehold.co/40x40/png",
  },
  {
    id: "7003",
    name: "Home & Furniture",
    description: "Decor, furniture, and kitchenware",
    products: 56,
    status: "Active",
    image: "https://placehold.co/40x40/png",
  },
  {
    id: "7004",
    name: "Beauty & Health",
    description: "Skincare, makeup, and wellness products",
    products: 42,
    status: "Inactive",
    image: "https://placehold.co/40x40/png",
  },
  {
    id: "7005",
    name: "Sports & Outdoors",
    description: "Fitness equipment, outdoor gear",
    products: 18,
    status: "Active",
    image: "https://placehold.co/40x40/png",
  },
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter logic
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Helper for Status Badges
  const getStatusBadge = (status) => {
    if (status === "Active") {
      return (
        <span className="badge bg-success bg-opacity-25 text-success rounded-pill px-2">
          Active
        </span>
      );
    }
    return (
      <span className="badge bg-secondary bg-opacity-25 text-secondary rounded-pill px-2">
        Inactive
      </span>
    );
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h3 className="lh-1 fw-bold mb-2">Category Management</h3>
          <p className="text-muted mb-0">
            Organize your store structure and product groupings.
          </p>
        </div>
        <button
          className={`btn ${showAddForm ? "btn-outline-secondary" : "btn-primary"} px-4`}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "+ Add New Category"}
        </button>
      </div>

      {/* Expandable Add Category Form */}
      {showAddForm && (
        <div className="card shadow-sm border-0 rounded-4 mb-4 bg-light">
          <div className="card-body p-4">
            <h5 className="fw-semibold mb-4">Create New Category</h5>
            <form>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <label className="form-label text-muted small fw-medium">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Groceries"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label text-muted small fw-medium">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://..."
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label text-muted small fw-medium">
                    Status
                  </label>
                  <select className="form-select">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label text-muted small fw-medium">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Brief description of this category..."
                  ></textarea>
                </div>
                <div className="col-12 text-end mt-3">
                  <button type="button" className="btn btn-primary px-4">
                    Save Category
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Table Card */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">
          {/* Table Header & Search */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h5 className="mb-0 fw-semibold">All Categories</h5>
            <div className="input-group" style={{ maxWidth: "300px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table (text-nowrap applied based on your preference) */}
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle text-nowrap mb-0">
              <thead className="table-secondary text-muted">
                <tr>
                  <th scope="col" className="fw-semibold">
                    ID
                  </th>
                  <th scope="col" className="fw-semibold">
                    Category Info
                  </th>
                  <th scope="col" className="fw-semibold">
                    Description
                  </th>
                  <th scope="col" className="fw-semibold">
                    Total Products
                  </th>
                  <th scope="col" className="fw-semibold">
                    Status
                  </th>
                  <th scope="col" className="fw-semibold text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr key={category.id}>
                      <td className="fw-medium text-muted">{category.id}</td>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="rounded shadow-sm"
                            style={{
                              width: "45px",
                              height: "45px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="fw-bold text-dark">
                            {category.name}
                          </div>
                        </div>
                      </td>
                      <td
                        className="text-muted"
                        style={{
                          maxWidth: "250px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {category.description}
                      </td>
                      <td>
                        <span className="fw-semibold">{category.products}</span>{" "}
                        items
                      </td>
                      <td>{getStatusBadge(category.status)}</td>
                      <td className="text-end">
                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            style={{ width: "70px" }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            style={{ width: "70px" }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No categories found matching "{searchTerm}"
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

export default Categories;
