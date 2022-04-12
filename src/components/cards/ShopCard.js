import { memo } from "react";

import { useRouter } from "next/router";
import Image from "next/image"


import {
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { SportsMotorsports } from "@mui/icons-material";

import { separatePrice } from "../../utils/priceSeparator";
import { calculateRate } from "../../utils/rateCalculator";
import { RateBox } from "../";

const ShopCard = ({ shop }) => {


  const cost = separatePrice(shop.deliveryCost);
  const rate = calculateRate(shop.comments);
  const router = useRouter();


  const { root, contentBox, logo, deliveryBox } = styles;

  return (
    <Card sx={root} onClick={() => router.push(`/shops/${shop._id}`, null, {scroll: false})}>
      <Stack sx={{width: "100%", position:"relative", height: "160px"}}>
        <Image
            src={`/images/shop/${shop.shopImage}`}
            layout="fill"
            placeholder="blur"
            className="cardImg"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcuHTiMQAGJQKP0kkd/QAAAABJRU5ErkJggg=="
            alt="shop image"
        />
      </Stack>

      <CardContent sx={contentBox}>
        <Stack sx={logo}>

        <Image
            height={75}
            width={75}
          src={`/images/logo/${shop.shopLogo}`}
          alt="shop logo"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcuHTiMQAGJQKP0kkd/QAAAABJRU5ErkJggg=="
        />
        </Stack>
        <Typography gutterBottom variant="h6" mt={1} component="h1">
          {shop.shopName}
        </Typography>
        <Stack direction="row" alignItems="center">
          <RateBox rate={rate === 0 ? "جدید" : rate} />
          <Typography color="gray" mr={1} component="h3">
            ({shop.comments.length})
          </Typography>
        </Stack>
        <Typography color="gray" mt={1}>
          {shop.shopType} ، {shop.category}
        </Typography>
        <Paper sx={deliveryBox}>
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

const styles = {
  root: {
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    maxWidth: "350px",
    width: "100%",
    '&:hover': {
      boxShadow: 3,
    },
  },
  contentBox: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  deliveryBox: {
    display: "flex",
    borderRadius: "20px",
    padding: "10px",
    marginTop: "7px",
  },
  logo: {
    position: "absolute",
    boxShadow: 3,
    borderRadius: "10px",
    overflow: "hidden",
    top: "100px"
  },
};

