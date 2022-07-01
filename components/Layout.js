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
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import NextLink from "next/link";
import Head from "next/head";
import React, { useContext, useState } from "react";
import useStyles from "../utils/styles";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Layout = ({ title, description, children }) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null);
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;

  // create material ui theme
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem !important",
        fontWeight: "400 !important",
        margin: "1rem 0 !important",
      },
      h2: {
        fontSize: "1.4rem !important",
        fontWeight: "400 !important",
        margin: "1rem 0 !important",
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
  const loginHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginClose = () => {
    setAnchorEl(null);
  };
  const logout = () =>{
    setAnchorEl(null)
    dispatch({type:"USER_LOGOUT"})
    Cookies.remove("userInfo")
    Cookies.remove("cartItems")
    router.push("/")
  }
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
                    <Badge
                      color="secondary"
                      overlap="rectangular"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginClose}
                  
                  >
                    <MenuItem onClick={loginClose}>Profile</MenuItem>
                    <MenuItem onClick={loginClose}>My account</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
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
