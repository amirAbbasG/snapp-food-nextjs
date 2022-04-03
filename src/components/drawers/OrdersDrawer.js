import {useRouter} from "next/router";

import { Drawer, Typography, Button, Stack } from "@mui/material";
import { Restore } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import {useSelector} from "react-redux";

import { DrawerOrderCard } from "../";



const OrdersDrawer = ({ open, handleClose }) => {
  const router = useRouter()
  const { drawer } = useStyles();
  const orders = useSelector((state) => state.orders);
  const deliveredOrders = [...orders].filter((o) => o.isPaid && o.isDelivered);
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      classes={{
        paper: drawer,
      }}
      SlideProps={{ direction: "right" }}
    >
      <Typography m={2} fontWeight="bold">
        سفارش های پیشین
      </Typography>
      <Stack sx={{
        margin: "10px",
        borderRadius: "10px",
        border: "1px #e3e3e4 solid",
      }}>
        {deliveredOrders.map((order) => (
          <DrawerOrderCard key={order._id} order={order} />
        ))}
      </Stack>
      <Button onClick={() => router.push("/profile/user-orders")} startIcon={<Restore color="success" />} color="success" >
        مشاهده همه سفارش ها
      </Button>
    </Drawer>
  );
};

export default OrdersDrawer;

const useStyles = makeStyles({
  drawer: {
    width: "30%",
  }
});
