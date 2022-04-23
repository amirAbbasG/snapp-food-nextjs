import { memo } from "react";

import { Grid, Typography } from "@mui/material";

import { CategoryCard } from "../";


const RestaurantCategoriesBox = ({ categories }) => {
  const { root, item } = styles

  return (
    <section>
      <Typography mb={3} mr={"2%"} variant="h6" component="h1">
        دسته بندی ها
      </Typography>
      <Grid container rowSpacing={4} sx={root} component="nav">
        {categories.map((category, index) => (
          <Grid
            sx={item}
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={2.4}

          >
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </section>
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
