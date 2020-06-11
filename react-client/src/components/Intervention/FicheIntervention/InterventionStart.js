import React, { useState, useContext, useEffect } from "react";
import StepperGeneral from "../StepperGeneral";
import InterventionStartInfos from "./InterventionStartInfos";
import InterventionStartObjects from "./InterventionObjectsInputList";
import InterventionStartCallRDZ from "./InterventionStartCallRdz";
import InterventionStartDescription from "./InterventionStartDescription";
import PageEndForm from "../PageEndForm";
import { Container, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../../axios";
import { storeIntervention } from "../../store/storeIntervention";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function Intervention(props) {
  const classes = useStyles();

  const interventionStore = useContext(storeIntervention);
  const store = interventionStore.state;

  const [step, setStep] = useState(0);

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      props.history.push("/type_intervention");
    }
  };

  const handleNextStep = () => {
    if (step === 3) {
      let newIntervention = store.intervention;
      newIntervention.objects = interventionStore.state.objectList;
      console.log("POST /interventions:", newIntervention);
      axios
        .post("/interventions", newIntervention)
        .then(function (response) {
          console.log(response);
          setStep(step + 1);
        })
        .catch(function (err) {
          alert("Erreur lors de l'ajout en base de données: " + err);
          console.log(err);
        });
    } else {
      setStep(step + 1);
    }
  };

  const steps = [
    { id: 0, name: "Mes infos" },
    { id: 1, name: "Détails de l'intervention" },
    { id: 2, name: "Mes objets" },
    { id: 3, name: "Mon intervention" },
  ];

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.container}>
        {step === 0 && (
          <>
            <StepperGeneral step={step} steps={steps} />
            <InterventionStartInfos
              prevStep={handlePrevStep}
              nextStep={handleNextStep}
            />
          </>
        )}
        {step === 1 && (
          <>
            <StepperGeneral step={step} steps={steps} />
            <InterventionStartDescription
              prevStep={handlePrevStep}
              nextStep={handleNextStep}
            />
          </>
        )}
        {step === 2 && (
          <>
            <StepperGeneral step={step} steps={steps} />
            <InterventionStartObjects
              prevStep={handlePrevStep}
              nextStep={handleNextStep}
            />
          </>
        )}
        {step === 3 && (
          <>
            <StepperGeneral step={step} steps={steps} />
            <InterventionStartCallRDZ
              prevStep={handlePrevStep}
              nextStep={handleNextStep}
            />
          </>
        )}
        {step === 4 && (
          <>
            <PageEndForm
              message1="Votre intervention a bien été déclarée"
              message2="Redirection vers la page d'accueil dans "
            />
          </>
        )}
      </div>
    </Container>
  );
}
