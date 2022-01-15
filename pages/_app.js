import { Provider } from "react-redux";
import store from "@store/index";
import Layout from "@components/Layout";
import { saveState } from "@utils/localStorage";
import { debounce } from "debounce";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "@utils/createEmotionCache";
import theme from "@styles/theme";
import { CacheProvider } from "@emotion/react";
import { TOKEN_ID } from "@common/constants";
import { useRouter } from "next/router";
import i18n from "@locales/i18n";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { locale } = useRouter();
  i18n.changeLanguage(locale).then(() => {
    console.log("locale changed");
  });
  store.subscribe(
    // we use debounce to save the state once each 800ms
    // for better performances in case multiple changes occur in a short time
    debounce(() => {
      saveState(TOKEN_ID, store.getState());
    }, 800)
  );

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
