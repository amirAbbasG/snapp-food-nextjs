import { memo } from "react";
import {
  Avatar,
  Paper,
  Typography,
  Container,
  ButtonBase,
  Grid,
} from "@mui/material";


const CategoriesBox = ({ shopType }) => {
  const shopTypes = [];
  let type = shopTypes.find((s) => s.type === shopType);
  if (!type) {
    type = shopTypes.find((s) => s.type === "رستوران");
  }

  const categories = type.categories;

  const handlePressCategory = (category) => {
    // dispatch(filterShopByShopType(category));
  };

  const handlePressAllCategory = () => {
    // dispatch(filterShopByShopType(shopType));
  };

  const { root, img, titleBox, categoryItem } = styles;
  return (
    <Grid item sx={root} p={2}>
      <Paper sx={{ padding: 2 }}>
        <ButtonBase sx={{ width: "100%" }} onClick={handlePressAllCategory}>
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
              src={`http://192.168.43.209:4000/${category}.jpg`}
            />
            <Typography color="GrayText">{category}</Typography>
          </ButtonBase>
        ))}
      </Paper>
    </Grid>
  );
};

export default memo(CategoriesBox);

const styles = {
  root: {
    width: "100%",
  },
  img: {
    marginLeft: "14px",
    width: "34px",
    height: "34px",
    boxShadow: 2,
  },
  titleBox: {
    borderRadius: "10px",
    backgroundColor:" secondary.dark",
    padding: "1rem !important",
    fontSize: "17px",
    marginBottom: "17px",
    fontWeight: "bold",
  },

  categoryItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "14px",
  },
};
