import React from 'react';
import { Hidden, Title, Step, Stepper, StepHeader } from "@horizon/components-react";
import { Grid } from '@material-ui/core';


export default function StepperGeneral(props) {
  // active step: props.step
  // stepList: props.steps

  const steps = props.steps;

  return (
    <Grid container direction="column" spacing={2}>
      {/* Visible uniquement sur telephone */}
      <Hidden only={["tablet", "fullhd", "desktop"]} >
        <Grid item xs={12}>
          <Title tag="h5">Étape {props.step + 1} / {props.steps.length}</Title>
        </Grid>
      </Hidden>

      {/* Visible sur les autres appareils */}
      <Hidden only="mobile">
        <Stepper horizontal activeStep={props.step}>
          {steps.map((elem, idx) => (
            <Step key={elem.id}>
              <StepHeader>{elem.name}</StepHeader>
            </Step>
          ))}
        </Stepper>

      </Hidden>
    </Grid>
  );
}