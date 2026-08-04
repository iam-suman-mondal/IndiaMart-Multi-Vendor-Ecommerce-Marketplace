import api from "../config/interceptors";

// ======================= Product =======================

// Add Product
// Payload:
// {
//   "name": "Samsung Galaxy S25",
//   "description": "Samsung Galaxy S25 with 256GB storage, 12GB RAM, and 50MP triple camera.",
//   "price": 74999.00,
//   "image": "https://your-s3-bucket.s3.ap-south-1.amazonaws.com/products/samsung-s25.jpg",
//   "brand": "Samsung",
//   "availableQuantity": 25,
//   "category": "ELECTRONICS"
// }
export const addProduct = async (payload) => {
  const response = await api.post("/api/products", payload);
  return response.data;
};

// Get Product By Id
export const getProductById = async (productId) => {
  const response = await api.get(`/api/products/${productId}`);
  return response.data;
};

// Get Products By Category
export const getProductsByCategory = async (category) => {
  const response = await api.get(`/api/products?category=${category}`);
  console.log(response.data);
  
  return response.data;
};

// Get Logged-in Vendor Products
export const getMyProducts = async () => {
  const response = await api.get("/api/products/myproducts");
  return response.data;
};



// Update Product
//payload:{
//   "name": "iPhone 16 Pro",
//   "description": "Apple iPhone 16 Pro with 256GB storage, A18 Pro chip and advanced camera system.",
//   "price": 119999.00,
//   "image": "https://your-bucket.s3.amazonaws.com/products/iphone16pro.jpg",
//   "quantity": 50,
//   "isPublished": true,
//   "category": "ELECTRONICS"
//}
export const updateProduct = async (payload) => {
  const response = await api.put("/api/products/Edit", payload);
  return response.data;
};

// Delete Product
export const deleteProduct = async (productId) => {
  const response = await api.delete(`/api/products/${productId}`);
  return response.data;
};

// Publish / Unpublish Product
export const togglePublishStatus = async (productId) => {
  const response = await api.patch(
    `/api/products/${productId}/publish-unpublish`
  );
  return response.data;
};

// Get Vendor Product Count
export const getMyProductCount = async () => {
  const response = await api.get("/api/products/product-count");
  return response.data;
};

// Search Products
export const searchProducts = async (productName) => {
  const response = await api.get(
    `/api/products/search?productName=${encodeURIComponent(productName)}`
  );
  return response.data;
};

// ======================= Image Upload =======================

// Get Presigned URL
export const getPresignedUploadUrl = async (extension, contentType) => {
  const response = await api.get(
    `/api/products/presigned-url?extension=${extension}&contentType=${encodeURIComponent(
      contentType
    )}`
  );
  return response.data;
};

// ======================= Ratings =======================

// Payload:
// {
//   "rating": 5
// }
export const addOrUpdateRating = async (productId, payload) => {
  const response = await api.patch(
    `/api/products/${productId}/rating`,
    payload
  );
  return response.data;
};

// ======================= Sales =======================

// Best Selling Products
export const getBestSellingProducts = async () => {
  const response = await api.get("/api/products/best-selling");
  return response.data;}