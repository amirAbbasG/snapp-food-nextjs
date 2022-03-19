import { useContext, memo } from "react";
import { Button, ButtonGroup, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { priceRanges } from "../../utils/values";

const PriceRangeButtonGroup = () => {
  // const { priceRange, setPriceRange } = useContext(shopsContext);
  const [priceRange, setPriceRange] = useState({
    title: "همه",
    minPrice: 0,
    maxPrice: 1000000,
  });

  const { root, buttonGroup } = useStyles();

  return (
    <Grid item className={root} p={2}>
      <Paper sx={{ padding: 2 }}>
        <Typography color="GrayText">کلاس قیمتی</Typography>
        <ButtonGroup
          className={buttonGroup}
          color="secondary"
          variant="contained"
        >
          {priceRanges.map((item, index) => (
            <Button
              style={{
                borderRadius: 10,
                color: priceRange === item ? "#00B862" : "black",
                backgroundColor: priceRange === item ? "white" : "#EBEDF0",
              }}
              onClick={() => {
                setPriceRange(item);
                console.log(item);
              }}
              key={index}
            >
              {item.title}
            </Button>
          ))}
        </ButtonGroup>
      </Paper>
    </Grid>
  );
};

export default memo(PriceRangeButtonGroup);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  buttonGroup: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    borderRadius: 10,
    marginTop: 17,
    backgroundColor: theme.palette.secondary.dark,
  },
}));
