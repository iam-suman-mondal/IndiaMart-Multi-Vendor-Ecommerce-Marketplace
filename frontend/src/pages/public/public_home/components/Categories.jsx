import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import ProductCard from "../../shared/components/ProductCard";
import { getProductsByCategory } from "../../../../apis/services/product-service"; // Adjust the path

export default function CategoryComponent() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
  try {
    setLoading(true);

    console.log("Category from URL:", category);

    const data = await getProductsByCategory(category);

    console.log("Products from backend:", data);

    setProducts(data);

  } catch (error) {
    console.error("Failed to load products:", error);
    setProducts([]);
  } finally {
    setLoading(false);
  }
};
  const formattedCategoryTitle = category
    ? category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Category";

  return (
    <div className="container py-4 py-md-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-muted">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item text-muted">Categories</li>
          <li
            className="breadcrumb-item active text-dark fw-semibold"
            aria-current="page"
          >
            {formattedCategoryTitle}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-4 pb-2 border-bottom border-light">
        <h2 className="fw-bold text-dark mb-1">
          {formattedCategoryTitle}
        </h2>

        <p className="text-muted small mb-0">
          Explore top rated products in {formattedCategoryTitle}
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="row g-3 g-md-4 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          {products.map((product) => (
            <div
              className="col d-flex align-items-stretch"
              key={product.productId}
            >
              <div className="w-100">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="card text-center p-5 border-0 shadow-sm rounded-4 my-4 mx-auto"
          style={{ maxWidth: "520px" }}
        >
          <div className="fs-1 text-muted mb-3">📦</div>

          <h4 className="fw-bold text-dark mb-2">
            No Products Found
          </h4>

          <p className="text-muted mb-0">
            We couldn't find any products in the{" "}
            <strong>{formattedCategoryTitle}</strong> category.
          </p>
        </div>
      )}
    </div>
  );
}