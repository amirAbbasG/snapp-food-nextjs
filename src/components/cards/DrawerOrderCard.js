import Image from "next/image"

import {Button, Stack, Typography, Container} from "@mui/material";
import {Autorenew} from "@mui/icons-material";
import {useDispatch} from "react-redux";

import {Link} from "../";
import {DateTimeBox} from "../";
import {reOrder} from "../../recux/actions/orders";
import styles from "./styles/DrawerOrderCard.styles"



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

