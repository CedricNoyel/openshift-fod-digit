import React from "react";
import { Title, Button, Stack } from "@horizon/components-react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import StepperChangePage from "../StepperChangePage";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function InterventionSelectType(props) {
  const classes = useStyles();

  const handlePreviousPage = () => {
    props.history.push("/");
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.container}>
        <Stack spacing="4-x">
          <Title tag="h3">Type d'intervention</Title>
          <Container>
            <Title tag="h5">Je suis :</Title>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Link to="/checkitem" style={{ textDecoration: "none" }}>
                  <Button to={"/checkitem"} primary size="large">
                    Interne à la ligne
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Link to="/intervention" style={{ textDecoration: "none" }}>
                  <Button primary size="large">
                    Externe à la ligne
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Container>

          <Stack spacing="1-x">
            <p>
              Nb: une intervention <b>externe à la ligne</b> correspond à une
              intervention exécutée par une personne qui n'appartient pas à la
              ligne de production.
            </p>
            <p>
              Exemple:{" "}
              <i>
                maintenance alors que l'atelier est en activité et que les
                produits ne sont pas protégés, travail de dernière minute,
                travaux restants ...
              </i>
            </p>
          </Stack>
        </Stack>
        <StepperChangePage prevStep={handlePreviousPage} noNextButton />
      </div>
    </Container>
  );
}
export default InterventionSelectType;
