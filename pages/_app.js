import Head from "next/head";
import "../styles/style.scss";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
 
  return (
    <>
      <Head>
        <title>Bahrain Hospital</title>
        <meta name="description" content="Created by bahrein hospitals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
