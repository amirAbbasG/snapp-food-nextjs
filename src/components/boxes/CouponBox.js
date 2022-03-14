import React, { useContext } from "react";
import { Stack, Typography, ButtonBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Carousel from "react-elastic-carousel";
import { globalContext, shopsContext } from "../../Contexts";

const CouponBox = ({ shopId, coupons }) => {
  const { isLg, isMd, isSm, isXs } = useContext(globalContext);
  const { couponId, setCoupon } = useContext(shopsContext);
  let showCount = 4;

  if (isLg) {
    showCount = 4;
  } else if (isMd) {
    showCount = 3;
  } else if (isSm) {
    showCount = 2;
  } else if (isXs) {
    showCount = 1;
  }

  const { couponBox, root } = useStyles();

  return (
    <Stack className={root}>
      <Typography textAlign="center">کوپن ها</Typography>
      <Carousel
        itemsToShow={coupons.length < showCount ? coupons.length : showCount}
        isRTL
        pagination={false}
        itemsToScroll={coupons.length < showCount ? coupons.length : showCount}
        itemPadding={[9, 9, 9, 9]}
      >
        {coupons.map((coupon) => (
          <ButtonBase
            key={coupon._id}
            className={couponBox}
            onClick={() => setCoupon(coupon, shopId)}
            style={{
              borderColor: coupon._id === couponId && "#00B862",
            }}
          >
            <Typography>{coupon.description}</Typography>
            {coupon.discount > 0 && (
              <Typography mt={0.4}>{coupon.discount} %</Typography>
            )}
          </ButtonBase>
        ))}
      </Carousel>
    </Stack>
  );
};

export default CouponBox;

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "1px #e3e3e4 solid",
    padding: 10,
  },
  couponBox: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    padding: 7,
    marginTop: 10,
    width: "100%",
  },
}));
