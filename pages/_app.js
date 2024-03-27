import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
// import { useState, useEffect } from "react";

const GlobalStyles = createGlobalStyle`

  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
