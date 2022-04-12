import React from "react";

import Head from "next/head";

import {Provider} from "react-redux";
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
import GlobalContextProvider from "../src/contexts/global/GlobalContextProvider";
import AccountContextProvider from "../src/contexts/account/AccountContextProvider";
import {DefaultLayout} from "../src/components";
import storeConfig from "../src/recux/store"
import {combineProviders} from "../src/utils/combineProviders";

//styles
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css"


const store = storeConfig()

const clientSideEmotionCache = createEmotionCache();

function MyApp({
                   Component,
                   emotionCache = clientSideEmotionCache,
                   pageProps,
               }) {


    const Providers = combineProviders([
        GlobalContextProvider,
        AccountContextProvider,
        DefaultLayout
    ])


    return (


        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>

            <ErrorBoundary>
                <SWRConfig value={{fetcher: (url) => axios(url).then(res => res.data)}}>

                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <Provider store={store}>
                            <Providers>

                                <Component {...pageProps} />
                            </Providers>
                        </Provider>

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
