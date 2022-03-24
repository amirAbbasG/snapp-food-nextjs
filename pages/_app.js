import React from "react";

import Head from "next/head";

import PropTypes from "prop-types";
import {CacheProvider} from "@emotion/react";
import {ToastContainer} from "react-toastify";
import axios from "axios";
import {ThemeProvider, CssBaseline} from "@mui/material";
import {SWRConfig} from 'swr'

import ErrorBoundary from "../src/components/layout/ErrorBoundary";
import theme from "../styles/theme";
import createEmotionCache from "../src/utils/createEmotionCache";
import {GlobalContextProvider} from "../src/contexts";
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
            <ThemeProvider theme={theme}>

                <ErrorBoundary>
                    <SWRConfig value={{fetcher: (url) => axios(url).then(res => res.data)}}>
                        <CssBaseline/>

                        <GlobalContextProvider>
                            <DefaultLayout>
                                <Component {...pageProps} />
                            </DefaultLayout>
                        </GlobalContextProvider>
                    </SWRConfig>
                </ErrorBoundary>
                <ToastContainer/>

            </ThemeProvider>
        </CacheProvider>
    );
}

export default MyApp;

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
