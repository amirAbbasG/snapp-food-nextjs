import { useContext, useState } from "react";

import { Stack, Typography, ButtonBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Carousel from "react-elastic-carousel";

import { globalContext } from "../../contexts/global/globalContext";

const CouponBox = ({ shopId, coupons }) => {
  const [couponId, setCouponId] = useState();
  const { isLg, isMd, isSm, isXs } = useContext(globalContext);
  // const { couponId, setCoupon } = useContext(shopsContext);

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

  const { couponBox, root } = styles;

  return (
    <Stack sx={root}>
      <Typography textAlign="center">کوپن ها</Typography>
      <Carousel
        itemsToShow={coupons.length < showCount ? coupons.length : showCount}
        isRTL
        pagination={false}
        itemsToScroll={coupons.length < showCount ? coupons.length : showCount}
        itemPadding={[9, 9, 9, 9]}
      >
        {coupons.map((coupon, index) => (
          <ButtonBase
            key={coupon._id + index}
            sx={couponBox}
            onClick={() => setCouponId(coupon._id)}
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

const styles = {
  root: {
    borderBottom: "1px #e3e3e4 solid",
    padding: "10px",
  },
  couponBox: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    border: "1px solid",
    borderColor: "secondary.dark",
    backgroundColor: "secondary.main",
    borderRadius: "10px",
    padding: "7px",
    marginTop: "10px",
    width: "100%",
  },
};
