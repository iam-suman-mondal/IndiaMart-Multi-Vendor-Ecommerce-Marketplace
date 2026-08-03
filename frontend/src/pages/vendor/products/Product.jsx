import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import api from '../../../apis/config/interceptors';

const Product = () => {
  const [productsInventory, setProductsInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendorProducts = async () => {
      try {
        const response = await api.get('/api/products/myproducts');
        console.log("Products API Response:", response.data); // Check your browser console to verify what comes back
        setProductsInventory(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to load vendor products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorProducts();
  }, []);

  // Filter products where availableQuantity is less than 5 for low stock alerts
  const lowStockProducts = productsInventory.filter(item => item.availableQuantity < 3);

  const handleProductClick = (productId) => {
    navigate(`/vendor/products/${productId}`);
  };

  // Helper to handle images that might just be filenames instead of full URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // If backend returns a relative name like 'samsung-phone.jpg', map it or use placeholder
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';
  };

  return (
    <div className="container-fluid pt-4 px-3 bg-light min-vh-100">
      
      {/* SECTION HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark">My Products</h2>
        <p className="text-muted small">Manage store listings and track active inventory levels</p>
      </div>

      {/* SECTION 1: LOW STOCK ALERTS SECTION */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-3">
          <h6 className="fw-bold text-danger mb-0 me-2">⚠️ Low Stock Alerts</h6>
          <span className="badge bg-danger rounded-pill px-2 py-1 small">
            {loading ? '...' : lowStockProducts.length} Items
          </span>
        </div>
        
        {loading ? (
          <p className="text-muted small">Loading alerts...</p>
        ) : lowStockProducts.length === 0 ? (
          <p className="text-muted small">No low stock items right now.</p>
        ) : (
          <div className="row g-3">
            {lowStockProducts.map((product) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.productId}>
                <div 
                  className="card h-100 border-0 bg-white shadow-sm overflow-hidden rounded-3"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleProductClick(product.productId)}
                >
                  <div style={{ width: '100%', height: '140px', backgroundColor: '#f8f9fa' }}>
                    <img 
                      src={getImageUrl(product.image)} 
                      alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'; }}
                    />
                  </div>

                  <div className="card-body p-3 d-flex flex-column">
                    <h6 className="card-title fw-bold text-dark mb-2 text-truncate" title={product.name}>
                      {product.name}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="fw-bold text-danger small">₹{Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1 rounded small fw-semibold" style={{ fontSize: '0.75rem' }}>
                        Only {product.availableQuantity} left!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: ALL PRODUCTS CATALOG */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="fw-bold text-dark mb-0">All Products Catalog</h6>
            <p className="text-muted small mb-0">Overview of active running store listings</p>
          </div>
          <button 
            type="button" 
            className="btn btn-sm btn-primary px-3 py-1.5 rounded fw-bold shadow-sm" 
            onClick={() => navigate('/vendor/products/add')}
          >
            + Add Product
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <p className="text-muted">Loading product catalog...</p>
          </div>
        ) : productsInventory.length === 0 ? (
          <div className="text-center py-5 bg-white rounded shadow-sm">
            <p className="text-muted mb-2">No products found in your catalog.</p>
            <p className="text-muted small mb-3">Make sure your logged-in vendor token matches the vendor ID owning these products in the database.</p>
            <button 
              type="button" 
              className="btn btn-sm btn-outline-primary" 
              onClick={() => navigate('/vendor/products/add')}
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="row g-3">
            {productsInventory.map((product) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.productId}>
                <div 
                  className="card h-100 border-0 bg-white shadow-sm overflow-hidden rounded-3"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleProductClick(product.productId)}
                >
                  <div style={{ width: '100%', height: '140px', backgroundColor: '#f8f9fa' }}>
                    <img 
                      src={getImageUrl(product.image)} 
                      alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'; }}
                    />
                  </div>

                  <div className="card-body p-3 d-flex flex-column">
                    <h6 className="card-title fw-bold text-dark mb-2 text-truncate" title={product.name}>
                      {product.name}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="fw-bold text-dark small">₹{Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      
                      {product.availableQuantity < 5 ? (
                        <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1 rounded small fw-semibold" style={{ fontSize: '0.75rem' }}>
                          {product.availableQuantity} left
                        </span>
                      ) : (
                        <span className="badge bg-light text-secondary border px-2 py-1 rounded small fw-semibold" style={{ fontSize: '0.75rem' }}>
                          {product.availableQuantity} items
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Product;