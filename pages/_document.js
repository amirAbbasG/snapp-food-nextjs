import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "../src/utils/createEmotionCache";
import theme from "../styles/theme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fa">
        <Head>
          <link
            rel="preload"
            href="/fonts/irsans.ttf"
            as="font"
            crossOrigin="anonymous"
          ></link>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="favicon.ico" />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {

  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) =>
            function EnhanceApp(props) {
              return <App emotionCache={cache} {...props} />;
            },
      });

  const initialProps = await Document.getInitialProps(ctx);
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          key={style.key}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: style.css }}
      />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
