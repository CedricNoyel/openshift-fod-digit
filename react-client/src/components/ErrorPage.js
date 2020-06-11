import React from 'react';
import { Title, Button } from "@horizon/components-react";
import { Container, Grid } from '@material-ui/core';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none'
  }
}));

export default function ErrorPage() {
  const classes = useStyles();

  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Title tag="h2">Page introuvable</Title>
        </Grid>
        <Grid item>
          <Link to="/" className={classes.link}>
            <Button primary size="extra-large">Retour à l'accueil</Button>
          </Link>          
        </Grid>
      </Grid>
    </Container>
  );
}