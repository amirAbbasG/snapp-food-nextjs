import { useContext, useState } from "react";

import { Stack, Typography, ButtonBase } from "@mui/material";
import Carousel from "react-elastic-carousel";
import {useDispatch, useSelector} from "react-redux";

import { globalContext } from "../../contexts/global/globalContext";
import {errorMessage} from "../../lib/toast";
import {getOrders} from "../../recux/actions/orders";
import {setCouponApi} from "../../services/orderServices";

const CouponBox = ({ shopId, coupons }) => {
  const dispatch = useDispatch();

  const [couponId, setCouponId] = useState();
  const { isLg, isMd, isSm, isXs } = useContext(globalContext);

  const account = useSelector((state) => state.account);


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

  //#region use coupon
  const setCoupon = async (coupon) => {
    if (coupon.usersUsed && coupon.usersUsed.includes(account._id)) {
      errorMessage("قبلا از این کوپن استفاده کرده اید");
    } else {
      try {
        const { status } = await setCouponApi(shopId, coupon._id);
        if (status === 200) {
          setCouponId(coupon._id);
          dispatch(getOrders());
        }
      } catch (error) {
        errorMessage(error.response.data.message);
      }
    }
  };
  //#endregion

  const { couponBox, root } = styles;

  return (
    <Stack sx={root}>
      <Typography textAlign="center" component="h2">کوپن ها</Typography>
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
            sx={{...couponBox, borderColor: coupon._id === couponId ? "#00B862" : "secondary.dark"}}
            onClick={() => setCoupon(coupon)}
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
    backgroundColor: "secondary.main",
    borderRadius: "10px",
    padding: "7px",
    marginTop: "10px",
    width: "100%",
  },
};
