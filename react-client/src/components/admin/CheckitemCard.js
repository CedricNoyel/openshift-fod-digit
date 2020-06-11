import React from "react";
import { Grid, Chip } from "@material-ui/core";
import { Card, CardContent } from "@horizon/components-react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  chipCardGreen: {
    backgroundColor: "#d7e3a5",
  },
}));

export default function InterventionCard(props) {
  const classes = useStyles();
  const checkitem = props.data;

  let chipLabel = checkitem.isClosed ? "Cloturée" : "En cours";
  return (
    <>
      <Card>
        <CardContent>
          <Grid container>
            <Grid
              item
              container
              xs={8}
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={8}>
                {checkitem.firstName + " " + checkitem.lastName}
              </Grid>
              <Grid item xs={12}>
                {new Date(checkitem.createdAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Chip
                className={!checkitem.isClosed ? classes.chipCardGreen : null}
                label={chipLabel}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
