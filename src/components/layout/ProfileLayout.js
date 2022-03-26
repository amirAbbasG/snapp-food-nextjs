import Link from "next/link";
import { Stack, Paper, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { isEmpty } from "lodash";

import { DefaultLayout } from "../";
import ShouldLoginPage from "../../../pages/profile/should-login";

const ProfileLayout = ({ children }) => {
  // const account = useSelector((state) => state.account);
  const account = {
    fullName: "",
    number: 1,
    email: "",
  };
  // const { exitAccount } = useContext(accountContext);

  const { fullName, numberBox, paper, paperBox, root } = useStyles();

  const ProfileItem = ({ url, title, onClick }) => (
    <Link href={url}>
      <a onClick={onClick}>
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
    <DefaultLayout showShopTypes={false} useDefaultOutlet={false}>
      {isEmpty(account) ? (
        <ShouldLoginPage />
      ) : (
        <Grid container spacing={6} columns={13} className={root}>
          <Grid item xs={12} md={4} className={paperBox}>
            <Paper elevation={2} className={paper}>
              <Stack>
                <Link href="/profile">
                  <a>
                    <Stack p={3}>
                      <Typography className={fullName}>
                        {account.fullName}
                      </Typography>
                      <Stack className={numberBox}>
                        <Typography lineHeight={0.5} color="GrayText">
                          {account.number}
                        </Typography>
                        <KeyboardArrowLeft color="gray" />
                      </Stack>
                    </Stack>
                  </a>
                </Link>
                <ProfileItem url="orders" title="سفارش های من" />
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
                  // onClick={exitAccount}
                  title="خروج"
                />
              </Stack>
            </Paper>
          </Grid>
          <Grid item md={9} xs={12} className={paperBox}>
            <Paper elevation={2} className={paper}>
              {children}
            </Paper>
          </Grid>
        </Grid>
      )}
    </DefaultLayout>
  );
};

export default ProfileLayout;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  paper: {
    borderRadius: 14,
    width: "100%",
  },
  paperBox: {
    [theme.breakpoints.down("md")]: {
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
    lineHeight: 0.5,
    marginBottom: 7,
  },
}));
