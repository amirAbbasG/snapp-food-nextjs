import React from "react";
import { Typography, Container, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { separatePrice } from "../../utils/priceSeparator";

const FoodPriceBox = ({ discount, price }) => {
  const { discountBox, firstPrice } = useStyles();
  return (
    <>
      {discount === 0 ? (
        <Typography>{separatePrice(price)} تومان</Typography>
      ) : (
        <Container>
          <Stack className={discountBox}>
            <Typography fontSize={10} color="primary">
              {discount} %
            </Typography>
          </Stack>
          <Stack>
            <Typography className={firstPrice} fontSize={10}>
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

const useStyles = makeStyles({
  discountBox: {
    border: "1px #F700A2 solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 7,
    marginLeft: 5,
  },
  firstPrice: {
    color: "#808080",
    textDecorationLine: "line-through",
    textDecorationColor: "#808080",
  },
});
