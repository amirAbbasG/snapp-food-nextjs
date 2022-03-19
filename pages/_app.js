import Head from "next/head";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import ErrrorBoundary from "../src/components";
import theme from "../src/theme";
import createEmotionCache from "../src/theme/createEmotionCache";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
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
          <Component {...pageProps} />
        </ErrrorBoundary>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
