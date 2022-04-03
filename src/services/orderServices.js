import http from "./";

export const getOrdersApi = () => {
  return http.get("order");
};

export const addToCartApi = (foodId) => {
  return http.post(`orders/addToCart?foodId=${foodId}`);
};

export const reOrderApi = (orderId) => {
  return http.post(`orders/reorder?orderId=${orderId}`);
};

export const removeCartFoodApi = (foodId) => {
  return http.delete(`orders/removeCartFood?foodId=${foodId}`);
};

export const removeCartApi = (orderId) => {
  return http.delete(`orders/removeCart?orderId=${orderId}`);
};

export const setDiscountApi = (orderId, discountCode) => {
  return http.post(`orders/useDiscount`, { discountCode, orderId });
};

export const setCouponApi = (shopId, couponId) => {
  return http.post(`orders/useCoupon`, { couponId, shopId });
};
