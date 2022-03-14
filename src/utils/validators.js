import * as Yup from "yup";

//#region authenticated user
export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("کلمه عبور فعلی الزامی میباشد")
    .min(4, "کلمه عبور نباید کمتر از 4 رقم باشد"),
  newPassword: Yup.string()
    .required("کلمه عبور جدید الزامی میباشد")
    .min(4, "کلمه عبور نباید کمتر از 4 رقم باشد"),
  confirmPassword: Yup.string()
    .required("تکرار کلمه عبور جدید الزامی میباشد")
    .min(4, "کلمه عبور نباید کمتر از 4 رقم باشد")
    .oneOf([Yup.ref("newPassword"), null], "تایید پسورد با پسورد تطابق ندارد"),
});
//#endregion

//#region user Auth
const loginValidationSchema = Yup.object().shape({
  number: Yup.string()
    .required("شماره الزامی میباشد")
    .min(11, "شماره باید 11 رقم باشد")
    .max(11, "شماره باید 11 رقم باشد"),
  password: Yup.string()
    .required("کلمه عبور الزامی میباشد")
    .min(4, "کلمه عبور نباید کمتر از 4 رقم باشد"),
});
const numberValidatorSchema = Yup.object().shape({
  number: Yup.string()
    .required("شماره الزامی میباشد")
    .min(11, "شماره باید 11 رقم باشد")
    .max(11, "شماره باید 11 رقم باشد"),
});
const VerifynumberValidatorSchema = Yup.object().shape({
  number: Yup.string()
    .required("شماره الزامی میباشد")
    .min(11, "شماره باید 11 رقم باشد")
    .max(11, "شماره باید 11 رقم باشد"),
  code: Yup.string()
    .required("کد الزامی میباشد")
    .min(5, "شماره باید پنج رقم باشد"),
});
const registerValidationSchema = Yup.object().shape({
  number: Yup.string()
    .required("شماره الزامی میباشد")
    .min(11, "شماره باید 11 رقم باشد")
    .max(11, "شماره باید 11 رقم باشذ"),
  password: Yup.string()
    .required("کلمه عبور الزامی میباشد")
    .min(4, "کلمه عبور نباید کمتر از 4 رقم باشد"),
  fullName: Yup.string()
    .required("نام نام خانوادگی الزامی میباشد")
    .min(3, "نام نام خانوادگی نباید کمتر از 3 رقم باشد"),
});
const changePasswordValidationSchema = Yup.object().shape({
  number: Yup.string()
    .required("شماره الزامی میباشد")
    .min(11, "شماره باید 11 رقم باشد")
    .max(11, "شماره باید 11 رقم باشد"),
  password: Yup.string()
    .required("کلمه عبور الزامی میباشد")
    .min(4, "کلمه عبور نباید کمتر از 4 رقم باشد"),
  code: Yup.string()
    .required("کد الزامی میباشد")
    .min(5, "شماره باید پنج رقم باشد"),
});
export const validateAction = (action) => {
  switch (action) {
    case "login":
      return loginValidationSchema;
    case "register":
      return registerValidationSchema;
    case "":
      return numberValidatorSchema;
    case "sendCode":
      return VerifynumberValidatorSchema;
    case "changePassword":
      return changePasswordValidationSchema;
    default:
      break;
  }
};
//#endregion

//#region shop Auth
const shopRegisterValidationSchema = Yup.object().shape({
  userNumber: Yup.string().required(),
  ownerFullName: Yup.string().required(),
  userPassword: Yup.string().required(),
  code: Yup.string().required().required(),
  shopName: Yup.string().required(),
  city: Yup.string().required(),
  shopType: Yup.string().required(),
  category: Yup.string().required(),
});

const ShopnumberValidatorSchema = Yup.object().shape({
  userNumber: Yup.string().required().min(11).max(11),
});

export const validateShopAuth = (action) => {
  switch (action) {
    case "":
      return ShopnumberValidatorSchema;
    case "register":
      return shopRegisterValidationSchema;
    default:
      break;
  }
};
//#endregion
