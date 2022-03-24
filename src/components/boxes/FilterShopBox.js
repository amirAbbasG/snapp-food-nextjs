import { useContext, memo, useState } from "react";
import { Paper, Grid } from "@mui/material";
import { FilterItem } from "../";

const FilterShopBox = () => {

  const [priceRange, setPriceRange] = useState({
    title: "همه",
    minPrice: 0,
    maxPrice: 1000000,
  });
  const [isFreeExpress, setIsFreeExpress] = useState(false);
  const [haveCoupon, setHaveCoupon] = useState(false);

  // const { setIsFreeExpress, isFreeExpress, haveCoupon, setHaveCoupon } =
  //   useContext(shopsContext);

  return (
    <Grid item sx={{width: "100%"}} p={2}>
      <Paper sx={{ padding: 2 }}>
        <FilterItem
          title="دارای کوپن"
          value={haveCoupon}
          onToggle={() => setHaveCoupon(!haveCoupon)}
        />
        <FilterItem
          title="ارسال رایگان"
          value={isFreeExpress}
          onToggle={() => setIsFreeExpress(!isFreeExpress)}
        />
      </Paper>
    </Grid>
  );
};

export default memo(FilterShopBox);
