import { useContext, memo, useState } from "react";
import { Paper, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FilterItem } from "../";

const FilterShopBox = () => {
  const { root } = useStyles();
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
    <Grid item className={root} p={2}>
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));
