import { useEffect, useState } from "react";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // at init only
  // refresh the page the styles are not loading because of SSR(Server side rendering)
  useEffect(() => {
    // remove css for server side rendering
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles); //remove SSR styles from DOM
    }
  }, []);

  return mounted ? (
    <StoreProvider>
      <Component {...pageProps} />;
    </StoreProvider>
  ) : null;
}

export default MyApp;
