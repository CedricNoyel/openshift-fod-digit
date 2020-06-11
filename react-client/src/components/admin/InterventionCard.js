import React from "react";
import { Grid, Chip } from "@material-ui/core";
import { Card, CardContent } from "@horizon/components-react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chipCardGreen: {
    backgroundColor: "#d7e3a5",
    margin: theme.spacing(1),
  },
  chipCardQuality: {
    backgroundColor: "#e07064",
    margin: theme.spacing(1),
  },
  chipCardProd: {
    backgroundColor: "#f9bc92",
    margin: theme.spacing(1),
  },
}));

export default function InterventionCard(props) {
  const classes = useStyles();
  const intervention = props.data;

  let chipLabel = intervention.isClosed ? "" : "En cours";
  return (
    <Card key={intervention["@id"]}>
      <CardContent>
        <Grid container>
          <Grid
            item
            container
            xs={8}
            justify="space-between"
            alignItems="center"
          >
            {intervention.intervenants.map((intervenant) => {
              return (
                <>
                  <Grid item xs={12} key={intervenant["@id"]}>
                    {intervenant.firstName + " " + intervenant.lastName}
                  </Grid>
                </>
              );
            })}
            <Grid item xs={12}>
              {new Date(intervention.createdAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            {!intervention.isClosed && (
              <Chip className={classes.chipCardGreen} label="En cours" />
            )}

            {intervention.isClosed && !intervention.isQualityChecked && (
              <Chip className={classes.chipCardQuality} label="Q"></Chip>
            )}

            {intervention.isClosed && !intervention.isProdChecked && (
              <Chip className={classes.chipCardProd} label="P"></Chip>
            )}

            {intervention.isClosed &&
              intervention.isProdChecked &&
              intervention.isQualityChecked && <Chip label="Cloturée"></Chip>}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
