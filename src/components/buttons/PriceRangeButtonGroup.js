import { useState, memo } from "react";

import { Button, ButtonGroup, Grid, Paper, Typography } from "@mui/material";

import { priceRanges } from "../../utils/values";

const PriceRangeButtonGroup = ({handleChange, activeRange}) => {


  const { root, buttonGroup } = styles;

  return (
    <Grid item sx={root} p={2}>
      <Paper sx={{ padding: 2 }}>
        <Typography color="GrayText">کلاس قیمتی</Typography>
        <ButtonGroup
          sx={buttonGroup}
          color="secondary"
          variant="contained"
        >
          {priceRanges.map((item, index) => (
          <Grid key={index}>
            <Button
                sx={{
                  width: "90%",
                  borderRadius: 2,
                  color: activeRange === item ? "#00B862" : "black",
                  backgroundColor: activeRange === item ? "white" : "#EBEDF0",
                }}
                onClick={() => {
                  handleChange(item);
                }}

            >
              {item.title}
            </Button>
          </Grid>
          ))}
        </ButtonGroup>
      </Paper>
    </Grid>
  );
};

export default memo(PriceRangeButtonGroup);

const styles = {
  root: {
    width: "100%",
  },
  buttonGroup: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    borderRadius: "10px",
    marginTop: "17px",
  },
};
