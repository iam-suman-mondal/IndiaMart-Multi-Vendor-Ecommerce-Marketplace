import React from 'react';
import { useParams } from 'react-router';
import AddProduct from './AddProduct'; // 1. Import your existing component

    import { toast } from 'react-toastify';
const ProductDetails = () => {
  const { id } = useParams();
const handleDelete = () => {
    toast.error("Product Deleteed Successfully")
  };
  return (
   <div>
      <div className="d-flex justify-content-between align-items-center mb-3 px-4 mx-auto" style={{ maxWidth: '800px' }}>
        <span className="text-muted small">ID Reference: <strong>{id}</strong></span>
        <button className="btn btn-danger btn-sm px-3 fw-bold shadow-sm" onClick={handleDelete}>
          Delete Product
        </button>
      </div>
      {/* 2. Simply render the component here */}
      <AddProduct  productId={id}/> 
      
    </div>
    
  );
};

export default ProductDetails;