import { useState, memo, useContext } from "react";
import { globalContext } from "../global/globalContext";
import { accountContext } from "../account/accountContext";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import {
  clearAccount,
  getAccountInformation,
} from "../../recux/actions/account";
import {
  checkNumberApi,
  verifyNumberApi,
  registerUserApi,
  loginUserApi,
  editProfileApi,
  forgotPasswordApi,
  changePasswordApi,
  changeAuthenticatedUserPasswordApi,
} from "../../services/userServices";
import http from "../../services";
import { successMessage, errorMessage } from "../../utils/toast";
import { getOrders } from "../../recux/actions/orders";

const AccountContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { setOpenAuth } = useContext(globalContext);

  const account = useSelector((state) => state.account);

  //#region change password
  const changePassword = async (user) => {
    try {
      setIsLoadingButton(true);
      const { status, data } = await changePasswordApi(user);
      if (status === 200) {
        setAction(data.action);
        setIsLoadingButton(false);
        successMessage("کلمه عبور با موفقیت تغییر یافت");
      }
    } catch (error) {
      errorMessage(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region send number to get code
  const checkNumber = async (number) => {
    try {
      setIsLoadingButton(true);
      const { status, data } = await checkNumberApi(number);
      if (status === 200) {
        setAction(data.action);
      } else {
        setIsLoadingButton(false);
        errorMessage("مشکلی پیش آمده");
      }
      setIsLoadingButton(false);
    } catch (error) {
      console.log(error.response.data.message)
      errorMessage(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region send code for verify number
  const verifyNumber = async (body) => {
    try {
      setIsLoadingButton(true);
      const { status, data } = await verifyNumberApi(body);
      if (status === 200) {
        setAction(data.action);
        setIsLoadingButton(false);
      } else {
        setIsLoadingButton(false);
        errorMessage("مشکلی پیش آمده");
      }
    } catch (error) {
      errorMessage(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region register after verify number
  const registerUser = async (user) => {
    try {
      setIsLoadingButton(true);
      const { data, status } = await registerUserApi(user);
      if (status === 201) {
        setToken(data);
        dispatch(getAccountInformation());
        setIsLoadingButton(false);
        successMessage("ثبت نام با موفقیت انجام شد");
        setOpenAuth(false);
      } else {
        setIsLoadingButton(false);
        errorMessage("مشکلی پیش آمده");
      }
    } catch (error) {
      errorMessage(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region login user after checked is registered
  const loginUser = async (user) => {
    try {
      setIsLoadingButton(true);
      const { status, data } = await loginUserApi(user);
      if (status === 200) {
        setToken(data);
        setIsLoadingButton(false);
        successMessage("خوش آمدید");
        dispatch(getAccountInformation());
        dispatch(getOrders());
        setOpenAuth(false);
      } else {
        setIsLoadingButton(false);
        errorMessage("مشکلی پیش آمده");
      }
    } catch (error) {
      errorMessage(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region forgot password
  const forgotPassword = async (number) => {
    try {
      const { status, data } = await forgotPasswordApi(number);
      if (status === 200) {
        setAction(data.action);
      }
    } catch (error) {
      errorMessage(error.response.data.message);
    }
  };
  //#endregion

  //#region submit in auth screen
  const handleUserAuthSubmit = (user) => {
    switch (action) {
      case "":
        checkNumber(user.number);
        break;
      case "sendCode":
        verifyNumber({
          number: user.number,
          code: user.code,
        });
        break;
      case "login":
        loginUser({
          number: user.number,
          password: user.password,
        });
        break;
      case "register":
        registerUser({
          number: user.number,
          fullName: user.fullName,
          password: user.password,
        });
        break;
      case "changePassword":
        changePassword({
          number: user.number,
          code: user.code,
          password: user.password,
        });
        break;

      default:
        break;
    }
  };
  //#endregion

  //#region exit account
  const exitAccount = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(clearAccount());
  };
  //#endregion

  //#region set token and header
  const setToken = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    dispatch(getAccountInformation());
    http.defaults.headers.common["Authorization"] = data.token;
  };
  //#endregion

  //#region check if token exist and isvalid
  const checkToken = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token != null && userId != null) {
      const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
      const nowDate = Date.now() / 1000;
      if (nowDate < decodedToken.exp) {
        if (decodedToken["_id"] === userId) {
          http.defaults.headers.common["Authorization"] = token;
          dispatch(getAccountInformation());
          dispatch(getOrders());
        } else {
          exitAccount();
        }
      } else {
        exitAccount();
      }
    }
  };
  //#endregion

  //#region edit profile
  const editProfile = async (userData) => {
    try {
      setIsLoadingButton(true);
      const editData = { fullName: account.fullName, ...userData };
      const { status, data } = await editProfileApi(editData);
      if (status === 200) {
        successMessage("اطلاعات کاربر با موفقیت ویرایش شد");
        setToken(data);
        dispatch(getAccountInformation());
        setIsLoadingButton(false);
      }
    } catch (error) {
      errorMessage(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region add address by user
  const addAddress = async (address) => {
    editProfile({ address });
    dispatch(getAccountInformation());
  };
  //#endregion

  //#region change authenticated user password
  const changeAuthenticatedUserPassword = async (passwordsData) => {
    try {
      setIsLoadingButton(true);
      const { status } = await changeAuthenticatedUserPasswordApi(
        passwordsData
      );
      if (status === 200) {
        setIsLoadingButton(false);
        successMessage("پسورد با موفقیت ادیت شد");
      }
    } catch (error) {
      errorMessage(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  return (
    <accountContext.Provider
      value={{
        handleUserAuthSubmit,
        action,
        isLoadingButton,
        setAction,
        setIsLoadingButton,
        checkToken,
        editProfile,
        addAddress,
        exitAccount,
        forgotPassword,
        changeAuthenticatedUserPassword,
      }}
    >
      {children}
    </accountContext.Provider>
  );
};

export default memo(AccountContextProvider);
