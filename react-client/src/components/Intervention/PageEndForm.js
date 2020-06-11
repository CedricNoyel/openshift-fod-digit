import React from 'react';
import { Grid } from '@material-ui/core';
import { Title, Button } from "@horizon/components-react";
import CountDown from '../Countdown';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router, Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  btnEnd: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const defaultRedirectURL = "/";
const defaultMessage1 = "Le formulaire a bien été complété";
const defaultMessage2 = "Redirection automatique vers la page d'accueil dans ";

function PageEndForm(props) {
  const classes = useStyles();

  const message1 = props.message1 || defaultMessage1;
  const message2 = props.message2 || defaultMessage2;
  const redirectToURL = props.redirectToURL || defaultRedirectURL;

  const timeOver = () => {
    props.history.push(redirectToURL);
  }

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Title tag="h2">{message1}</Title>
        <Title tag="h4">{message2}<CountDown countdown={5} timeOver={timeOver}/> secondes</Title>
        <Link to="/" className={classes.btnEnd} style={{ textDecoration: 'none'}}>
          <Button primary size="large">Retour à l'accueil</Button>
        </Link>
      </Grid>
    </>
  )
}
export default withRouter(PageEndForm);