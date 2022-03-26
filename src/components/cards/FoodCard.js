import { memo } from "react";

import Link from "next/link";
import Image from "next/image"

import { Card, CardContent, CardMedia, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { FoodPriceBox, FoodOrderButtons } from "../";

const FoodCard = ({ food, onClick }) => {
  const { root, img, actionBox, contentBox } = styles;

  return (
    <Card sx={root}>
      <Box width="100%">
        <Link href="#">
          <a onClick={onClick}>
            <Box sx={contentBox}>
              <CardContent
                sx={{ flexWrap: "wrap", padding: "10px 2px !important" }}
              >
                <Typography fontSize={16} fontWeight="bold">
                  {food.name}
                </Typography>
                <Typography fontSize={11} color="GrayText">
                  {food.description}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={img}
                image={`/images/foods/${food.foodImage}`}
                alt="food"
              />
            </Box>
          </a>
        </Link>
        <Box sx={actionBox}>
          <FoodPriceBox price={food.price} discount={food.discount} />
          <FoodOrderButtons foodId={food._id} />
        </Box>
      </Box>
    </Card>
  );
};

export default memo(FoodCard);

const styles = {
  root: {
    cursor: "pointer",
    maxWidth: "370px",
    width: "100%",
    "&:hover": {
      boxShadow: 3,
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px",
  },

  img: {
    height: "110px",
    width: "110px",
    padding: "12px",
    boxShadow: 1,
    borderRadius: "10px",
    overflow: "hidden"
  },
  actionBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: "14px",
  },
  contentBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};
