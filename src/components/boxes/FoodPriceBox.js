import { Typography, Container, Stack } from "@mui/material";

import { separatePrice } from "../../utils/priceSeparator";

const FoodPriceBox = ({ discount, price }) => {
  const { discountBox, firstPrice } = styles;
  return (
    <>
      {discount === 0 ? (
        <Typography>{separatePrice(price)} تومان</Typography>
      ) : (
        <Container>
          <Stack sx={discountBox}>
            <Typography fontSize={10} color="primary">
              {discount} %
            </Typography>
          </Stack>
          <Stack>
            <Typography sx={firstPrice} fontSize={10}>
              {separatePrice(price)}
            </Typography>
            <Typography fontSize={10}>
              {separatePrice(price - (price * discount) / 100)}
              تومان
            </Typography>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default FoodPriceBox;

const styles ={
  discountBox: {
    border: "1px #F700A2 solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    padding: "7px",
    marginLeft: "5px",
  },
  firstPrice: {
    color: "#808080",
    textDecorationLine: "line-through",
    textDecorationColor: "#808080",
  },
};
