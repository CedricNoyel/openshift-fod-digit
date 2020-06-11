import { makeStyles } from "@material-ui/core/styles";
import { Loading } from "@horizon/components-react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Title } from "@horizon/components-react";
import FormValidInterventionQuality from "../FormValidInterventionQuality";
import FormValidInterventionProd from "../FormValidInterventionProd";

import { Grid, CssBaseline, Container, Paper } from "@material-ui/core";
import axios from "../../../axios";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

export default function DetailIntervention(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    intervention: null,
    isLoading: true,
    errors: null,
  });

  const url = window.location.href.split("/");
  const idIntervention = url[url.length - 1];

  const getIntervention = async () => {
    console.log("GET /intervention/" + idIntervention);
    await axios
      .get("/interventions/" + idIntervention)
      .then((res) => {
        setState({ intervention: res.data, isLoading: false });
        console.log(res);
      })
      .catch((err) => setState({ errors: err, isLoading: false }));
  };

  useEffect(() => {
    getIntervention();
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <Grid>
        <Link to="/admin">{"< Retour"}</Link>
      </Grid>
      <CssBaseline />
      {state.isLoading ? (
        <Loading dots={true}>Loading ...</Loading>
      ) : (
        <Grid container className={classes.container} spacing={2}>
          <Grid container item xs={12} sm={6} spacing={2}>
            <Grid item xs={12}>
              <Title tag="h4">Intervention n° {idIntervention}</Title>
              Création :{" "}
              {new Date(state.intervention.createdAt).toLocaleDateString(
                "fr-FR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
              {state.intervention.updatedAt !== state.intervention.createdAt &&
                "<br />Dernière modification :" +
                  new Date(state.intervention.updatedAt).toLocaleDateString(
                    "fr-FR",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
            </Grid>
            <Grid item xs={12}>
              <Title tag="h4">Intervenant(s)</Title>
              <Grid item xs={12}>
                Entreprise : <b>{" " + state.intervention.company}</b>
              </Grid>
              {state.intervention.intervenants.map((intervenant, idx) => {
                return (
                  <Grid item xs={12} key={intervenant["@id"]}>
                    Intervenant {idx + 1}:{" "}
                    {intervenant.firstName + " " + intervenant.lastName}
                    {intervenant.phone !== "" && "- Tél: " + intervenant.phone}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={12}>
              <Title tag="h4">Zone</Title>
              <Grid item xs={12}>
                {"Emplacement : " +
                  state.intervention.zone.cdt.plant.name +
                  " - " +
                  state.intervention.zone.cdt.name +
                  " - " +
                  state.intervention.zone.name}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Title tag="h4">Intervention</Title>
              <Grid item xs={12}>
                MSN :{" "}
                <b>
                  {state.intervention.noMsn
                    ? "Aucun"
                    : state.intervention.msn.toString()}
                </b>
              </Grid>
              <Grid item xs={12}>
                Type NC/AM :{" "}
                {state.intervention.typeNCAM ? state.intervention.typeNCAM : ""}
              </Grid>
              <Grid item xs={12}>
                Numéro NC/AM :{" "}
                {state.intervention.numeroNCAM
                  ? state.intervention.numeroNCAM
                  : ""}
              </Grid>
              <Grid item xs={12}>
                Raison de l'intervention : {state.intervention.reason}
              </Grid>
              <Grid item xs={12}>
                Nature de l'intervention : {state.intervention.selectedNature}
              </Grid>
              <Grid item xs={12}>
                Travail terminé :{" "}
                {state.intervention.isWorkdone ? "Oui" : "Non"}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              La personne a confirmé l'appel :
              {state.intervention.isCallConfirmed ? " Oui" : " Non"}
            </Grid>
            <Grid item xs={12}>
              <Title tag="h4">Objets entrés / sortis de zone :</Title>
              {state.intervention.objects.length === 0
                ? "Aucun"
                : state.intervention.objects.map((obj, idx) => {
                    return (
                      <Grid item xs={12} key={idx}>
                        Objet {idx + 1} : {obj.name} - {obj.quantityInput} -{" "}
                        {obj.quantityOutput}
                      </Grid>
                    );
                  })}
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={6} spacing={2}>
            <Title tag="h4">Cloture de l'intervention :</Title>
            <Grid item xs={12}>
              <FormValidInterventionQuality
                intervention={state.intervention}
                dataUpdated={() => getIntervention()}
              />
            </Grid>
            <Grid item xs={12}>
              <FormValidInterventionProd
                intervention={state.intervention}
                dataUpdated={() => getIntervention()}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
