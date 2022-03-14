import React from "react";
import { Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Star } from "@mui/icons-material";

const RateBox = ({ rate = 2.3, fontSize, ...props }) => {
  const { root, icon } = useStyles(props);
  return (
    <Stack className={root}>
      <Typography color="textSecondary" fontSize={fontSize || 11}>
        {rate}
      </Typography>
      <Star className={icon} />
    </Stack>
  );
};

export default RateBox;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    width: "3rem",
    height: "1.4rem",
    justifyContent: "center",
    backgroundColor: (props) => props.backgroundColor || "#eafcf4",
    borderRadius: 10,
  },
  icon: {
    fontSize: 13,
    marginRight: "3px",
    color: (props) => props.color || theme.palette.text.secondary,
  },
}));
