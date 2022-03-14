import React from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const DefaultLayout = ({
  showShopTypes = true,
  children,
  useDefaultOutlet = true,
}) => {
  return (
    <>
      <Header showShopTypes={showShopTypes} />
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
          {useDefaultOutlet ? <Outlet /> : children}
        </Grid>
        <Footer />
      </Grid>
    </>
  );
};

export default DefaultLayout;
