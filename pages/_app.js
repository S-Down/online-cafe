import Layout from "../components/Layout";
import "../styles/globals.css";
import { ParallaxProvider } from "react-scroll-parallax";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ParallaxProvider>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ParallaxProvider>
  );
}

export default MyApp;
