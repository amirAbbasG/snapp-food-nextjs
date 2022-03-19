import http from "./";

export const getShopTypesApi = () => {
  return http.get("shop-types");
};

export const getShopTypeByNameApi = (name) => {
  return http.get(`shop-types/${name}`);
};

export const getShopDetailsApi = (shopId) => {
  return http.get(`shops/shopDetail/${shopId}`);
};

export const addOrRemoveFavoriteShopApi = (shopId) => {
  return http.put(`user/addShopToFavorites?shopId=${shopId}`);
};

export const getShopByCategory = (category, limit) => {
  return http.put(`filter-shops/${category}?limit=${limit}`);
};

export const getDiscountedShops = (limit) => {
  return http.put(`filter-shops/discountedShops?limit=${limit}`);
};

export const getShopsWithCoupon = (limit) => {
  return http.put(`filter-shops/shopsWithCoupon?limit=${limit}`);
};

export const getTopRatedShops = (limit) => {
  return http.put(`filter-shops/topRatedShops?limit=${limit}`);
};
