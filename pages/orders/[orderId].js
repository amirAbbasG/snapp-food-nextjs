import { useState } from "react";

import {useRouter} from "next/router";

import {useDispatch, useSelector} from "react-redux";
import {
    Grid,
    Paper,
    Button,
    Typography,
    InputBase,
    CircularProgress,
} from "@mui/material";
import {
    LocationOn,
    LocalOfferOutlined,
    CheckCircle,
} from "@mui/icons-material";

import { Factor, MyHead } from "../../src/components";
import { separatePrice } from "../../src/utils/priceSeparator";
import { errorMessage, successMessage } from "../../src/lib/toast";
import { checkPaymentApi } from "../../src/services/paymentsServices";
import { setDiscountApi } from "../../src/services/orderServices";
import {getOrders} from "../../src/recux/actions/orders";
import {styles} from "./styles"

const FinalizeOrder = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { orderId } = router.query;
    const [discountCode, setDiscountCode] = useState("");
    const [loadingPayment, setLoadingPayment] = useState(false);

    const orders = useSelector((state) => state.orders);
    const order = orders.find((o) => o._id === orderId);

    let couponDiscount = 0;
    if (order.usedCoupon && order.usedCoupon.discount > 0) {
        couponDiscount = (order.amountByDiscount * order.usedCoupon.discount) / 100;
    }

    //#region payment
    const checkPayment = async () => {
        try {
            setLoadingPayment(true);
            const { data } = await checkPaymentApi(orderId);
            setLoadingPayment(false);
            window.location.replace(data.paymentUrl);
        } catch (error) {
            setLoadingPayment(false);
            errorMessage(error.response.data.message);
        }
    };

    //#endregion

    //#region use discount
    const handleUseDiscount = async () => {
            try {
                const { status } = await setDiscountApi(orderId, discountCode);
                if (status === 200) {
                    dispatch(getOrders());
                    setDiscountCode("")
                }
                successMessage("تخفیف اعمال شد");
            } catch (error) {
                errorMessage(error.response.data.message);
            }
    }
    //#endregion

    const { paymentButton, rightBox, foodBox, foodItem, roundedBox } =
        styles;

    return (
        <Grid container spacing={2} p={7}>
            <MyHead
                description="پرداخت انلاین و پرداخت درب منزل برای سفارش غذا"
                title="تایید سفارش"
                keywords="test"
            />
            {order && (
                <>
                    <Grid item sm={12} md={8} p={4}>
                        <Paper sx={{ width: "100%" }}>
                            <Grid sx={rightBox}>
                                <Typography m={2}>آدرس</Typography>
                                <Grid sx={roundedBox} mb={14}>
                                    <LocationOn sx={{ color: "gray" }} />
                                    <Typography mr={0.3} my={1}>
                                        {order.address.exactAddress}
                                    </Typography>
                                    <Grid flex={1} />
                                    <CheckCircle color="success" />
                                </Grid>
                                <Grid sx={roundedBox}>
                                    <LocalOfferOutlined />
                                    <Typography mr={2}>کد تخفیف دارید ؟</Typography>
                                    <InputBase
                                        sx={{
                                            ml: 4,
                                            flex: 1,
                                            direction: "ltr",
                                            fontSize: 20,
                                        }}
                                        value={discountCode}
                                        onChange={(event) => setDiscountCode(event.target.value)}
                                    />
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        onClick={handleUseDiscount}
                                        sx={{ left: 0, borderRadius: 3 }}
                                    >
                                        وارد کردن
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={4} p={4}>
                        <Paper
                            sx={{ width: "100%", display: "flex", flexDirection: "column" }}
                        >
                            <Typography
                                mt={2}
                                mr={2}
                            >{`سبد خرید (${order.foods.length})`}</Typography>
                            <Grid sx={foodBox}>
                                {order.foods.map((food) => (
                                    <Grid key={food._id} sx={foodItem}>
                                        <Typography
                                            my={1}
                                        >{`${food.name} (${food.count})`}</Typography>
                                        <Typography>
                                            {separatePrice(
                                                (food.price - (food.price * food.discount) / 100) *
                                                food.count
                                            )}
                                            تومان
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                            <Factor orderId={orderId} couponDiscount={couponDiscount} />
                            <Grid p={2}>
                                <Button
                                    variant="contained"
                                    sx={paymentButton}
                                    onClick={checkPayment}
                                >
                                    {loadingPayment ? (
                                        <CircularProgress color="secondary" />
                                    ) : (
                                        "پرداخت"
                                    )}
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default FinalizeOrder;


