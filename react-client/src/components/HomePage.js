import React, { useState, useEffect, useContext } from "react";
import {
  Title,
  Button,
  Stack,
  CardContent,
  Card,
} from "@horizon/components-react";
import { Loading } from "@horizon/components-react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Grid, Box, Chip, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { storeIntervention } from "./store/storeIntervention";
import axios from "../axios";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  chip: {
    alignItems: "right",
  },
}));

export default function HomePage() {
  const classes = useStyles();

  const interventionStore = useContext(storeIntervention);
  const { dispatch } = interventionStore;
  const store = interventionStore.state;

  const [state, setState] = useState({
    checkitemLoading: true,
    interventionLoading: true,
    checkitemErrors: null,
    interventionErrors: null,
    interventionList: [],
    checkitemList: [],
  });

  useEffect(() => {
    dispatch({ type: "clearState" });
    getChekitemList();
    getInterventionList();
  }, []);

  const getChekitemList = async () => {
    await axios
      .get("/checkitems?isClosed=false&?zone=%2Fapi%2Fzones%2F1")
      .then((res) =>
        setState((prevState) => ({
          ...prevState, // keep all other key-value pairs
          checkitemList: res.data["hydra:member"],
          checkitemLoading: false, // update the value of specific key
        }))
      )
      .catch((err) =>
        setState((prevState) => ({
          ...prevState,
          checkitemLoading: false,
          checkitemErrors: err,
        }))
      );
  };

  const getInterventionList = async () => {
    await axios
      .get("/interventions?isClosed=false&?zone=%2Fapi%2Fzones%2F1")
      .then((res) =>
        setState((prevState) => ({
          ...prevState, // keep all other key-value pairs
          interventionList: res.data["hydra:member"],
          interventionLoading: false, // update the value of specific key
        }))
      )
      .catch((err) =>
        setState((prevState) => ({
          ...prevState,
          interventionLoading: false,
          interventionErrors: err,
        }))
      );
  };

  return (
    <Container component="main" maxWidth="md" className={classes.container}>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid container item xs={12}>
          <Grid item xs={12} sm={7}>
            <Grid item xs={12} className={classes.paper}>
              <Title tag="h3">S'identifier pour intervention</Title>
              <Title tag="h5">
                Veuillez vous identifier afin de créer une session intervention
                et opérer sur la zone FOD
              </Title>
              <Link to="/type_intervention" style={{ textDecoration: "none" }}>
                <Button primary size="large">
                  Entrer en zone
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12} className={classes.paper}>
              <Title tag="h3">Responsable de zone et Qualité</Title>
              <Title tag="h5">
                Veuillez vous connecter pour accèder aux informations de suivi
                des interventions
              </Title>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button size="large">S'identifier</Button>
              </Link>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={5} className={classes.paper}>
            <Title tag="h3">Sessions ouvertes</Title>
            <Stack spacing="2-x">
              <Title tag="h5">Liste des opérations en cours sur zone FOD</Title>
              {state.interventionLoading && (
                <Loading dots={true}>Loading...</Loading>
              )}
              {!state.interventionLoading &&
                state.interventionList.map((session) => {
                  return (
                    <Link
                      key={session["@id"]}
                      to={"/intervention/" + session["@id"].split("/")[3]}
                      style={{ textDecoration: "none" }}
                    >
                      <Card key={session["@id"]}>
                        <CardContent>
                          <Chip label="I" />
                          {" " +
                            session.intervenants[0].firstName +
                            " " +
                            session.intervenants[0].lastName +
                            " le " +
                            new Date(session.createdAt).toLocaleDateString(
                              "fr-FR",
                              {
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              {state.checkitemLoading && (
                <Loading dots={true}>Loading ...</Loading>
              )}
              {!state.chekitemLoading &&
                state.checkitemList.map((session) => {
                  return (
                    <Link
                      key={session["@id"]}
                      to={"/checkitem/" + session["@id"].split("/")[3]}
                      style={{ textDecoration: "none" }}
                    >
                      <Card key={session._id}>
                        <CardContent>
                          <Chip label="C" />
                          {" " +
                            session.firstName +
                            " " +
                            session.lastName +
                            " le " +
                            new Date(session.createdAt).toLocaleDateString(
                              "fr-FR",
                              {
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
            </Stack>
            {/* TODO - Mettre img lorsque pas de session ouverte */}
          </Grid>
        </Grid>
      </Grid>
      <Box mt={8}>{/* <Copyright /> */}</Box>
    </Container>
  );
}
