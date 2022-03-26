import { memo } from "react";

import Link from "next/link";

import { Card, CardContent, CardMedia, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { FoodPriceBox, FoodOrderButtons } from "../";

const FoodCard = ({ food, onClick }) => {
  const { root, img, actionBox, contentBox } = useStyles();

  return (
    <Card className={root}>
      <Box width="100%">
        <Link href="#">
          <a onClick={onClick}>
            <Box className={contentBox}>
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
                className={img}
                image={`http://192.168.43.209:4000/${food.foodImage}`}
                alt="food"
              />
            </Box>
          </a>
        </Link>
        <Box className={actionBox}>
          <FoodPriceBox price={food.price} discount={food.discount} />
          <FoodOrderButtons foodId={food._id} />
        </Box>
      </Box>
    </Card>
  );
};

export default memo(FoodCard);

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
    maxWidth: 370,
    width: "100%",
    "&:hover": {
      boxShadow: theme.shadows[3],
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },

  img: {
    width: 110,
    height: 110,
    paadding: 12,
    boxShadow: theme.shadows[1],
    borderRadius: 10,
  },
  actionBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 14,
  },
  contentBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));
