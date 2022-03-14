import React, { useContext, memo } from "react";
import { Paper, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { shopsContext } from "../../Contexts";
import { FilterItem } from "../";

const FilterShopBox = () => {
  const { root } = useStyles();

  const { setIsFreeExpress, isFreeExpress, haveCoupon, setHaveCoupon } =
    useContext(shopsContext);

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
