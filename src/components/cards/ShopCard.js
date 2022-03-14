import React, { memo } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { SportsMotorsports } from "@mui/icons-material";
import { separatePrice } from "../../utils/priceSeparator";
import { calculateRate } from "../../utils/rateCalculator";
import { RateBox } from "../";

const ShopCard = ({ shop }) => {
  const { root, contentBox, logo, deliveryBox } = useStyles();
  const cost = separatePrice(shop.deliveryCost);
  const rate = calculateRate(shop.comments);
  const navigate = useNavigate();

  return (
    <Card className={root} onClick={() => navigate(`/shopDetails/${shop._id}`)}>
      <CardMedia
        component="img"
        height="160"
        image={`http://localhost:4000/${shop.shopImage}`}
        alt="food shop"
      />
      <CardContent className={contentBox}>
        <img
          src={`http://localhost:4000/${shop.shopLogo}`}
          alt="shop logo"
          className={logo}
        />
        <Typography gutterBottom variant="h6" mt={1} component="div">
          {shop.shopName}
        </Typography>
        <Stack direction="row" alignItems="center">
          <RateBox rate={rate === 0 ? "جدید" : rate} />
          <Typography color="gray" mr={1}>
            ({shop.comments.length})
          </Typography>
        </Stack>
        <Typography color="gray" mt={1}>
          {shop.shopType} ، {shop.category}
        </Typography>
        <Paper className={deliveryBox}>
          <SportsMotorsports
            sx={{ color: "gray", fontSize: 17, marginLeft: 1 }}
          />
          <Typography color="gray" fontSize={12}>
            ارسال اکسپرس : {cost === 0 ? "رایگان" : `${cost} تومان`}
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default memo(ShopCard);

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    maxWidth: 350,
    width: "100%",
    "&:hover": {
      boxShadow: theme.shadows[3],
    },
  },
  contentBox: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  deliveryBox: {
    display: "flex",
    borderRadius: 20,
    padding: 10,
    marginTop: 7,
  },
  logo: {
    width: 80,
    height: 80,
    position: "absolute",
    top: 97,
    boxShadow: theme.shadows[3],
    borderRadius: 10,
  },
}));
