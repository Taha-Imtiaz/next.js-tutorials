import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import axios from "axios";
import router, { useRouter } from "next/router";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()
  const router = useRouter();
  const { redirect } = router.query; //login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);
  const classes = useStyles();

  const onSubmit = async ({ email, password }) => {
    // closeSnackbar
    closeSnackbar()
    try {
      const { data } = await axios.post(`/api/users/login`, {
        email,
        password,
      });
      console.log("🚀 ~ file: login.js ~ line 38 ~ onSubmit ~ data", data);
      // save data in react context
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });
      // save data in cookie
      Cookies.set("userInfo", JSON.stringify(data));
      router.push(redirect || "/");
    } catch (error) {
      // show snackbar on screen
      enqueueSnackbar(error.response.data ? error.response.data.message : error.message,{variant:"error"})
    }
  };
  return (
    <Layout title="Login">
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not Valid"
                        : "Email is Required"
                      : ""
                  }
                  // onChange={(e) => setEmail(e.target.value)}
                  {...field}
                />
              )}
            ></Controller>
          </ListItem>
          <ListItem>
          <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength:6
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password Length is more than 5"
                        : "Password is Required"
                      : ""
                  }
                  // onChange={(e) => setEmail(e.target.value)}
                  {...field}
                />
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account &nbsp;{" "}
            <NextLink href={`/register?redirect=${redirect || "/"}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Login;
