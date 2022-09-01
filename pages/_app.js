import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../themes/theme";
import { GlobalStyles } from "../globalstyle/globalStyle";
import { SessionProvider } from "next-auth/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState("light");

  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
    localStorage.setItem(
      "theme",
      JSON.stringify(isDarkTheme ? "light" : "dark")
    );
  };

  useEffect(() => {
    const localStoredTheme = localStorage.getItem("theme");
    const mode = JSON.parse(localStoredTheme);
    if (mode === "dark") {
      setTheme("dark");
    }
    if (mode === "light") {
      setTheme("light");
    }
  }, [isDarkTheme]);

  return (
    <>
      <Head>
        <title>Eblog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextNProgress color="red" height={3} showOnShallow={true} />
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <GlobalStyles />
        <ToastContainer />
        <SessionProvider session={pageProps.session}>
          <Nav toggleTheme={toggleTheme} isDark={isDarkTheme} />
          <Component {...pageProps} />
          <Footer />
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
