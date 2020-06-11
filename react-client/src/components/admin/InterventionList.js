import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InterventionCard from "./InterventionCard";
import { Loading, Title } from "@horizon/components-react";
import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { BrowserRouter as Router, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    minWidth: "200px",
  },
}));

export default function InterventionList(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    interventions: [],
    isLoading: true,
    errors: null,
  });

  const getInterventions = async () => {
    await axios
      .get("/interventions/")
      .then((res) => {
        setState({ interventions: res.data["hydra:member"], isLoading: false });
        console.log(res.data["hydra:member"]);
      })
      .catch((err) => setState({ errors: err, isLoading: false }));
  };
  useEffect(() => {
    getInterventions();
  }, []);

  if (!state.isLoading)
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={1}
        >
          {state.interventions.length !== 0 ? (
            state.interventions.map((row, idx) => (
              <Grid item key={"grid-" + idx}>
                <Link
                  to={"/admin/interventions/" + row["@id"].split("/")[3]}
                  style={{ textDecoration: "none" }}
                >
                  <InterventionCard key={"card-" + idx} data={row} />
                </Link>
              </Grid>
            ))
          ) : (
            <Grid item>Aucune intervention</Grid>
          )}
        </Grid>
      </div>
    );
  else {
    return <Loading dots={true}>Loading...</Loading>;
  }
}
