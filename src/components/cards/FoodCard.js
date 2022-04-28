import { memo, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, Typography } from "@mui/material";
import {Box} from "@mui/system"

import { FoodPriceBox, FoodOrderButtons } from "../";
import styles from "./styles/FoodCard.styles"


const FoodCard = ({ food, onClick }) => {


  const [imageUrl, setImageUrl] = useState(food.foodImage)

  const handleError = () => {
    setImageUrl("/images/food/8103658_food-icon.png")
  }

  const { root, img, actionBox, contentBox } = styles;

  return (
    <Card sx={root}  component="article">
      <Box width="100%">
        <Link href="#">
          <a onClick={(e) => {e.preventDefault(); onClick()}}>
            <Box sx={contentBox}>
              <CardContent
                sx={{ flexWrap: "wrap", padding: "10px 2px !important" }}
              >
                <Typography fontSize={16} fontWeight="bold" component="h2">
                  {food.name}
                </Typography>
                <Typography fontSize={11} color="GrayText" component="h4">
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
                  className="cardImg"
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

