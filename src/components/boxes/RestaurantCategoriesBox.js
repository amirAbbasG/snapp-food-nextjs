import { memo } from "react";

import { Grid, Typography } from "@mui/material";

import { CategoryCard } from "../";


const RestaurantCategoriesBox = ({ categories }) => {
  const { root, item } = styles

  return (
    <>
      <Typography mb={3} mr={"2%"} variant="h6" component="h1">
        دسته بندی ها
      </Typography>
      <Grid container rowSpacing={4} columns={10} sx={root}>
        {categories.map((category, index) => (
          <Grid
            sx={item}
            item
            key={index}
            lg={2}
            md={3.33}
            sm={5}
            xs={5}
          >
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default memo(RestaurantCategoriesBox);

const styles = {
  root: {
    width: "100%",
    marginBottom: "4rem",
    alignContent: "center",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
