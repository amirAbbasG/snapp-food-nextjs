import { useState, useContext } from "react";
import { Grid, Paper, Button, Typography, IconButton } from "@mui/material";
import {
  AddBusiness,
  Search,
  MyLocation,
  ArrowDropDown,
  PersonOutline,
  ListAlt,
} from "@mui/icons-material";
import Link from "next/link";
import { useTheme } from "@mui/styles";
import {styled} from "@mui/system";
import {
  ShopTypesBox,
  SnappFoodLogo,
  SearchDialog,
  AuthDialog,
  ProfileMenu,
  AddressButton,
  AddressDialog,
  OrdersDrawer,
} from "../";
import { isEmpty } from "lodash";
import { globalContext } from "../../contexts";

const Header = ({ shouldShowShopTypes = true }) => {

  const theme = useTheme()

  const styles = {
    root: {
      padding: "0 1rem 1rem 1rem",
      width: "100%",
      top: 0,
      position: "sticky",
      zIndex: 999,
    },
    logo: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    SearchBox: {
      backgroundColor: theme.palette.secondary.dark,
      borderRadius: "8px",
      alignItems: "center",
      display: "flex",
      width: "27%",
      padding: "10px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    searchText: {
      display: "inline",
      color: "#808080",
      fontSize: 15,
      marginRight: "8px",
    },
    buttonBox: {
      display: "flex",
      justifyContent: "flex-end",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    addressBox: {
      cursor: "pointer",
      alignItems: "center",
    },
    iconsBox: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    orderBox: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    addressButton: {
      display: "flex",
      alignItems: "center",
    },
  };

  const [openSearch, setOpenSearch] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [profileAnchorEl, setprofileAnchorEl] = useState(null);
  const { isSm, isXs, openAuth, setOpenAuth } = useContext(globalContext);

  const HeaderButton = styled(Button)((theme) => ({
    height: "3rem",    marginRight: "4px",
  }));

  // const account = useSelector((state) => state.account);
  const account = {};

  const handleOpenProfileMenu = (event) => {
    setprofileAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Paper sx={styles.root}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid xs={6} md={4} item container>
            <Grid item xs={3}>
              <SnappFoodLogo sx={styles.logo} />
            </Grid>

            {isEmpty(account) ? (
              <Link href="#">
                <a onClick={() => setOpenAddress(false)}>
                  <Grid pt={1} item sx={styles.addressButton}>
                    <AddressButton />
                  </Grid>
                </a>
              </Link>
            ) : (
              <Grid item xs={12} sm={9} container sx={styles.addressBox}>
                <Grid item ml={2}>
                  <MyLocation sx={{ color: "#808080" }} />
                </Grid>
                <Grid item>
                  <Link href="#">
                    <a onClick={() => setOpenAddress(true)}>
                      <Typography lineHeight={0.7}>آدرس انتخابی</Typography>
                      <Typography
                        lineHeight={0.7}
                        color="GrayText"
                        fontSize={10}
                      >
                        {!isEmpty(account.addresses)
                          ? `${[...account.addresses]
                              .reverse()[0]
                              .exactAddress.slice(0, 30)}...`
                          : "آدرسی ثبت نشده"}
                        {<ArrowDropDown color="primary" />}
                      </Typography>
                    </a>
                  </Link>
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid
            onClick={() => setOpenSearch(true)}
            item
            xs={3}
            sx={styles.SearchBox}
          >
            <Search color="disabled" fontSize="medium" />
            <Typography sx={styles.searchText}>جستجو در اسنپ فود</Typography>
          </Grid>

          {isEmpty(account) && (
            <Grid item md={5} lg={4} sx={styles.buttonBox}>
              <HeaderButton
                variant="text"
                sx={{ color: "#000" }}
                startIcon={<AddBusiness sx={{ fontSize: "30px" }} />}
              >
                ثبت نام فروشندگان
              </HeaderButton>
              <HeaderButton
                onClick={() => setOpenAuth(true)}
                variant="contained"
              >
                ورود یا عضویت
              </HeaderButton>
            </Grid>
          )}
          <Grid sx={styles.iconsBox} item xs={3}>
            <IconButton
              onClick={() => setOpenSearch(true)}
              sx={{ marginLeft: "10px" }}
            >
              <Search color="disabled" sx={{ fontSize: 30 }} />
            </IconButton>
            {isEmpty(account) && (
              <IconButton>
                <PersonOutline sx={{ fontSize: 30 }} />
              </IconButton>
            )}
          </Grid>
          {!isEmpty(account) && (
            <Grid sx={styles.orderBox} item xs={3}>
              <IconButton onClick={handleOpenProfileMenu}>
                <PersonOutline sx={{ fontSize: 30 }} />
              </IconButton>
              <HeaderButton
                onClick={() => setOpenDrawer(true)}
                variant="text"
                sx={{ color: "#000" }}
                startIcon={<ListAlt sx={{ fontSize: 30 }} />}
              >
                {!isSm && !isXs && "سفارش ها"}
              </HeaderButton>
            </Grid>
          )}
        </Grid>
        {shouldShowShopTypes && <ShopTypesBox />}
      </Paper>
      <SearchDialog
        open={openSearch}
        handleClose={() => setOpenSearch(false)}
      />
      <AuthDialog open={openAuth} handleClose={() => setOpenAuth(false)} />
      <AddressDialog
        open={openAddress}
        handleClose={() => setOpenAddress(false)}
      />
      <OrdersDrawer
        open={openDrawer}
        handleClose={() => setOpenDrawer(false)}
      />
      <ProfileMenu
        anchorEl={profileAnchorEl}
        onClose={() => setprofileAnchorEl(null)}
      />
    </>
  );
};

export default Header;


