import { Typography, Stack } from "@mui/material";
import { styled } from "@mui/styles";
import { separatePrice } from "../../utils/priceSeparator";

const Factor = ({ orderId, couponDiscount = 0 }) => {
  // const orders = useSelector((state) => state.orders);
  const orders = [];
  const order = orders.find((o) => o._id === orderId);

  const UnderLinedStack = styled(Stack)(({ theme }) => ({
    borderBottom: "1px solid",
    borderBottomColor: theme.palette.secondary.dark,
    display: "felx",
    flexDirection: "column",
  }));

  const PriceItem = ({ title, price }) => (
    <Stack
      py={1}
      sx={{
        display: "felx",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography>{title}</Typography>
      <Typography>{separatePrice(price)} تومان</Typography>
    </Stack>
  );

  return (
    <Stack p={2}>
      <UnderLinedStack mb={1}>
        <PriceItem title="مجموع " price={order.amount} />
        <PriceItem
          color="primary"
          title="سود شما از خرید"
          price={order.amount - order.amountByDiscount + couponDiscount}
        />
        <PriceItem title="هزینه ارسال" price={order.shopId.deliveryCost} />
      </UnderLinedStack>
      <PriceItem
        color="textSecondary"
        title="مبلغ قابل پرداخت"
        price={
          order.amountByDiscount + order.shopId.deliveryCost - couponDiscount
        }
      />
    </Stack>
  );
};

export default Factor;
