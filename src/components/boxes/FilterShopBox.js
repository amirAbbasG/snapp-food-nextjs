import { memo } from "react";

import { Paper, Grid } from "@mui/material";

import { FilterItem } from "../";

const FilterShopBox = ({ setIsFreeExpress, isFreeExpress, haveCoupon, setHaveCoupon }) => {



  return (
    <Grid item sx={{width: "100%"}} p={2} component="aside">
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
