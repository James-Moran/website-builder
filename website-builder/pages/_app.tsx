import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { UserProvider } from "../components/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Website Builder</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,600"
          rel="stylesheet"
        />
      </Head>
      <UserProvider inital={false}>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
