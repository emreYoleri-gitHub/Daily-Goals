import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../Redux/Actions/index";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        BloGozof
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem 0 0 0",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    height: "50px",
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { signUp, signIn } = bindActionCreators(userActions, dispatch);

  const [login, setLogin] = useState(false);
  const [remember, setRemember] = useState(true);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const { currentUser } = useSelector((state) => state.users);

  if (localStorage.getItem("user") || currentUser) {
    signIn(JSON.parse(localStorage.getItem("user")));
    console.log(JSON.parse(localStorage.getItem("user")));
    history.push("/");
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          {!login ? (
            <>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <form
                className={classes.form}
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  signIn(signInData);
                  history.push("/");
                }}
              >
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  autoFocus
                  color="secondary"
                  value={signInData.email}
                  onChange={(e) =>
                    setSignInData({ ...signInData, email: e.target.value })
                  }
                />
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  color="secondary"
                  value={signInData.password}
                  onChange={(e) =>
                    setSignInData({ ...signInData, password: e.target.value })
                  }
                />
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        color="secondary"
                      />
                    }
                    label="Remember me"
                  />
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form
                className={classes.form}
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  signUp(signUpData);
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      label="First Name"
                      color="secondary"
                      autoFocus
                      value={signUpData.name}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, name: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      label="Last Name"
                      color="secondary"
                      value={signUpData.surname}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          surname: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      label="Email Address"
                      color="secondary"
                      value={signUpData.email}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, email: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      color="secondary"
                      value={signUpData.password}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          password: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  color="secondary"
                >
                  Sign Up
                </Button>
              </form>
            </>
          )}

          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Sign In</Grid>
              <Grid item>
                <Switch
                  checked={login}
                  onChange={() => setLogin(!login)}
                  color="secondary"
                />
              </Grid>
              <Grid item>Sign Up</Grid>
            </Grid>
          </Typography>
          <Box mt={2}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignIn;
