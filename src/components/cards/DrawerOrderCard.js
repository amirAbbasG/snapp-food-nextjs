import Image from "next/image"

import { Button, Stack, Typography, Container } from "@mui/material";
import { Autorenew } from "@mui/icons-material";
import {useDispatch} from "react-redux";

import {Link} from "../";
import { DateTimeBox } from "../";
import {reOrder} from "../../recux/actions/orders";


const DrawerOrderCard = ({ order }) => {
  const { root, shopLogo } = styles;
  const dispatch = useDispatch();

  return (
    <Stack sx={root}>
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
          <Typography mr={1} fontWeight="bold">
            {order.shopId.shopName}
          </Typography>
          <DateTimeBox dateTime={order.createDate} />
        </Stack>
      </Container>
      <Button
        sx={{ width: "50%" }}
        onClick={() => dispatch(reOrder(order._id))}
        color="secondary"
        variant="contained"
        startIcon={<Autorenew />}
      >
        سفارش مجدد
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
};
