import React, { useState } from "react";
import {
  Title,
  Card,
  CardContent,
  CardHeader,
  BooleanField,
  Toggle,
} from "@horizon/components-react";
import StepperChangePage from "../../StepperChangePage";
import { Grid } from "@material-ui/core";

export default function InterventionEndCallRdz(props) {
  const initRdz = [
    {
      id: "dqsd122",
      firstName: "Pierre",
      lastName: "Dupont",
      phone: "06 38 71 06 38",
    },
    {
      id: "dezasd2",
      firstName: "Marc",
      lastName: "Brige",
      phone: "06 38 47 53 22",
    },
  ];

  const [rdz] = useState(initRdz);
  const [isWorkDone, setWorkDone] = useState(false);
  const [isCallConfirmed, setCallConfirmed] = useState(false);

  const changeWorkDone = (val) => {
    props.setWorkDone(val);
    setWorkDone(val);
  };

  const changeCallConfirmed = (val) => {
    props.setCallConfirmed(val);
    setCallConfirmed(val);
  };

  const labelWorkDone = isWorkDone ? "Oui" : "Non *";

  return (
    <Grid container direction="column" spacing={2}>
      <Title tag="h3">Mon intervention</Title>

      <Grid
        container
        item
        direction="row"
        justify="flex-start"
        alignItems="center"
        xs={12}
        spacing={3}
      >
        <Grid item>
          <Title tag="h6">Le travail est-il terminé ?</Title>
        </Grid>

        <Grid item>
          <Toggle
            label={labelWorkDone}
            size="large"
            onChange={() => changeWorkDone(!isWorkDone)}
          />
        </Grid>
      </Grid>

      {!isWorkDone && (
        <Grid container item xs={12}>
          <p>
            * Dans le cas d'un travail non terminé, merci d'en informer le
            responsable de zone afin de reprogrammer une intervention.
          </p>
        </Grid>
      )}

      <Grid container item xs={12}>
        <Title tag="h6">
          Afin de <u>clore</u> votre intervention, vous devez contacter le chef
          d'équipe
        </Title>
      </Grid>

      <Grid
        container
        item
        xs={12}
        justify="center"
        alignItems="center"
        spacing={3}
      >
        {rdz.length !== 0 &&
          rdz.map((e) => {
            return (
              <Grid item key={e.id} xs={12} sm={4}>
                <Card elevation={2}>
                  <CardHeader title={e.firstName + " " + e.lastName} />
                  <CardContent>
                    <Title tag="h5">{e.phone}</Title>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>

      <Grid item xs={12}>
        <BooleanField
          id="confirmCall"
          label="Signature electronique"
          control="checkbox"
          value={isCallConfirmed}
          onChange={() => changeCallConfirmed(!isCallConfirmed)}
          controlProps={{
            label:
              "Je confirme avoir appelé un responsable et avoir son autorisation",
          }}
          error={props.formErrors.checkboxConfirm !== ""}
          errorText={props.formErrors.checkboxConfirm}
          style={{ overflow: "hidden" }}
        />
      </Grid>
    </Grid>
  );
}
