import { memo, useState } from "react";

import Link from "next/link";

import { Card, CardContent, Typography } from "@mui/material";
import {Box} from "@mui/system"

import { FoodPriceBox, FoodOrderButtons } from "../";
import Image from "next/image";

const FoodCard = ({ food, onClick }) => {


  const [imageUrl, setImageUrl] = useState(food.foodImage)

  const handleError = () => {
    setImageUrl("/images/food/8103658_food-icon.png")
  }

  const { root, img, actionBox, contentBox } = styles;

  return (
    <Card sx={root}>
      <Box width="100%">
        <Link href="#">
          <a onClick={(e) => {e.preventDefault(); onClick()}}>
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
              <Box sx={img} >
              <Image
                  src={`/images/food/${imageUrl}`}
                  onError={handleError}
                  width={94}
                  height={94}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcuHTiMQAGJQKP0kkd/QAAAABJRU5ErkJggg=="
                  alt="food"
              />
              </Box>
            </Box>
          </a>
        </Link>
        <Box sx={actionBox}>
          <FoodPriceBox price={food.price} discount={food.discount} />
          <FoodOrderButtons food={food} />
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
