import {useState, useEffect} from "react";

import {useRouter} from "next/router";

import { Grid, LinearProgress } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import ProfileLayout from "./ProfileLayout"


const DefaultLayout = ({  children }) => {

    const router = useRouter()
    const [isRoting, setIsRouting] = useState(false)

    useEffect(() => {
        router.events.on("routeChangeStart", () => setIsRouting(true))
        router.events.on("routeChangeError", () => setIsRouting(false))
        router.events.on("routeChangeComplete", () => setIsRouting(false))
    }, [router])

    return (
    <Grid sx={{width: "100%", flex: 1}}>
        {
            isRoting && (
                <LinearProgress/>
            )
        }
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
