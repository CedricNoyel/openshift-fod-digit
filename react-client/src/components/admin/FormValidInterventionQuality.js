import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import {
  Title,
  TextField,
  Label,
  Paper,
  Button,
  BooleanField,
} from "@horizon/components-react";
import axios from "../../axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function FormValidInterventionQuality(props) {
  const classes = useStyles();

  const [executing, setExecuting] = useState(false);
  const [state, setState] = useState({
    comment: "",
  });

  const url = window.location.href.split("/");
  const idIntervention = url[url.length - 1];

  const onSubmit = (e) => {
    e.preventDefault();
    let editInterv = {
      isQualityChecked: true,
      qualityComment: state.comment,
      // qualityCheckedBy: ""
    };
    axios
      .patch("/interventions/" + idIntervention, editInterv, {
        headers: {
          Accept: "application/ld+json",
          "Content-Type": "application/merge-patch+json",
        },
      })
      .then((res) => {
        console.log("PATCH SUCCESS: " + res.data);
        props.dataUpdated();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(props);
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Paper elevation={1}>
        <Title tag="h4">Qualité :</Title>
        <Label>Commentaire : </Label>
        {props.intervention.isQualityChecked ? (
          <>
            <p>{props.intervention.qualityComment || "Aucun"}</p>
          </>
        ) : (
          <>
            <TextField
              multiline={true}
              value={state.comment}
              onChange={(val) => setState({ comment: val })}
            ></TextField>
            <Button
              primary
              disabled={executing}
              onClick={() => setExecuting(true)}
            >
              Clôturer l'intervention
            </Button>
          </>
        )}
      </Paper>
    </form>
  );
}
