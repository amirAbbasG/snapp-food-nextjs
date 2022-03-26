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

import {
    FoodCard,
    RateBox,
    ShopInformationDialog,
    FoodDetailsDialog,
    CouponBox,
    CartBox,
    MyHead,
} from "../../src/components";
import { separatePrice } from "../../src/utils/priceSeparator";
import { calculateRate } from "../../src/utils/rateCalculator";

export async function getServerSideProps(context){
    const {shopId} = context.query;
    const shopDetails = {
        _id: shopId,
        deliveryCost: 22222,
        comments: [],
        foods: [],
        shopName: "test",
        address: {
            city: "city",
            exactAddress: "test address",
            longitude: 1,
            latitude: 1
        },
        coupons: []

    }
    return {
        props: {
            shopDetails
        }
    }
}


const ShopDetails = ({shopDetails}) => {
    const router = useRouter();
    const {shopId} = router.query

    const [openInformation, setOpenInformation] = useState(false);
    const [openFoodDetails, setOpenFoodDetails] = useState(false);
    const [food, setFood] = useState({});

    // const account = useSelector((state) => state.account);
    const account = {}



    const cost = separatePrice(shopDetails.deliveryCost);
    const rate = calculateRate(shopDetails.comments);

    let isShopFavorite = false;
    if (!isEmpty(account)) {
        isShopFavorite = account.favoriteShop.some((s) => s._id === shopId);
    }


    const handlePressFavorite = () => {
        // if (isShopFavorite) {
        //     removeShopFromFavorite(shopId);
        // } else {
        //     addShopToFavorite(shopId);
        // }
    };

    const handleClickFood = (food) => {
        setFood(food);
        setOpenFoodDetails(true);
    };


    const { foodItem, shopLogo, informationBtn, sideBox } = styles;

    return (
        <>
            <MyHead
                description="جزئیات و مننوی غذایی فروشگاه مورد نظر"
                title="جزئیات فروشگاه"
                keywords="test"
            />
            {shopDetails.foods && (
                <Grid container>
                    <Grid container item xs={12} md={4} lg={3} sx={sideBox}>
                        <Stack direction="row">
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
                            <IconButton onClick={handlePressFavorite} sx={{ marginRight: 1 }}>
                                <FavoriteBorderOutlined
                                    color={isShopFavorite ? "primary" : "#80808"}
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
                    <Grid container item xs={12} lg={6} md={8} mb={2}>
                        <Paper sx={{ borderRadius: 2, overflowY: "scroll", width: "100%" }}>
                            <CouponBox coupons={shopDetails.coupons} shopId={shopId} />
                            <Typography m={2} textAlign="center">
                                منو غذایی
                            </Typography>
                            <Grid container item width="100%">
                                {shopDetails.foods.map((f) => (
                                    <Grid
                                        key={f._id}
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
                    <Grid sx={sideBox} container item xs={12} md={12} lg={3}>
                        <Paper sx={{ padding: "10px 20px", borderRadius: 2 }}>
                            <Container>
                                <DeliveryDiningTwoTone />
                                <Typography mr={2}>{`پیک فروشنده ${cost} تومان`}</Typography>
                            </Container>
                        </Paper>
                        {!isEmpty(account) && <CartBox shopId={shopId} />}
                    </Grid>
                    <ShopInformationDialog
                        shopDetails={shopDetails}
                        open={openInformation}
                        handleClose={() => setOpenInformation(false)}
                    />
                    {food !== {} && (
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
        borderRadius: 10,
        boxShadow: 3,
        marginLeft: 10,
        overflow: "hidden"
    },
    informationBtn: {
        borderRadius: 20,
        boxShadow: 3,
        color: "text.secondary",
        margin: "30px 8px",
    },
    sideBox: {
        display: "flex",
        flexDirection: "column",
        padding: "0 30px",
    },
};
