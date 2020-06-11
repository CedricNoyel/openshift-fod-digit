import { makeStyles } from "@material-ui/core/styles";
import { Loading } from "@horizon/components-react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Title } from "@horizon/components-react";
import { Grid, CssBaseline, Container } from "@material-ui/core";
import axios from "../../../axios";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: "flex",
  },
}));

export default function DetailCheckitem(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    checkitem: null,
    isLoading: true,
    errors: null,
  });

  const url = window.location.href.split("/");
  const idCheckitem = url[url.length - 1];

  const getCheckitem = async () => {
    console.log("GET /checkitem/" + idCheckitem);
    await axios
      .get("/checkitems/" + idCheckitem)
      .then((res) => {
        console.log(res.data);
        setState({ checkitem: res.data, isLoading: false });
      })
      .catch((err) => setState({ errors: err, isLoading: false }));
  };
  useEffect(() => {
    getCheckitem();
  }, []);

  if (!state.isLoading)
    return (
      <Container component="main" maxWidth="lg">
        <Grid>
          <Link to="/admin/checkitems">{"< Retour"}</Link>
        </Grid>
        <CssBaseline />

        <Grid container className={classes.container} spacing={2}>
          <Grid item xs={12}>
            <Title tag="h4">Fiche Checkitems n° {idCheckitem}</Title>
            Création :{" "}
            {new Date(state.checkitem.createdAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
            <br />
            {state.checkitem.updatedAt !== state.checkitem.createdAt &&
              "Dernière modification : " +
                new Date(state.checkitem.updatedAt).toLocaleDateString(
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
            <Title tag="h4">Intervenant</Title>
            <Grid item xs={12}>
              {state.checkitem.firstName + " " + state.checkitem.lastName}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Title tag="h4">Zone</Title>
            <Grid item xs={12}>
              {"Emplacement : " +
                state.checkitem.zone.cdt.plant.name +
                " - " +
                state.checkitem.zone.cdt.name +
                " - " +
                state.checkitem.zone.name}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Title tag="h4">Avion</Title>
            <Grid item xs={12}>
              MSN :{" "}
              <b>
                {state.checkitem.noMsn
                  ? "Aucun"
                  : state.checkitem.msn.toString()}
              </b>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Title tag="h4">Objets entrés / sortis de zone :</Title>
            {state.checkitem.objects.length === 0
              ? "Aucun"
              : state.checkitem.objects.map((obj, idx) => {
                  return (
                    <Grid item xs={12} key={"objectId-" + obj.objectId}>
                      Objet {idx + 1} : {obj.name} - {obj.quantityInput} -{" "}
                      {obj.quantityOutput}
                    </Grid>
                  );
                })}
          </Grid>
        </Grid>
      </Container>
    );
  else {
    return <Loading dots={true}>Loading...</Loading>;
  }
}
