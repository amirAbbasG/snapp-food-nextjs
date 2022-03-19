import Head from "next/head";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import ErrrorBoundary from "../src/components";
import theme from "../src/theme";
import createEmotionCache from "../src/theme/createEmotionCache";
import { GlobalContextProvider } from "../src/contexts";
import { DefaultLayout } from "../src/components";
import { getShopTypesApi } from "../src/services/shopServices";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

export async function getStaticProps() {
  const {
    data: { shopTypes },
  } = await getShopTypesApi();
  return {
    props: {
      shopTypes,
    },
  };
}

function MyApp({
  shopTypes,
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrrorBoundary>
          <GlobalContextProvider>
            <DefaultLayout shopTypes={shopTypes}>
              <Component {...pageProps} />
            </DefaultLayout>
          </GlobalContextProvider>
        </ErrrorBoundary>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
