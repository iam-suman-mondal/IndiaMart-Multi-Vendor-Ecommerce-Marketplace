import { useState } from "react";

// Added 'image' property to the dummy data
const dummyProducts = [
  {
    id: "9001",
    name: "Apple Iphone 15 Pro",
    brand: "Apple Inc.",
    category: "Electronics",
    price: "₹ 112,999",
    stock: 45,
    status: "Active",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9002",
    name: "Ergonomic Office Chair",
    brand: "ComfortPlus",
    category: "Furniture",
    price: "₹ 8,499",
    stock: 12,
    status: "Active",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9003",
    name: "Smart Fitness Watch",
    brand: "FitPro",
    category: "Wearables",
    price: "₹ 4,999",
    stock: 0,
    status: "Out of Stock",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9004",
    name: "Mechanical Gaming Keyboard",
    brand: "Keychron",
    category: "Accessories",
    price: "₹ 7,500",
    stock: 23,
    status: "Active",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9005",
    name: "Organic Arabica Coffee Beans",
    brand: "RoastCo",
    category: "Groceries",
    price: "₹ 850",
    stock: 150,
    status: "Active",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9006",
    name: "4K Action Camera",
    brand: "GoSnap",
    category: "Electronics",
    price: "₹ 18,000",
    stock: 5,
    status: "Low Stock",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9007",
    name: "Yoga Mat with Alignment Lines",
    brand: "ZenLife",
    category: "Fitness",
    price: "₹ 1,200",
    stock: 60,
    status: "Active",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9008",
    name: "Stainless Steel Water Bottle",
    brand: "AquaSafe",
    category: "Home",
    price: "₹ 999",
    stock: 200,
    status: "Active",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9009",
    name: "Bluetooth Bookshelf Speakers",
    brand: "Acoustica",
    category: "Electronics",
    price: "₹ 15,499",
    stock: 8,
    status: "Active",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9010",
    name: "Men's Running Shoes",
    brand: "AeroStep",
    category: "Footwear",
    price: "₹ 3,500",
    stock: 0,
    status: "Out of Stock",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9011",
    name: "LED Desk Lamp with USB",
    brand: "LumiDesk",
    category: "Home",
    price: "₹ 1,800",
    stock: 35,
    status: "Active",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9012",
    name: "Travel Backpack 40L",
    brand: "Wanderlust",
    category: "Luggage",
    price: "₹ 4,200",
    stock: 18,
    status: "Active",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9013",
    name: "Ceramic Coffee Mug Set",
    brand: "ClayArt",
    category: "Home",
    price: "₹ 650",
    stock: 40,
    status: "Pending",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9014",
    name: "Smartphone Gimbal Stabilizer",
    brand: "SmoothVideo",
    category: "Accessories",
    price: "₹ 8,999",
    stock: 12,
    status: "Active",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
  {
    id: "9015",
    name: "Protein Powder Isolate",
    brand: "MuscleBuild",
    category: "Health",
    price: "₹ 2,999",
    stock: 55,
    status: "Active",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70",
  },
];

const Products = () => {
  // 1. Separate state for the input field vs the actually applied search
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // 2. Filter based on the APPLIED search, not the live typing input
  const displayedData = appliedSearch.trim()
    ? dummyProducts.filter(
        (p) => p.id.toLowerCase() === appliedSearch.toLowerCase().trim(),
      )
    : dummyProducts;

  // Pagination Logic
  const totalPages = Math.ceil(displayedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = displayedData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Helper for Status Badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="badge bg-success bg-opacity-25 text-success rounded-pill px-2">
            Active
          </span>
        );
      case "Out of Stock":
        return (
          <span className="badge bg-danger bg-opacity-25 text-danger rounded-pill px-2">
            Out of Stock
          </span>
        );
      case "Low Stock":
        return (
          <span className="badge bg-warning bg-opacity-25 text-warning rounded-pill px-2">
            Low Stock
          </span>
        );
      case "Pending":
        return (
          <span className="badge bg-secondary bg-opacity-25 text-secondary rounded-pill px-2">
            Pending Review
          </span>
        );
      default:
        return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  // 3. Handle the actual search button click
  const handleSearchClick = () => {
    setAppliedSearch(searchInput); // Lock in the search term
    setCurrentPage(1); // Reset to page 1
  };

  // Allow pressing "Enter" inside the input field to trigger the search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      <h3 className="lh-1 fw-bold">Product Management</h3>
      <p className="text-muted mb-4">
        Review, approve, and manage the marketplace catalog.
      </p>

      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">
          {/* Header & Search Bar */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h5 className="mb-0 fw-semibold">Product Catalog</h5>
            <div className="input-group" style={{ maxWidth: "350px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search Product ID..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} // Only updates input state
                onKeyDown={handleKeyDown}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearchClick} // Triggers the actual filter
              >
                Search
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive mb-3">
            <table className="table table-striped table-hover align-middle text-nowrap mb-0">
              <thead className="table-secondary text-muted">
                <tr>
                  <th scope="col" className="fw-semibold">
                    ID
                  </th>
                  <th scope="col" className="fw-semibold">
                    Product
                  </th>
                  <th scope="col" className="fw-semibold">
                    Category
                  </th>
                  <th scope="col" className="fw-semibold">
                    Price
                  </th>
                  <th scope="col" className="fw-semibold">
                    Stock
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
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="fw-medium text-primary">{product.id}</td>
                      <td>
                        {/* 4. Added Image and Flexbox for alignment */}
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="rounded shadow-sm"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "scale-down",
                            }}
                          />
                          <div>
                            <div className="fw-bold text-dark">
                              {product.name}
                            </div>
                            <div className="text-muted small">
                              Brand: {product.brand}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td className="fw-semibold">{product.price}</td>
                      <td>{product.stock}</td>
                      <td>{getStatusBadge(product.status)}</td>
                      <td className="text-end">
                        {/* 5. Removed Edit button, kept only Delete */}
                        <button
                          className="btn btn-sm btn-outline-danger"
                          style={{ width: "70px" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      No products found matching "{appliedSearch}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <span className="text-muted small">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + ITEMS_PER_PAGE, displayedData.length)} of{" "}
                {displayedData.length} entries
              </span>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      Previous
                    </button>
                  </li>

                  {/* Generate Page Numbers */}
                  {[...Array(totalPages)].map((_, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
