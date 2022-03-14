import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { accountContext } from "../../Contexts";
import { validateAction } from "../../utils/validators";
import { AuthTextField, VerificationCodeInput, MyForm } from "../";

const AuthDialog = ({ open, handleClose }) => {
  const { dialog, logo, titleBox } = useStyles();
  const [number, setNumber] = useState("");
  const {
    action,
    handleUserAuthSubmit,
    setAction,
    setIsLoadingButton,
    forgotPassword,
  } = useContext(accountContext);

  const onClose = () => {
    setAction("");
    setIsLoadingButton(false);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: dialog,
      }}
    >
      <DialogTitle>
        <Stack className={titleBox}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
          <img src="/images/logo-name.png" alt="food logo" className={logo} />
        </Stack>
      </DialogTitle>
      <Typography mr={3} variant="h6">
        {
          {
            "": "ورود یا عضویت",
            register: "تبت نام کنید",
            login: "ورارد شوید",
            changePassword: "تغییر کلمه عبور",
            sendCode: "ارسال کد تایید",
          }[action]
        }
      </Typography>

      <DialogContent>
        <MyForm
          onSubmit={(user) => handleUserAuthSubmit(user)}
          validationSchema={validateAction(action)}
          initialValues={{
            number: number,
            fullName: "",
            password: "",
            code: "",
          }}
        >
          <AuthTextField
            title="شماره موبایل"
            placeholder="09*********"
            maxLength={11}
            value={number}
            isDisabled={action !== "" && true}
            name="number"
            changeNumber={setNumber}
          />

          {action === "register" && (
            <AuthTextField title="نام نام خانوادگی" name="fullName" />
          )}

          {(action === "register" ||
            action === "login" ||
            action === "changePassword") && (
            <AuthTextField
              type="password"
              title={
                action === "changePassword" ? "کلمه عبور جدید" : "کلمه عبور"
              }
              name="password"
            />
          )}

          {(action === "sendCode" || action === "changePassword") && (
            <VerificationCodeInput />
          )}

          {action === "login" && (
            <Link onClick={() => forgotPassword(number)} to="#">
              <Typography size="xs" color="textSecondary" mt={2}>
                رمز عبور خود را فراموش کردید؟
              </Typography>
            </Link>
          )}
        </MyForm>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;

const useStyles = makeStyles({
  dialog: {
    width: "33%",
    borderRadius: 14,
  },
  titleBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 49,
    height: 49,
  },
});
