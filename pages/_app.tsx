import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head><script src="https://cdn.tailwindcss.com"></script></Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
