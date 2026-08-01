import api from "../config/interceptors";

export const getRecentPayments = async () => {
  const response = await api.get("/api/payments/recent");
  return response.data;
};

export const getPaymentDetails = async (cfPaymentId) => {
  const response = await api.get(`/api/payments/${cfPaymentId}`);
  return response.data;
};