import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import {
  Grid,
  TextField,
  Box,
  CssBaseline,
  Avatar,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@horizon/components-react";
import { useAuth } from "../../store/authContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const initialState = {
    login: "",
    password: "",
    errorMsgLogin: "",
    errorMsgPassword: "",
  };
  const [state, setState] = useState(initialState);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setAuthTokens } = useAuth();
  const [executing, setExecuting] = useState(false);

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleSubmit = async () => {
    setExecuting(true);
    // console.log(state);
    // console.log("http://" + process.env.REACT_APP_API_URL + "/login_check");
    await axios
      .post("http://" + process.env.REACT_APP_API_URL + "/login_check", {
        username: state.login,
        password: state.password,
      })
      .then((result) => {
        if (result.status === 200) {
          setAuthTokens({ user: state.login, token: result.data });
          setLoggedIn(true);
        } else {
          setErrorMsg("Connexion refusée : " + result.data);
          console.log(result);
        }
      })
      .catch((e) => {
        setErrorMsg("Email ou mot de passe incorrect");
        console.log(e);
      });
    setExecuting(false);
  };

  if (isLoggedIn) {
    return <Redirect to="/admin" />;
  } else
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.container}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <div className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="Email"
              name="login"
              autoComplete="login"
              value={state.login}
              onChange={handleChange("login")}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              value={state.password}
              onChange={handleChange("password")}
              autoComplete="current-password"
            />
            <Grid item xs={12}>
              <b>{errorMsg !== "" && " ⚠️ " + errorMsg}</b>
            </Grid>
            <Button
              primary
              disabled={executing}
              size="large"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
              </Grid>
              <Grid item>
                {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
              </Grid>
            </Grid>
          </div>
        </div>
        <Box mt={8}>{/* <Copyright /> */}</Box>
        <Grid>
          <Link to="/">{"< Retour"}</Link>
        </Grid>
      </Container>
    );
}
