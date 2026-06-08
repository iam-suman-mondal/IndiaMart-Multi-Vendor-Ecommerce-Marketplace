import React from 'react'
import { useNavigate } from 'react-router';


// Mock Data representing the vendor's catalog inventory
const productsInventory = [
  { id: 'PROD-101', name: 'Wireless Bluetooth Earbuds', price: '₹3,999', stock: 2, category: 'Electronics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-102', name: 'Ergonomic Office Chair', price: '₹14,500', stock: 15, category: 'Furniture', image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-103', name: 'Stainless Steel Water Bottle', price: '₹1,250', stock: 3, category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-104', name: 'Mechanical Gaming Keyboard', price: '₹6,499', stock: 22, category: 'Electronics', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-105', name: 'Leather Passport Wallet', price: '₹2,100', stock: 18, category: 'Accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-106', name: '4K UltraHD Action Camera', price: '₹24,999', stock: 1, category: 'Electronics', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80' },     
  { id: 'PROD-107', name: 'Smart Fitness Watch v2', price: '₹9,999', stock: 4, category: 'Electronics', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80' },     
  { id: 'PROD-108', name: 'RGB Wireless Gaming Mouse', price: '₹3,450', stock: 45, category: 'Electronics', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-109', name: 'Premium Arabica Coffee Beans', price: '₹950', stock: 60, category: 'Grocery', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-110', name: 'Portable Fast Charger Bank', price: '₹2,800', stock: 3, category: 'Electronics', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80' }
];
const Product = () => {
// Array Filter: Creates a separate list containing only products with low stock numbers
  const lowStockProducts = productsInventory.filter(item => item.stock < 5);
  const navigate=useNavigate();

  // Triggered when clicking a card container, receiving the exact unique ID string
  const handleProductClick = (productId) => {
   navigate(`/vendor/products/${productId}`);;
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
          <span className="badge bg-danger rounded-pill px-2 py-1 small">{lowStockProducts.length} Items</span>
        </div>
        
        <div className="row g-3">
          {lowStockProducts.map((product) => (
            // Using unique product.id as the React map key parameter string
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <div 
                className="card h-100 border-0 bg-white shadow-sm overflow-hidden rounded-3"
                style={{ cursor: 'pointer' }}
                onClick={() => handleProductClick(product.id)}
              >
                {/* Product Thumbnail Frame */}
                <div style={{ width: '100%', height: '140px', backgroundColor: '#f8f9fa' }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Card Inner Context Text Data Box */}
                <div className="card-body p-3 d-flex flex-column">
                  <h6 className="card-title fw-bold text-dark mb-2 text-truncate" title={product.name}>
                    {product.name}
                  </h6>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="fw-bold text-danger small">{product.price}</span>
                    <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1 rounded small fw-semibold" style={{ fontSize: '0.75rem' }}>
                      Only {product.stock} left!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: ALL PRODUCTS CATALOG */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="fw-bold text-dark mb-0">All Products Catalog</h6>
            <p className="text-muted small mb-0">Overview of active running store listings</p>
          </div>
          <button type="button" className="btn btn-sm btn-primary px-3 py-1.5 rounded fw-bold shadow-sm" onClick={() => navigate('/vendor/products/add')}>+ Add Product</button>
        </div>

        <div className="row g-3">
          {productsInventory.map((product) => (
            // Using unique product.id as the React map key parameter string here too
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <div 
                className="card h-100 border-0 bg-white shadow-sm overflow-hidden rounded-3"
                style={{ cursor: 'pointer' }}
                onClick={() => handleProductClick(product.id)}
              >
                {/* Product Thumbnail Frame */}
                <div style={{ width: '100%', height: '140px', backgroundColor: '#f8f9fa' }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Card Inner Context Text Data Box */}
                <div className="card-body p-3 d-flex flex-column">
                  <h6 className="card-title fw-bold text-dark mb-2 text-truncate" title={product.name}>
                    {product.name}
                  </h6>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="fw-bold text-dark small">{product.price}</span>
                    
                    {product.stock < 5 ? (
                      <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1 rounded small fw-semibold" style={{ fontSize: '0.75rem' }}>
                        {product.stock} left
                      </span>
                    ) : (
                      <span className="badge bg-light text-secondary border px-2 py-1 rounded small fw-semibold" style={{ fontSize: '0.75rem' }}>
                        {product.stock} items
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Product