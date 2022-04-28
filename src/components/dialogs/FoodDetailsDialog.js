import {useContext} from "react";
import Image from "next/image"

import { Grid, Typography, Container } from "@mui/material";

import {
  MyDialog,
  CommentBox,
  RateBox,
  FoodPriceBox,
  FoodOrderButtons,
} from "../";
import { calculateRate } from "../../utils/rateCalculator";
import {globalContext} from "../../contexts/global/globalContext";
import styles from "./styles/FoodDetailsDialog.styles"

const FoodDetailsDialog = ({ food, open, handleClose }) => {


  const rate = calculateRate(food.comments);
  const {isXs} = useContext(globalContext)

  const { img, detailBox } = styles;

  return (
    <MyDialog width={isXs ? "90%" : "70%"} onClose={handleClose} open={open}>
      <Grid container p={1}>
        <Grid item xs={12} lg={5} >
          <Grid sx={img}>
          <Image
              width={400}
              height={400}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcuHTiMQAGJQKP0kkd/QAAAABJRU5ErkJggg=="
            alt="food"
            src={`/images/food/${food.foodImage}`}
          />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7} sx={detailBox}>
          <Container sx={{ width: "100%", justifyContent: "space-between" }}>
            <Typography variant="h6" fontSize={{xs: "12px", sm: "17px"}}>{food.name}</Typography>
            <RateBox rate={rate === 0 ? "جدید" : rate} />
          </Container>
          <Typography my={3} color="GrayText">
            {" "}
            {food.description}
          </Typography>
          <Container
            sx={{
              width: "100%",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <FoodPriceBox price={food.price} discount={food.discount} />
            <FoodOrderButtons food={food} />
          </Container>
        </Grid>
      </Grid>
      <CommentBox comments={food.comments} id={food._id} />
    </MyDialog>
  );
};

export default FoodDetailsDialog;


