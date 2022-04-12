import {useContext} from "react";

import Link from "next/link";

import { Stack, Paper, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/styles";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { isEmpty } from "lodash";
import {useSelector} from "react-redux";

import ShouldLoginPage from "./should-login";
import {accountContext} from "../..//contexts/account/accountContext";

const ProfileLayout = ({ children }) => {
  const account = useSelector((state) => state.account);

  const { exitAccount } = useContext(accountContext);

  const {breakpoints} = useTheme();

  const styles = {
    root: {
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-between",
      [breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    paper: {
      borderRadius: "14px",
      width: "100%",
    },
    paperBox: {
      [breakpoints.down("md")]: {
        width: "100%",
      },
    },
    numberBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    fullName: {
      fontWeight: "bold",
      lineHeight: "0.5px",
      marginBottom: "7px",
    },
  };



  const { fullName, numberBox, paper, paperBox, root } = styles;

  const ProfileItem = ({ url, title, onClick }) => (
    <Link href={url}>
      <a onClick={ onClick && ((e) => {e.preventDefault(); onClick()})}>
        <Stack
          p={3}
          sx={{
            borderTop: "1px #e3e3e4 solid",
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
          <Grid item xs={12} md={4} sx={paperBox}>
            <Paper elevation={2} sx={paper}>
              <Stack>
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
          <Grid item md={9} xs={12} sx={paperBox}>
            <Paper elevation={2} sx={paper}>
              <main>

              {children}
              </main>
            </Paper>
          </Grid>
        </Grid>
      )}
      </>
  );
};

export default ProfileLayout;


