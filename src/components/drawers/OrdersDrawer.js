import { Drawer, Typography, Button, Stack } from "@mui/material";
import { Restore } from "@mui/icons-material";
import { DrawerOrderCard } from "../";
import { makeStyles } from "@mui/styles";

const OrdersDrawer = ({ open, handleClose }) => {
  const { drawer, ordersBox } = useStyles();
  // const orders = useSelector((state) => state.orders);
  const orders = [];
  const deliverdOrders = [...orders].filter((o) => o.isPaid && o.isDelivered);
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
      <Stack className={ordersBox}>
        {deliverdOrders.map((order) => (
          <DrawerOrderCard key={order._id} order={order} />
        ))}
      </Stack>
      <Button startIcon={<Restore color="success" />} color="success">
        مشاهده همه سفارش ها
      </Button>
    </Drawer>
  );
};

export default OrdersDrawer;

const useStyles = makeStyles({
  drawer: {
    width: "30%",
  },
  ordersBox: {
    margin: 10,
    borderRadius: 10,
    border: "1px #e3e3e4 solid",
  },
});
