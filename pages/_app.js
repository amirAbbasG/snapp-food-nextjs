import React from "react";

import Head from "next/head";

import PropTypes from "prop-types";
import {CacheProvider} from "@emotion/react";
import {ToastContainer} from "react-toastify";
import axios from "axios";
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles"
import {SWRConfig} from 'swr'

import ErrorBoundary from "../src/components/layout/ErrorBoundary";
import theme from "../styles/theme";
import createEmotionCache from "../src/utils/createEmotionCache";
import GlobalContextProvider from "../src/contexts/GlobalContextProvider";
import {DefaultLayout} from "../src/components";
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
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>

            <ErrorBoundary>
                <SWRConfig value={{fetcher: (url) => axios(url).then(res => res.data)}}>

                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <GlobalContextProvider>
                            <DefaultLayout>
                                <Component {...pageProps} />
                            </DefaultLayout>
                        </GlobalContextProvider>

                        <ToastContainer/>
                    </ThemeProvider>
                </SWRConfig>
            </ErrorBoundary>
        </CacheProvider>
    );
}

export default MyApp;

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
