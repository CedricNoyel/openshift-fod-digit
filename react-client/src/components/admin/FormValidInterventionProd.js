import { makeStyles } from "@material-ui/core/styles";
import {
  Title,
  TextField,
  Button,
  BooleanField,
  Paper,
  Label,
} from "@horizon/components-react";
import React, { useState } from "react";
import axios from "../../axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function FormValidInterventionProd(props) {
  const classes = useStyles();

  const [executing, setExecuting] = useState(false);
  const [state, setState] = useState({
    prodComment: "",
    isProdChecked: false,
  });

  const [formValid, setFormValid] = useState({
    checkboxErrorMsg: "",
  });

  const url = window.location.href.split("/");
  const idIntervention = url[url.length - 1];

  const onSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION CHECK
    if (!state.isProdChecked) {
      setFormValid({
        checkboxErrorMsg: "Vous devez cocher la case pour valider la clôture",
      });
      return;
    }

    console.log(state);
    let editInterv = state;
    await axios
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

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Paper elevation={1}>
        <Title tag="h4">Production :</Title>
        <Label>Commentaire :</Label>
        {props.intervention.isProdChecked ? (
          <>
            <p>{props.intervention.prodComment}</p>
          </>
        ) : (
          <>
            <TextField
              multiline={true}
              value={state.prodComment}
              onChange={(val) =>
                setState((prevState) => ({ ...prevState, prodComment: val }))
              }
            ></TextField>
            <BooleanField
              control="checkbox"
              value={state.isProdChecked}
              onChange={(val) =>
                setState((prevState) => ({ ...prevState, isProdChecked: val }))
              }
              controlProps={{
                label: "Les mesures de sécurités définies sont respectées",
              }}
              error={formValid.checkboxErrorMsg !== ""}
              errorText={formValid.checkboxErrorMsg}
            />
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
