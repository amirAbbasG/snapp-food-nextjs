import Image from "next/image"

import {Button, Stack, Typography, Container} from "@mui/material";
import {Autorenew} from "@mui/icons-material";
import {useDispatch} from "react-redux";

import {Link} from "../";
import {DateTimeBox} from "../";
import {reOrder} from "../../recux/actions/orders";



const DrawerOrderCard = ({order}) => {
    const {root, shopLogo, button} = styles;
    const dispatch = useDispatch();


    return (
        <Stack sx={root} component="article">
            <Container>
                <Link href={`/shops/${order.shopId._id}`}>
                    <Stack sx={shopLogo}>

                        <Image
                            width={80}
                            height={80}
                            alt="shop-logo"
                            src={`/images/logo/${order.shopId.shopLogo}`}
                        />
                    </Stack>
                </Link>
                <Stack spacing={1}>
                    <Link href={`/shops/${order.shopId._id}`} className="link">
                        <Typography mr={1} fontWeight="bold">
                            {order.shopId.shopName}
                        </Typography>
                    </Link>
                    <DateTimeBox dateTime={order.createDate}/>
                </Stack>
            </Container>
            <Button
                sx={button}
                onClick={() => dispatch(reOrder(order._id))}
                color="secondary"
                variant="contained"
                startIcon={<Autorenew />}
            >
                <Typography sx={(theme) => ({
                    [theme.breakpoints.down("sm")]: {
                        display: "none"
                    },
                    fontSize: "12px"
                })}>سفارش مجدد</Typography>

            </Button>
        </Stack>
    );
};

export default DrawerOrderCard;

const styles = {
    root: {
        display: "felx",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "1px #e3e3e4 solid",
        padding: "10px",
    },

    shopLogo: {
        width: "3rem",
        height: "3rem",
        borderRadius: "7px",
        marginLeft: "7px",
        overflow: "hidden",
        boxShadow: 1,
    },
    button: (theme) => ({
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "auto",
            px: "2px"
        }
    })
};
