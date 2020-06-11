import React, { useState, useContext } from "react";
import StepperGeneral from "../StepperGeneral";
import CheckItemStartInfosPerso from "./CheckItemStartInfosPerso";
import CheckItemStartInfosAvion from "./CheckItemStartInfosAvion";
import CheckItemObjects from "./CheckItemObjects";
import PageEndForm from "../PageEndForm";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function CheckItem(props) {
  const classes = useStyles();

  const [step, setStep] = useState(0);

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      props.history.push("/type_intervention");
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const steps = [
    { id: 0, name: "Informations personnelles" },
    { id: 1, name: "Informations avion" },
    { id: 2, name: "Mes objets" },
  ];

  return (
    <Container component="main" maxWidth="lg">
      <div className={classes.container}>
        {step === 0 && (
          <>
            <StepperGeneral step={step} steps={steps} />
            <CheckItemStartInfosPerso
              prevStep={handlePrevStep}
              nextStep={handleNextStep}
            />
          </>
        )}
        {step === 1 && (
          <>
            <StepperGeneral step={step} steps={steps} />
            <CheckItemStartInfosAvion
              prevStep={handlePrevStep}
              nextStep={handleNextStep}
            />
          </>
        )}
        {step === 2 && (
          <>
            <StepperGeneral step={step} steps={steps} />
            <CheckItemObjects
              prevStep={handlePrevStep}
              nextStep={handleNextStep}
              nextBtn="Terminer"
            />
          </>
        )}
        {step === 3 && (
          <>
            <PageEndForm redirectToURL="/" />
          </>
        )}
      </div>
    </Container>
  );
}
