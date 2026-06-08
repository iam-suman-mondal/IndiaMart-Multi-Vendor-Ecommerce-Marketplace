import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

// Mock inventory data so the file can search and find existing entries
const productsInventory = [
  { id: 'PROD-101', name: 'Wireless Bluetooth Earbuds', price: '₹3,999', stock: 2, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-102', name: 'Ergonomic Office Chair', price: '₹14,500', stock: 15, image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-103', name: 'Stainless Steel Water Bottle', price: '₹1,250', stock: 3, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-104', name: 'Mechanical Gaming Keyboard', price: '₹6,499', stock: 22, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-105', name: 'Leather Passport Wallet', price: '₹2,100', stock: 18, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-106', name: '4K UltraHD Action Camera', price: '₹24,999', stock: 1, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80' },     
  { id: 'PROD-107', name: 'Smart Fitness Watch v2', price: '₹9,999', stock: 4, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80' },     
  { id: 'PROD-108', name: 'RGB Wireless Gaming Mouse', price: '₹3,450', stock: 45, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-109', name: 'Premium Arabica Coffee Beans', price: '₹950', stock: 60, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80' },
  { id: 'PROD-110', name: 'Portable Fast Charger Bank', price: '₹2,800', stock: 3, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80' }
];

const AddProduct = ({ productId }) => {
  const navigate = useNavigate();

  // Controlled component input state fields
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productImage, setProductImage] = useState('');

  // Look up the matching data item out of your products inventory array on load
  useEffect(() => {
    if (productId) {
      const match = productsInventory.find((item) => item.id === productId);
      if (match) {
        setProductName(match.name);
        setProductPrice(match.price.replace('₹', '')); // Removes symbol for editing simplicity
        setProductStock(match.stock);
        setProductImage(match.image);
      }
    }
  }, [productId]);
   
  const handleAdd = () => {
    if (!productName || !productPrice || !productStock || !productImage) {
      toast.error("Please fill the all fields ");
      return;
    }

    if (productId) {
      toast.success("Product Updated Successfully");
    } else {
      toast.success("Product Added Successfully");
    }

    // Crucial: Gives the toast banner 1.5 seconds to show before page unmounts
    setTimeout(() => {
      navigate('/vendor/products');
    }, 1500);
  };

  return (
    <div className="container-fluid pt-5 px-2 px-md-4 bg-light min-vh-100 d-flex flex-column align-items-center">
      <ToastContainer />
      
      {/* Centering Wrapper for the Header Banner */}
      <div className="w-100" style={{ maxWidth: '750px' }}>
        {/* HEADER BANNER */}
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-4 gap-2">
          {/* <button 
            className="btn btn-sm btn-outline-secondary px-3 fw-bold rounded-2 shadow-sm" 
            onClick={() => navigate('/vendor/products')}
          >
            ← Back
          </button> */}
          <div>
            <h2 className="fw-bold text-dark mb-0 fs-2">
              {productId ? "Modify Product Details" : "Add New Product"}
            </h2>
            <p className="text-muted small mb-0">
              {productId ? `Editing Entry Code Reference: ${productId}` : "Launch a brand new storefront item listing"}
            </p>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-3 p-4 p-md-5 bg-white w-100" style={{ maxWidth: '750px' }}>
        
        {/* INPUT 1: Product Title */}
        <div className="mb-4">
          <label className="form-label fw-bold text-secondary small">Product Name</label>
          <input 
            type="text" 
            className="form-control form-control-sm rounded-2 py-2.5" 
            placeholder="e.g., Wireless Bluetooth Earbuds"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        {/* RESPONSIVE ROW for Price and Stock */}
        <div className="row g-4 mb-4">
          
          {/* INPUT 2: Cost Value */}
          <div className="col-12 col-sm-6">
            <label className="form-label fw-bold text-secondary small">Price (₹)</label>
            <input 
              type="text" 
              className="form-control form-control-sm rounded-2 py-2.5" 
              placeholder="e.g., 3,999"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>

          {/* INPUT 3: Warehouse Quantity */}
          <div className="col-12 col-sm-6">
            <label className="form-label fw-bold text-secondary small">Stock Units</label>
            <input 
              type="number" 
              className="form-control form-control-sm rounded-2 py-2.5" 
              placeholder="e.g., 15"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
            />
          </div>
        </div>

        {/* INPUT 4: Internet Web Link */}
        <div className="mb-5">
          <label className="form-label fw-bold text-secondary small">Product Image URL Link</label>
          <input 
            type="url" 
            className="form-control form-control-sm rounded-2 py-2.5" 
            placeholder="https://images.unsplash.com/photo-..."
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />
          <div className="form-text text-muted" style={{ fontSize: '0.75rem' }}>
            Paste a public image web url string to generate the card thumbnail preview.
          </div>
        </div>

        {/* Stacked Action Buttons */}
        <div className="d-flex flex-column gap-2 mt-4">
          <button 
            type="button" 
            className={`btn w-100 py-2.5 fw-bold rounded-2 shadow-sm ${productId ? 'btn-success' : 'btn-primary'}`}
            onClick={handleAdd}
          >
            {productId ? 'Update Product' : 'Add Product'}
          </button>
          <button 
            type="button" 
            className="btn btn-outline-secondary w-100 py-2.5 rounded-2 fw-semibold"
            onClick={() => navigate('/vendor/products')}
          >
             Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;