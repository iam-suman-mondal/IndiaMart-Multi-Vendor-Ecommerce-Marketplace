import { useState } from "react";
import { getProductById } from "../../../../apis/services/product-service";

const Products = () => {
  const [searchInput, setSearchInput] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchClick = async () => {
    if (!searchInput.trim()) {
      setProduct(null);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getProductById(searchInput);

      setProduct(response);
    } catch (err) {
      console.error(err);
      setProduct(null);
      setError("Product not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="container-fluid py-4">
      <h3 className="fw-bold">Product Management</h3>

      <p className="text-muted mb-4">Search products using the product ID.</p>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="input-group" style={{ maxWidth: "400px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product ID"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button className="btn btn-primary" onClick={handleSearchClick}>
              Search
            </button>
          </div>

          {loading && (
            <div className="mt-4">
              <p>Loading...</p>
            </div>
          )}

          {error && <div className="alert alert-danger mt-4">{error}</div>}

          {product && (
            <div className="card mt-4 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-md-4 text-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid rounded"
                      style={{
                        maxHeight: "250px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div className="col-md-8">
                    <h3 className="fw-bold">{product.name}</h3>

                    <p className="text-muted">{product.description}</p>

                    <hr />

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <strong>Product ID:</strong> {product.productId}
                      </div>

                      <div className="col-md-6 mb-3">
                        <strong>Brand:</strong> {product.brand}
                      </div>

                      <div className="col-md-6 mb-3">
                        <strong>Category:</strong> {product.category}
                      </div>

                      <div className="col-md-6 mb-3">
                        <strong>Price:</strong> ₹{product.price}
                      </div>

                      <div className="col-md-6 mb-3">
                        <strong>Available Quantity:</strong>{" "}
                        {product.availableQuantity}
                      </div>

                      <div className="col-md-6 mb-3">
                        <strong>Reserved Quantity:</strong>{" "}
                        {product.reservedQuantity}
                      </div>

                      <div className="col-md-6 mb-3">
                        <strong>Average Rating:</strong> {product.averageRating}{" "}
                        ⭐
                      </div>

                      <div className="col-md-6 mb-3">
                        <strong>Total Ratings:</strong> {product.totalRatings}
                      </div>

                      <div className="col-md-6 mb-3">
                        <strong>Status:</strong>{" "}
                        {product.isPublished ? "Published" : "Unpublished"}
                      </div>

                      <div className="col-md-6 mb-3">
                        <strong>Vendor ID:</strong> {product.vendorId}
                      </div>

                      <div className="col-md-6 mb-3">
                        <strong>Created On:</strong>{" "}
                        {new Date(product.createdOn).toLocaleString("en-IN")}
                      </div>

                      <div className="col-md-6 mb-3">
                        <strong>Updated On:</strong>{" "}
                        {new Date(product.updatedOn).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="mt-3">
                      <button className="btn btn-danger">Delete Product</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
