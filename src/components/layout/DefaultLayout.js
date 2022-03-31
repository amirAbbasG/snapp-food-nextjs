import {useEffect, useContext} from "react";

import { Grid } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import {accountContext} from "../../contexts/account/accountContext";

const DefaultLayout = ({  children }) => {

    const {checkToken} = useContext(accountContext)

    useEffect(() => {
        checkToken()
    }, [])

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
        <main
          style={{
            maxWidth: "85.4rem",
            padding: "2.5rem",
            width: "100%",
          }}
        >
          {children}
        </main>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default DefaultLayout;
