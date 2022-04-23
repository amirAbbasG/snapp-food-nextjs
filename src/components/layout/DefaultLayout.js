import {useState, useEffect} from "react";

import {useRouter} from "next/router";

import { LinearProgress } from "@mui/material";
import {Box} from "@mui/system"

import Header from "./Header";
import Footer from "./Footer";
import ProfileLayout from "./ProfileLayout"


const DefaultLayout = ({  children }) => {

    const router = useRouter()
    const [isRoting, setIsRouting] = useState(false)
    const isProfile = router.pathname.includes("/profile")

    useEffect(() => {
        router.events.on("routeChangeStart", () => setIsRouting(true))
        router.events.on("routeChangeError", () => setIsRouting(false))
        router.events.on("routeChangeComplete", () => setIsRouting(false))
    }, [router])


    const styles = {
        layout: {
            width: "100%",
            flex: "unset",
            minHeight: "100vh",
            flexFlow: "column nowrap",
        },
        main: (theme) => ({
            overflowX: "hidden",
            flexGrow: 1,
            width: "100%",
            maxWidth: "85.4rem",
            padding: "2.5rem",
            margin: "0px auto",
            [theme.breakpoints.down("sm")]: {
                padding: "1rem"
            }

        })
    }

    return (
    <Box sx={styles.layout}>
        {
            isRoting && (
                <LinearProgress/>
            )
        }
      <Header  shouldShowShopTypes={!isProfile}/>
      <Box
        sx={styles.main}
        component="main"
      >

            {
                isProfile ? (
                    <ProfileLayout>
                        {children}
                    </ProfileLayout>
                ) : (
                    <>
                    {children}
                    </>
                )

            }
      </Box>
        <Footer />
    </Box>
  );
};

export default DefaultLayout;
