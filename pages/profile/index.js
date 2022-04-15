import  { useState } from "react";

import Link from "next/link";

import { Typography, Grid, Stack } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";

import { EditProfileDialog, ChangePasswordDialog, MyHead } from "../../src/components";

const Profile = () => {

    const account = useSelector((state) => state.account);

    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    const { profileRoot, profileAction, profileDetailBox } = styles;

    const DetailItem = ({ title, value }) => (
        <Stack spacing={2} alignItems="flex-start">
            <Typography color="GrayText">{title}</Typography>
            <Typography variant="subtitle2" fontWeight="bold">
                {value}
            </Typography>
        </Stack>
    );

    const ProfileAction = ({ title, onClick }) => (
        <Link href="#">
            <a  onClick={(e) => {e.preventDefault(); onClick()}}>

            <Grid sx={profileAction}>
                <EditOutlined sx={{ color: "#00B862", fontSize: "17px" }} />
                <Typography
                    fontWeight="bold"
                    fontSize={14}
                    mr={1}
                    color="textSecondary"
                >
                    {title}
                </Typography>
            </Grid>
            </a>
        </Link>
    );

    return (
        <Stack sx={profileRoot}>
            <MyHead
                description="حساب کاربری خود را مشاهده و ویرایش کنید"
                title="حساب کاربری"
                keywords="test"
            />

            <Typography variant="h6" component="h1">حساب کاربری</Typography>
            <Grid sx={profileDetailBox}>
                <DetailItem title="نام نام خانوادگی" value={account.fullName} />
                <DetailItem title="ایمیل" value={account.email} />
            </Grid>
            <ProfileAction
                title="تغییر اطلاعات کاربر"
                onClick={() => setOpenEditProfile(true)}
            />
            <ProfileAction
                title="تغییر رمز عبور"
                onClick={() => setOpenChangePassword(true)}
            />
            <EditProfileDialog
                open={openEditProfile}
                handleClose={() => setOpenEditProfile(false)}
            />
            <ChangePasswordDialog
                open={openChangePassword}
                handleClose={() => setOpenChangePassword(false)}
            />
        </Stack>
    );
};

export default Profile;


const styles = {
    profileRoot: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        padding: "17px",
    },
    profileDetailBox: {
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        width: "100%",
        padding: "3rem 1rem",
    },
    profileAction: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0.4rem 1rem",
        cursor: "pointer",
        "&:hover": {
            marginRight: "0.5rem",
        },
    },
};
