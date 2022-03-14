import React from "react";
import { Grid, Typography, Card } from "@mui/material";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const CategoryCard = ({ category }) => {
  const { titleGrid, root, title } = useStyles();

  return (
    <Link to={`/shops/${category}`} state={{ data: false }}>
      <Card
        elevation={2}
        className={root}
        style={{
          backgroundImage: `url(http://localhost:4000/${category.replace(
            " ",
            "-"
          )}.jpg)`,
        }}
      >
        <Grid container spacing={2} className={titleGrid}>
          <Typography className={title}>{category}</Typography>
          <KeyboardArrowLeft color="primary" />
        </Grid>
      </Card>
    </Link>
  );
};

export default CategoryCard;

const useStyles = makeStyles({
  titleGrid: {
    backgroundColor: "#FFFFFF",
    width: "auto",
    borderTopLeftRadius: 10,
    alignItems: "center",
    paddingRight: 3,
  },
  root: {
    width: "11rem",
    height: "6rem",
    borderRadius: 10,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    cursor: "pointer",
  },
  title: {
    "&:hover": {
      marginLeft: "4px",
    },
    margin: "3px 8px 3px 0",
  },
});
