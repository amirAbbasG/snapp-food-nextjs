import { styled } from "@mui/system";
import { Typography, Stack, Container } from "@mui/material";
import {useSelector} from "react-redux";

import { MyDialog } from "../";
import { separatePrice } from "../../utils/priceSeparator";

const FactorDialog = ({ open, handleClose, orderId }) => {

  const orders = useSelector((state) => state.orders);
  const order = orders.find((o) => o._id === orderId);

  const PriceItem = ({ title, price, color }) => (
    <Container sx={{
      justifyContent: "space-between",
      padding: "7px !important",
    }}>
      <Typography color={color && color}>{title}</Typography>
      <Typography color={color && color}>
        {separatePrice(price)} تومان
      </Typography>
    </Container>
  );

  const BStack = styled(Stack)({
    borderBottom: "1px #e3e3e4 solid",
  });

  return (
    <MyDialog
      open={open}
      onClose={handleClose}
      title="فاکتور سفارش"
      width="40%"
    >
      <BStack spacing={1}>
        {order.foods.map((f) => (
          <PriceItem
            key={f._id}
            title={`${f.name} (${f.count})`}
            price={f.price}
          />
        ))}
      </BStack>
      <BStack spacing={1}>
        <PriceItem title="مجموع سفارش" price={order.amount} />
        <PriceItem
          color="primary"
          title="تخفیف"
          price={order.amount - order.amountByDiscount}
        />
        <PriceItem title="هزینه ارسال" price={order.shopId.deliveryCost} />
      </BStack>
      <PriceItem
        color="textSecondary"
        title="جمع کل"
        price={order.amountByDiscount + order.shopId.deliveryCost}
      />
    </MyDialog>
  );
};

export default FactorDialog;

