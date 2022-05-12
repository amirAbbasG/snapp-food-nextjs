import {useContext} from "react";

import Link from "next/link";

import { Stack, Paper, Typography, Grid } from "@mui/material";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { isEmpty } from "lodash";
import {useSelector} from "react-redux";

import ShouldLoginPage from "./should-login";
import {accountContext} from "../..//contexts/account/accountContext";
import styles from "./styles/ProfileLayout.styles"

const ProfileLayout = ({ children }) => {

  const account = useSelector((state) => state.account);

  const { exitAccount } = useContext(accountContext);


  const { fullName, numberBox, paper, paperBox, root } = styles;

  const ProfileItem = ({ url, title, onClick }) => (
    <Link href={url}>
      <a onClick={ onClick && ((e) => {e.preventDefault(); onClick()})}>
        <Stack
          p={3}
          sx={{
            borderTop: "1px #e3e3e4 solid",
            transition: "padding 0.25s ease-in-out",
            "&:hover": { paddingRight: 4 },
          }}
        >
          <Typography>{title}</Typography>
        </Stack>
      </a>
    </Link>
  );

  return (
      <>
      {isEmpty(account) ? (
        <ShouldLoginPage />
      ) : (
        <Grid container spacing={6} columns={13} sx={root}>
          <Grid item xs={12} md={4} sx={paperBox} component="aside">
            <Paper elevation={2} sx={paper} >
              <Stack component="nav">
                <Link href="/profile">
                  <a>
                    <Stack p={3}>
                      <Typography sx={fullName}>
                        {account.fullName}
                      </Typography>
                      <Stack sx={numberBox}>
                        <Typography lineHeight={0.5} color="GrayText">
                          {account.number}
                        </Typography>
                        <KeyboardArrowLeft color="gray" />
                      </Stack>
                    </Stack>
                  </a>
                </Link>
                <ProfileItem url="/profile/user-orders" title="سفارش های من" />
                <ProfileItem
                  url="/profile/user-payments"
                  title="پرداخت های من"
                />
                <ProfileItem
                  url="/profile/favourite-shops"
                  title="فروشگاهای مورد علاقه"
                />
                <ProfileItem url="#" title="دریافت تخفیف" />
                <ProfileItem
                  url="#"
                  onClick={exitAccount}
                  title="خروج"
                />
              </Stack>
            </Paper>
          </Grid>
          <Grid item md={9} xs={12} sx={paperBox} component="main">
            <Paper elevation={2} sx={{paper, overflowY: "auto"}}>
              {children}
            </Paper>
          </Grid>
        </Grid>
      )}
      </>
  );
};

export default ProfileLayout;


