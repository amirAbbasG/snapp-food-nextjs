import http from "./";


export const getShopTypesApi = () => {
  return http.get("shopTypes");
};

export const getShopTypeByNameApi = (name) => {
  return http.get(encodeURI(`shopTypes/${name}`));
};

export const getShopDetailsApi = (shopId) => {
  return http.get(`shops/${shopId}`);
};

export const addOrRemoveFavoriteShopApi = (shopId) => {
  return http.post(`user/favouriteShop?shopId=${shopId}`);
};

export const getShopByCategoryApi = (category, limit) => {

  return http.get(encodeURI(`filterShops/${category}?limit=${limit}`));
};

export const getDiscountedShopsApi = (limit) => {
  return http.get(`filterShops/discountedShops?limit=${limit}`);
};

export const getShopsWithCouponApi = (limit) => {
  return http.get(`filterShops/shopsWithCoupon?limit=${limit}`);
};

export const getTopRatedShopsApi = (limit) => {
  return http.get(`filterShops/topRatedShops?limit=${limit}`);
};
