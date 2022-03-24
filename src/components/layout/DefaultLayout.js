import { Grid } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const DefaultLayout = ({  children }) => {
  return (
    <Grid sx={{width: "100%", flex: 1}}>
      <Header  />
      <Grid
        sx={{
          overflowX: "hidden",
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
            width: "100%",

        }}
      >
        <Grid
          sx={{
            maxWidth: "85.4rem",
            padding: "2.5rem",
            width: "100%",
          }}
        >
          {children}
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default DefaultLayout;
