import React, { useState } from "react";
import AppBar from "./components/AppBar";
import HomePage from "./components/HomePage";
import ErrorPage from "./components/ErrorPage";
import InterventionSelectType from "./components/Intervention/InterventionSelectType";
import CheckItemStart from "./components/Intervention/FicheCheckItem/CheckItemStart";
import InterventionStart from "./components/Intervention/FicheIntervention/InterventionStart";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Stack } from "@horizon/components-react";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./components/admin/pages/Login";
import InterfaceAdmin from "./components/admin/pages/AdminPage";
import CheckItemEnd from "./components/Intervention/FicheCheckItem/CheckItemSortie";
import InterventionEnd from "./components/Intervention/FicheIntervention/InterventionEnd";
import AdminDetailIntervention from "./components/admin/pages/DetailIntervention";
import AdminDetailCheckitem from "./components/admin/pages/DetailCheckitem";
import CheckitemListPage from "./components/admin/pages/CheckitemListPage";
import TestImage from "./TestImage";

import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./components/store/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "25px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

export default function AppRoot() {
  const classes = useStyles();

  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <>
      <AppBar />
      <div className={classes.root}>
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
          <Router>
            <Container fluid>
              <Stack spacing="4-x">
                <div></div>
                <Switch>
                  <Route key={0} exact path="/" component={HomePage} />
                  <Route
                    key={1}
                    exact
                    path="/type_intervention"
                    component={InterventionSelectType}
                  />
                  <Route
                    key={2}
                    exact
                    path="/checkitem"
                    component={CheckItemStart}
                  />
                  <Route
                    key={3}
                    exact
                    path="/checkitem/:id"
                    component={CheckItemEnd}
                  />
                  <Route
                    key={4}
                    exact
                    path="/intervention"
                    component={InterventionStart}
                  />
                  <Route
                    key={3}
                    exact
                    path="/intervention/:id"
                    component={InterventionEnd}
                  />
                  <Route
                    key={5}
                    exact
                    path="/nouvelle_perte"
                    component={HomePage}
                  />
                  <Route key={6} exact path="/login" component={Login} />

                  <PrivateRoute
                    exact
                    path="/admin"
                    component={InterfaceAdmin}
                  />
                  <PrivateRoute
                    path="/admin/interventions/:id"
                    component={AdminDetailIntervention}
                  />
                  <PrivateRoute
                    path="/admin/checkitems/:id"
                    component={AdminDetailCheckitem}
                  />
                  <PrivateRoute
                    path="/admin/checkitems"
                    component={CheckitemListPage}
                  />
                  {/* <Route key={11} exact path="/testimg" component={TestImage} /> */}
                  <Route key={999} component={ErrorPage} />
                </Switch>
              </Stack>
            </Container>
          </Router>
        </AuthContext.Provider>
      </div>
    </>
  );
}
