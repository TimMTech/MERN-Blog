import Layout from "../components/Layout"
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import "../styles/globals.css";


const MyApp = ({ Component, pageProps }) => {
  
  return (
    <Layout>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextNProgress color="red" height={3} showOnShallow={true}/>
      <Component {...pageProps} />
    </Layout>
  );
};



export default MyApp;
