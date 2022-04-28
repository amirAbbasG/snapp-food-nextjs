import {useState, useContext} from "react";

import Link from "next/link";
import dynamic from "next/dynamic"

import {Grid, Paper, Button, Typography, IconButton} from "@mui/material";
import {
    AddBusiness,
    Search,
    MyLocation,
    ArrowDropDown,
    PersonOutline,
    ListAlt,
} from "@mui/icons-material";
import {styled} from "@mui/system";
import {isEmpty} from "lodash";
import {useSelector} from "react-redux";

import {
    ShopTypesBox,
    SnappFoodLogo,
    SearchDialog,
    AuthDialog,
    ProfileMenu,
    AddressButton,
    OrdersDrawer,
} from "../";
import {globalContext} from "../../contexts/global/globalContext";
import styles from "./styles/Header.styles"

const AddressDialog = dynamic(() => import('../dialogs/AddressDialog'), {
    ssr: false
});


const Header = ({shouldShowShopTypes = true}) => {

    const account = useSelector((state) => state.account);
    const isLogin = !isEmpty(account)


    const [openSearch, setOpenSearch] = useState(false);
    const [openAddress, setOpenAddress] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const {isSm, isXs, openAuth, setOpenAuth} = useContext(globalContext);

    const HeaderButton = styled(Button)( ({theme}) => ({
        height: "3rem",
        marginRight: "2px",
        [theme.breakpoints.up("xl")]:{
            fontSize: "14px"
        }
    }));


    //#region handlers

    const handleAuth = (event) => {
        if (isLogin) {
            setProfileAnchorEl(event.currentTarget);
        } else {
            setOpenAuth(true)

        }

    };


    const handleCloseAddress = (event) => {
        event.preventDefault()
        setOpenAddress(false)
    };

    const handleOpenAddress = (event) => {
        event.preventDefault()
        setOpenAddress(true)
    };

    //#endregion

    const SearchBox = () => (
        <Grid
            onClick={() => setOpenSearch(true)}
            item
            md={3}
            sx={styles.SearchBox}
        >
            <Search color="disabled" fontSize="medium"/>
            <Typography sx={styles.searchText}>جستجو در اسنپ فود</Typography>
        </Grid>
    )

    const Dialogs = () => (
        <>
            <SearchDialog
                open={openSearch}
                handleClose={() => setOpenSearch(false)}
            />
            <AuthDialog open={openAuth} handleClose={() => setOpenAuth(false)}/>
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
                onClose={() => setProfileAnchorEl(null)}
            />
        </>
    )

    const SearchAndAuthButtons = () => (
        <Grid sx={styles.iconsBox(isLogin)} item xs={isLogin ? 6 : 5} sm={5} md={2} lg={3}>

            <IconButton
                onClick={() => setOpenSearch(true)}
                sx={ theme => ({
                    marginLeft: "4px",
                    [theme.breakpoints.up("md")]: {
                        display: "none",
                    },
                })}
            >
                <Search color="disabled" sx={{fontSize: 30}}/>
            </IconButton>

            <IconButton onClick={handleAuth}>
                <PersonOutline sx={{fontSize: 30}}/>
            </IconButton>

        </Grid>
    )


    return (
        <>
            <Paper sx={styles.root} component="header">
                <Grid container justifyContent="space-between" alignItems="center" pt="0.7rem">


                    <Grid item sm={1}>
                        <SnappFoodLogo sx={styles.logo}/>
                    </Grid>

                    {isLogin ? (
                        <>
                            <Grid item xs={3} sm={4} container sx={styles.addressBox}>
                                <Grid item ml={2}>
                                    <MyLocation sx={{color: "#808080"}}/>
                                </Grid>
                                <Grid item>
                                    <Link href="#">
                                        <a onClick={handleOpenAddress}>
                                            <Typography lineHeight={0.7} sx={styles.addressTitle}>آدرس
                                                انتخابی</Typography>
                                            <Typography
                                                color="GrayText"
                                                fontSize={10}
                                                sx={styles.exactAddress}
                                            >
                                                {!isEmpty(account.addresses)
                                                    ? [...account.addresses]
                                                        .reverse()[0]
                                                        .exactAddress
                                                    : "آدرسی ثبت نشده"}
                                                {<ArrowDropDown color="primary"/>}
                                            </Typography>
                                        </a>
                                    </Link>
                                </Grid>
                            </Grid>

                            <SearchBox/>
                            <SearchAndAuthButtons/>

                            <Grid sx={styles.orderBox} item xs={2} sm={1} md={1.3} lg={1}>

                                <HeaderButton
                                    onClick={() => setOpenDrawer(true)}
                                    variant="text"
                                    sx={{color: "#000", px: 0, mr: "4px"}}
                                    startIcon={<ListAlt sx={{fontSize: 30}}/>}
                                >
                                    {!isSm && !isXs && "سفارش ها"}
                                </HeaderButton>

                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item xs={7} sm={4} sx={styles.addressButton}>
                                <Link href="#">
                                    <a onClick={handleCloseAddress}>
                                        <AddressButton/>
                                    </a>
                                </Link>
                            </Grid>
                            <SearchBox/>

                            <Grid item md={4} sx={styles.buttonBox}>
                                <HeaderButton
                                    variant="text"
                                    sx={{color: "#000"}}
                                    startIcon={<AddBusiness sx={{fontSize: "30px"}}/>}
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

                            <SearchAndAuthButtons/>
                        </>
                    )}

                </Grid>

                {shouldShowShopTypes && <ShopTypesBox/>}

            </Paper>
            <Dialogs/>
        </>

    );
};

export default Header;


