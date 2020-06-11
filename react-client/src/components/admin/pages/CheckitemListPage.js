import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  CssBaseline,
  Container,
} from "@material-ui/core";
import { Title } from "@horizon/components-react";
import CheckitemList from "../CheckitemList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: "flex",
  },
}));

export default function CheckItemListPage() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <Grid>
        <Link to="/admin">{"< Retour"}</Link>
      </Grid>
      <CssBaseline />

      <Grid container className={classes.container} spacing={2}>
        <Grid item xs={12}>
          <div className={classes.paper}>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12}>
                <Title tag="h3">Fiches checkitem sur la zone</Title>
              </Grid>
              <Grid item xs={12}>
                <CheckitemList />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box mt={8}>{/* <Copyright /> */}</Box>
    </Container>
  );
}
