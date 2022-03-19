import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ActionButton } from "../";
import { isEmpty } from "lodash";
import { errorMessage } from "../../utils/toast";

const FoodOrderButtons = ({ foodId }) => {
  // const dispatch = useDispatch();

  // const shopDetails = useSelector((state) => state.shopDetails);
  // const orders = useSelector((state) => state.orders);
  // const account = useSelector((state) => state.account);
  // const food = shopDetails.foods.find((f) => f._id === foodId);

  const orders = [];

  const shopOrders = orders.find(
    (o) => o.shopId._id === food.shopId && !o.isPaid
  );
  let foodCountInOrder = 0;
  if (shopOrders) {
    const foodInOrder = shopOrders.foods.find((f) => f._id === foodId);
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
    // if (isEmpty(account)) {
    //   errorMessage("برای افزودن به سبد خرید وارد حسابد کاربری خود شوید");
    // } else {
    //   dispatch(addToCart(foodId));
    // }
  };

  const { orderButtonBox, button } = useStyles();

  return (
    <>
      {foodCountInOrder > 0 ? (
        <Box className={orderButtonBox}>
          <ActionButton icon="-" onClick={handleMinus} />
          <Typography fontSize={10}>{foodCountInOrder}</Typography>
          <ActionButton icon="+" onClick={handleAdd} />
        </Box>
      ) : (
        <Button onClick={handleAdd} className={button}>
          افزودن
        </Button>
      )}
    </>
  );
};

export default FoodOrderButtons;

const useStyles = makeStyles((theme) => ({
  button: {
    padding: "0.4rem 2rem",
    borderRadius: 20,
    boxShadow: theme.shadows[2],
  },
  orderButtonBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
}));
