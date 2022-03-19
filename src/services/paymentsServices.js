import http from "./";

export const getPaymentsApi = () => {
  return http.get("payments");
};

export const checkPaymentApi = (orderId) => {
  return http.get(`payments/checkPayment?orderId=${orderId}`);
};
