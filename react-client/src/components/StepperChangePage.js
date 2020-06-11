import React from "react";
import { Button } from "@horizon/components-react";
import { Grid } from "@material-ui/core";

export default function StepperChangePage(props) {
  const prevBtn = props.prevBtn || "Retour";
  const nextBtn = props.nextBtn || "Suivant";

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={6} sm={2}>
        <Button onClick={props.prevStep} size="large">
          {prevBtn}
        </Button>
      </Grid>
      <Grid item xs={6} sm={2}>
        {!props.noNextButton && (
          <Button
            onClick={props.nextStep}
            disabled={props.isNextBtnDisabled}
            primary
            size="large"
          >
            {nextBtn}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
