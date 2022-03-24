import http from "./";


export const getShopTypesApi = () => {
  return http.get("shopTypes");
};

export const getShopTypeByIdApi = (id) => {
  return http.get(`shopTypes/${id}`);
};

export const getShopDetailsApi = (shopId) => {
  return http.get(`shops/shopDetail/${shopId}`);
};

export const addOrRemoveFavoriteShopApi = (shopId) => {
  return http.post(`user/addShopToFavorites?shopId=${shopId}`);
};

export const getShopByCategory = (category, limit) => {

  return http.get(encodeURI(`filterShops/${category}?limit=${limit}`));
};

export const getDiscountedShops = (limit) => {
  return http.get(`filterShops/discountedShops?limit=${limit}`);
};

export const getShopsWithCoupon = (limit) => {
  return http.get(`filterShops/shopsWithCoupon?limit=${limit}`);
};

export const getTopRatedShops = (limit) => {
  return http.get(`filterShops/topRatedShops?limit=${limit}`);
};
