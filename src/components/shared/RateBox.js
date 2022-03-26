import { Stack, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

const RateBox = ({ rate = 2.3, fontSize, ...props }) => {
  const { root, icon } = styles;
  return (
    <Stack sx={root}>
      <Typography color="textSecondary" fontSize={fontSize || 11}>
        {rate}
      </Typography>
      <Star sx={icon} />
    </Stack>
  );
};

export default RateBox;

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    width: "3rem",
    height: "1.4rem",
    justifyContent: "center",
    backgroundColor: "#eafcf4",
    borderRadius: "px",
  },
  icon: {
    fontSize: "13px",
    marginRight: "3px",
    color: "text.secondary"
  },
};
