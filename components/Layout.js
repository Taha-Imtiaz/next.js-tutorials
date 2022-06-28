import {
  AppBar,
  Container,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  Switch,
  Badge,
} from "@material-ui/core";
import NextLink from "next/link";
import Head from "next/head";
import React, { useContext } from "react";
import useStyles from "../utils/styles";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";

const Layout = ({ title, description, children }) => {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;
  // create material ui theme
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const changeDarkMode = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkModeValue = !darkMode;
    // save new darkMode value in cookie
    Cookies.set("darkMode", newDarkModeValue ? "ON" : "OFF");
  };
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : `Next Amazona`}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              {/* pass hreff from NextLink to Link */}
              <Link>
                <Typography className={classes.brand}>Amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch checked={darkMode} onChange={changeDarkMode}></Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge color="secondary" badgeContent={cart.cartItems.length}>Cart</Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All rights reserved.Next Amazona</Typography>
      </footer>
    </div>
  );
};

export default Layout;
