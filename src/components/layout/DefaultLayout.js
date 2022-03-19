import { Grid } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const DefaultLayout = ({ shopTypes, children, useDefaultOutlet = true }) => {
  return (
    <>
      <Header shopTypes={shopTypes} />
      <Grid
        style={{
          overflowX: "hidden",
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
    </>
  );
};

export default DefaultLayout;
