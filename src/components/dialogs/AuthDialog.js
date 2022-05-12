import React, {useState, useContext} from "react";

import Link from "next/link";
import Image from "next/image"

import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    Stack,
} from "@mui/material";
import {Close} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";

import {validateAction} from "../../validators/clientValidators";
import {accountContext} from "../../contexts/account/accountContext";
import {AuthTextField, VerificationCodeInput, MyForm, RenderIf} from "../";

const AuthDialog = ({open, handleClose}) => {
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

    const {dialog} = useStyles();

    const showFullName = action === "register";
    const showPassword = (action === "register" || action === "login" || action === "changePassword");
    const showVerifyCode = (action === "sendCode" || action === "changePassword");
    const showForgotPassword = action === "login";

    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{
                paper: dialog,
            }}
        >
            <DialogTitle>
                <Stack sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <IconButton onClick={onClose}>
                        <Close/>
                    </IconButton>
                    <Image src="/images/logo-name.png" alt="food logo" width={50} height={50}/>
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


                    <RenderIf isTrue={showFullName}>
                        <AuthTextField title="نام نام خانوادگی" name="fullName"/>
                    </RenderIf>



                    <RenderIf isTrue={showPassword}>
                        <AuthTextField
                            type="password"
                            title={
                                action === "changePassword" ? "کلمه عبور جدید" : "کلمه عبور"
                            }
                            name="password"
                        />
                    </RenderIf>


                    <RenderIf isTrue={showVerifyCode}>
                        <VerificationCodeInput/>
                    </RenderIf>


                    <RenderIf isTrue={showForgotPassword}>
                        <Link href="#">
                            <a
                                onClick={() => forgotPassword(number)}
                            >
                                <Typography size="xs" color="textSecondary" mt={2}>
                                    رمز عبور خود را فراموش کردید؟
                                </Typography>
                            </a>
                        </Link>
                    </RenderIf>

                </MyForm>
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;

const useStyles = makeStyles((theme) => ({
    dialog: {
        width: "33%",
        borderRadius: 14,
        [theme.breakpoints.down("sm")]: {
            width: "70%"
        },
        [theme.breakpoints.between("sm", "lg")]: {
            width: "50%"
        }
    }
}));
