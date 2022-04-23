import { useState } from "react";

import Image from "next/image";
import {useRouter} from "next/router";

import {
    Grid,
    Paper,
    Stack,
    Typography,
    Container,
    Button,
    IconButton,
} from "@mui/material";
import {
    InfoOutlined,
    DeliveryDiningTwoTone,
    FavoriteBorderOutlined,
} from "@mui/icons-material";
import { isEmpty } from "lodash";
import {useDispatch, useSelector} from "react-redux";

import {
    FoodCard,
    RateBox,
    ShopInformationDialog,
    FoodDetailsDialog,
    CouponBox,
    CartBox,
    MyHead,
} from "../../src/components";
import {getShopDetailsApi} from "../../src/services/shopServices";
import { separatePrice } from "../../src/utils/priceSeparator";
import { calculateRate } from "../../src/utils/rateCalculator";
import {addOrRemoveFavoriteShopApi} from "../../src/services/shopServices"
import {successMessage, errorMessage} from "../../src/lib/toast";
import {getAccountInformation} from "../../src/recux/actions/account";

export async function getServerSideProps(context){
    const {shopId} = context.query;
    const {data: {shopDetails}} = await getShopDetailsApi(shopId)
    return {
        props: {
            shopDetails
        }
    }
}


const ShopDetails = ({shopDetails}) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const {shopId} = router.query

    const [openInformation, setOpenInformation] = useState(false);
    const [openFoodDetails, setOpenFoodDetails] = useState(false);
    const [food, setFood] = useState({});

    const account = useSelector((state) => state.account);

    let isFavouriteShop = false
    if (!isEmpty(account)){
        isFavouriteShop = account.favoriteShop.some((s) => s._id === shopId)
    }




    const cost = separatePrice(shopDetails.deliveryCost);
    const rate = calculateRate(shopDetails.comments);



    const handlePressFavorite = async () => {
      try {
          const {data: {favourite}} = await addOrRemoveFavoriteShopApi(shopId);
          dispatch(getAccountInformation());

          if (favourite){
          successMessage("فروشگاه در لیست مورد علاقه قرار گرفت")
          }else {
              successMessage("فروشگاه از لیست مورد علاقه خارج گردید")
          }
      }catch (error){
          errorMessage("مشکلی پیش آمده", error.response.data.message)
          console.error(error.response.data.message)
      }
    };

    const handleClickFood = (food) => {
        setFood(food);
        setOpenFoodDetails(true);
    };


    const { foodItem, shopLogo, informationBtn, sideBox, deliveryCost } = styles;

    return (
        <>
            <MyHead
                description="جزئیات و مننوی غذایی فروشگاه مورد نظر"
                title="جزئیات فروشگاه"
                keywords="test"
            />
            {shopDetails.foods && (
                <Grid container>
                    <Grid container item xs={12} md={4} xl={3} sx={sideBox} component="aside">
                        <Stack direction="row" width="100%" >
                            <Stack sx={shopLogo}>
                            <Image
                                height={80}
                                width={80}
                                alt="shop logo"
                                src={`/images/logo/${shopDetails.shopLogo}`}
                            />
                            </Stack>
                            <Stack p={1}>
                                <Container>
                                    <RateBox rate={rate === 0 ? "جدید" : rate} />
                                    <Typography
                                        mr={2}
                                        color="GrayText"
                                    >{`(${shopDetails.comments.length} نظر)`}</Typography>
                                </Container>
                                <Typography
                                    fontSize={17}
                                    fontWeight="bold"
                                    mt={2}
                                >{`${shopDetails.shopName} (${shopDetails.address.city})`}</Typography>
                            </Stack>
                            <Stack flex={1} />
                            <IconButton onClick={handlePressFavorite}>
                                <FavoriteBorderOutlined
                                    color={isFavouriteShop ? "primary" : "#80808"}
                                />
                            </IconButton>
                        </Stack>
                        <Button
                            onClick={() => setOpenInformation(true)}
                            startIcon={<InfoOutlined color="textSecondary" />}
                            sx={informationBtn}
                            color="success"
                        >
                            اطلاعات و نظرات
                        </Button>
                    </Grid>
                    <Grid container item xs={12} xl={6} md={8} mb={2} component="main">
                        <Paper sx={{ borderRadius: 2, overflowY: "scroll", width: "100%" }}>
                            <CouponBox coupons={shopDetails.coupons} shopId={shopId} />
                            <Typography m={2} textAlign="center" component="h1">
                                منو غذایی
                            </Typography>
                            <Grid container item width="100%">
                                {shopDetails.foods.map((f) => (
                                    <Grid
                                        key={f._id }
                                        item
                                        sm={12}
                                        xs={12}
                                        md={6}
                                        p={0.4}
                                        sx={foodItem}
                                    >
                                        <FoodCard food={f} onClick={() => handleClickFood(f)} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid sx={sideBox} container item xs={12} xl={3} component="aside">
                        <Paper sx={deliveryCost}>
                            <Container>
                                <DeliveryDiningTwoTone />
                                <Typography fontSize="12px" component="h3" mr={2}>{`پیک فروشنده ${cost} تومان`}</Typography>
                            </Container>
                        </Paper>
                        {!isEmpty(account) && <CartBox shopId={shopId} />}
                    </Grid>
                    <ShopInformationDialog
                        shopDetails={shopDetails}
                        open={openInformation}
                        handleClose={() => setOpenInformation(false)}
                    />
                    {!isEmpty(food) && (
                        <FoodDetailsDialog
                            food={food}
                            open={openFoodDetails}
                            handleClose={() => setOpenFoodDetails(false)}
                        />
                    )}
                </Grid>
            )}
        </>
    );
};

export default ShopDetails;

const styles = {
    foodItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    shopLogo: {
        borderRadius: "10px",
        maxHeight: "70px",
        maxWidth: "70px",
        minWidth: "50px",
        boxShadow: 3,
        marginLeft: "10px",
        overflow: "hidden"
    },
    informationBtn: {
        borderRadius: "20px",
        boxShadow: 3,
        color: "text.secondary",
        margin: "30px 8px",
    },
    sideBox: {
        display: "flex",
        flexDirection: "column",
        padding: "0 10px",
    },
    deliveryCost: {
        padding: "10px",
        borderRadius: 2,
    }
};
