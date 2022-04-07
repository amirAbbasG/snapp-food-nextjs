import http from "./";

export const getAccountInformationApi = async () => {
  return await http.get("user");
};

export const checkNumberApi = (number) => {
  return http.post("checkNumber", { number });
};

export const verifyNumberApi = (data) => {
  return http.post("verifyNumber", data);
};

export const registerUserApi = (user) => {
  return http.post("register", user);
};

export const loginUserApi = (user) => {
  return http.post("login", user);
};

export const editProfileApi = (editData) => {
  return http.put("user/editProfile", editData);
};

export const forgotPasswordApi = (number) => {
  return http.post("forgetPassword", { number });
};

export const changePasswordApi = (data) => {
  return http.post("changePassword", data);
};

export const changeAuthenticatedUserPasswordApi = (data) => {
  return http.put("user/changeAuthenticatedUserPassword", data);
};

export const userInformationApi = () => {
  return http.get("user");
};
