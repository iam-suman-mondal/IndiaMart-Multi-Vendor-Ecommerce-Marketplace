import api from "../config/interceptors";

// Request Payload: 
// {
//   "items": [
//     {
//       "productId": 1,
//       "quantity": 1
//     }
//   ]
// }
//
export const createOrder = async (payload) => {
  const response = await api.post(`/api/orders`, payload);
  return response.data;
};

export const getAllOrdersForCustomer = async () => {
  const response = await api.get(`/api/orders/customer`);
  return response.data;
};

export const getCustomerOrderDetails = async (orderId) => {
  const response = await api.get(`/api/orders/${orderId}`);
  return response.data;
};

export const getAllOrderForVendor = async () => {
  const response = await api.get(`/api/orders/vendor`);
  return response.data;
};

export const getVendorOrderDetails = async (vendorOrderId) => {
  const response = await api.get(`/api/orders/vendor/${vendorOrderId}`);
  return response.data;
};

// Valid Status: PENDING, CONFIRMED, SHIPPED, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
export const updateVendorOrderStatus = async (vendorOrderId, status) => {
  const response = await api.patch(`/api/orders/vendor/update-status/${vendorOrderId}?status=${status}`);
  return response.data;
};

export const fetchVendorRevenueAndOrderAndGraphData = async () => {
  const response = await api.get("/api/orders/vendor/analytics");
  return response.data;
};

export const fetchRevenueAndOrderAndGraphData = async () => {
  const response = await api.get("/api/orders/admin/analytics");
  return response.data;
};
