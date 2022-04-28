import { memo } from "react";

import {useRouter} from "next/router"

import {
  Avatar,
  Paper,
  Typography,
  Container,
  ButtonBase,
  Grid,
} from "@mui/material";

import styles from "./styles/CategoriesBox.styles"


const CategoriesBox = ({ shopType }) => {

  const {categories} = shopType

  const router = useRouter()

  const handlePressCategory = (category) => {
      router.push(`/shops?filter=category&category=${category}`)
  };

  const handlePressAllCategory = () => {
    router.push(`/shops?filter=category&category=${shopType.type}`)
  };

  const { root, img, titleBox, categoryItem } = styles;

  return (
    <Grid item sx={root} p={2} component="aside">
      <Paper sx={{ padding: 2 }}>
        <ButtonBase sx={{ width: "100%", borderRadius: "10px" }} onClick={handlePressAllCategory}>
          <Container sx={titleBox}>همه دسته بندی ها</Container>
        </ButtonBase>
        {categories.map((category, index) => (
          <ButtonBase
            key={index}
            sx={categoryItem}
            onClick={() => handlePressCategory(category)}
          >
            <Avatar
              alt="food category"
              sx={img}
              src={`/images/categories/${category.replace(
                  " ",
                  "-"
              )}.jpg`}
            />
            <Typography color="GrayText">{category}</Typography>
          </ButtonBase>
        ))}
      </Paper>
    </Grid>
  );
};

export default memo(CategoriesBox);


