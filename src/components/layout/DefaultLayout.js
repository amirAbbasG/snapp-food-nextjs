
import {useRouter} from "next/router";

import { Grid } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import ProfileLayout from "./ProfileLayout"


const DefaultLayout = ({  children }) => {

    const router = useRouter()

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
            {
                router.pathname.includes("/profile") ? (
                    <ProfileLayout>
                        {children}
                    </ProfileLayout>
                ) : (
                    <>
                    {children}
                    </>
                )

            }
        </main>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default DefaultLayout;
