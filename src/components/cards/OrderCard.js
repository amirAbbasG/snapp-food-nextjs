import {useState} from "react";

import Image from "next/image"

import {Badge, Button, Stack, Typography, Container} from "@mui/material";
import {useTheme} from "@mui/system";
import {InfoOutlined, Autorenew, LocationOn} from "@mui/icons-material";
import {useDispatch} from "react-redux";

import {Link} from "../";
import {DateTimeBox} from "../";
import {separatePrice} from "../../utils/priceSeparator";
import {FactorDialog} from "../";
import {reOrder} from "../../recux/actions/orders";


const OrderCard = ({order}) => {
    const dispatch = useDispatch();
    const [openFactor, setOpenFactor] = useState(false);

    const {breakpoints} = useTheme()

    const styles = {
        root: {
            display: "felx",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "1px #e3e3e4 solid",
            padding: "14px",
            [breakpoints.down("lg")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },

        shopImage: {
            borderRadius: "7px",
            marginLeft: "7px",
            boxShadow: 1,
        },
        foodBox: {
            backgroundColor: "secondary.dark",
            borderRadius: "10px",
            padding: "4px",
            overflowX: "scroll !important"

        },
        statusBox: {
            border: "1px solid green",
            borderRadius: "7px",
            padding: "7px"
        },
        badge: {
            marginLeft: "12px",
            [breakpoints.down("sm")]: {
                marginTop: "1rem"
            }
        },
        exactAddress: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "20ch",
            whiteSpace: "noWrap"
        }
    };

    const {root, shopImage, foodBox, statusBox, badge, exactAddress} = styles;

    return (
        <>
            <Stack spacing={2} sx={root} component="article">
                <Stack spacing={3}>
                    <Container>
                        <Link href={`/shops/${order.shopId}`} sx={shopImage}>
                            <Image
                                width={80}
                                height={80}
                                alt="shop-logo"
                                src={`/images/logo/${order.shopId.shopLogo}`}
                            />

                        </Link>
                        <Stack spacing={1}>
                            <Typography mr={1} fontWeight="bold">
                                {order.shopId.shopName}
                            </Typography>
                            <DateTimeBox dateTime={order.createDate}/>
                            <Container>
                                <LocationOn sx={{color: "gray"}}/>
                                <Typography mr={0.3} sx={exactAddress}>
                                    {order.address.exactAddress}
                                </Typography>
                            </Container>
                        </Stack>
                    </Container>
                    <Stack pr={2} direction={{xs: "column", sm: "row"}}>
                        {order.foods.map((food) => (
                            <Badge
                                sx={badge}
                                color="primary"
                                badgeContent={food.count}
                                key={food._id}
                            >
                                <Stack sx={foodBox}>
                                    <Typography>{food.name}</Typography>
                                </Stack>
                            </Badge>
                        ))}
                    </Stack>
                </Stack>
                <Stack spacing={3} alignItems={{xs: "center", lg: "flex-end"}}>
                    {
                        order.isDelivered && (
                            <Stack sx={statusBox}>
                                <Typography sx={{color: "success.main"}}>تحویل مشتری</Typography>
                            </Stack>
                        )
                    }
                    <Typography>
                        {separatePrice(order.amountByDiscount + order.shopId.deliveryCost)}{" "}
                        تومان
                    </Typography>
                    <Container>
                        <Button
                            onClick={() => setOpenFactor(true)}
                            color="secondary"
                            variant="contained"
                            startIcon={<InfoOutlined/>}
                        >
                            مشاهده فاکتور
                        </Button>
                        <Button
                            onClick={() => dispatch(reOrder(order._id))}
                            color="primary"
                            variant="contained"
                            startIcon={<Autorenew/>}
                        >
                            سفارش مجدد
                        </Button>
                    </Container>
                </Stack>
            </Stack>
            <FactorDialog
                open={openFactor}
                orderId={order._id}
                handleClose={() => setOpenFactor(false)}
            />
        </>
    );
};

export default OrderCard;

