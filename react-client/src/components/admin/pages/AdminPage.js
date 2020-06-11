import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  CssBaseline,
  Container,
} from "@material-ui/core";
import { Button, Title } from "@horizon/components-react";
import InterventionList from "../InterventionList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
  },
}));

export default function InterfaceAdmin(props) {
  const classes = useStyles();
  const initialState = {};

  const fullSize = props.fullSize;

  return (
    <Container component="main" maxWidth="lg">
      <Grid>
        <Link to="/">{"< Retour"}</Link>
      </Grid>
      <CssBaseline />

      <Grid container className={classes.container} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Title tag="h3">Tableau de bord</Title>
            </Grid>

            <Grid item xs={12}>
              <Button className={classes.fullWidth} disabled>
                Voir les déclarations d'objets perdus
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Link to="/admin/checkitems">
                <Button className={classes.fullWidth}>
                  Voir les fiches checkitems
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={6} spacing={2}>
          <Grid item xs={12}>
            <Title tag="h3">Interventions</Title>
          </Grid>

          <Grid item xs={12}>
            <InterventionList fullSize={fullSize} />
          </Grid>
        </Grid>
      </Grid>
      <Box mt={8}>{/* <Copyright /> */}</Box>
    </Container>
  );
}
