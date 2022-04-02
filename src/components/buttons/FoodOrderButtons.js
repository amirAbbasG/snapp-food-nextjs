import { Box, Button, Typography } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

import { ActionButton } from "../";
import { isEmpty } from "lodash";
import { errorMessage } from "../../utils/toast";
import {addToCart} from "../../recux/actions/orders";

const FoodOrderButtons = ({ food }) => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders);
  const account = useSelector((state) => state.account);



  const shopOrders = orders.find(
    (o) => o.shopId._id === food.shopId && !o.isPaid
  );

  let foodCountInOrder = 0;
  if (shopOrders) {
    const foodInOrder = shopOrders.foods.find((f) => f._id === food._id);

    if (foodInOrder) {
      foodCountInOrder = foodInOrder.count;
    }
  }

  const handleMinus = () => {
    // if (foodCountInOrder !== 0) {
    //   if (shopOrders.foods.length < 2 && shopOrders.foods[0].count < 2) {
    //     dispatch(removeCart(shopOrders._id));
    //   } else {
    //     dispatch(removeFoodFromCart(foodId));
    //   }
    // }
  };

  const handleAdd = () => {
    if (isEmpty(account)) {
      errorMessage("برای افزودن به سبد خرید وارد حسابد کاربری خود شوید");
    } else {
      dispatch(addToCart(food._id));
    }
  };

  const { orderButtonBox, button } = styles;

  return (
    <>
      {foodCountInOrder > 0 ? (
        <Box sx={orderButtonBox}>
          <ActionButton icon="-" onClick={handleMinus} />
          <Typography fontSize={10}>{foodCountInOrder}</Typography>
          <ActionButton icon="+" onClick={handleAdd} />
        </Box>
      ) : (
        <Button onClick={handleAdd} sx={button}>
          افزودن
        </Button>
      )}
    </>
  );
};

export default FoodOrderButtons;

const styles = {
  button: {
    padding: "0.4rem 2rem",
    borderRadius: 20,
    boxShadow: 2,
  },
  orderButtonBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
};
