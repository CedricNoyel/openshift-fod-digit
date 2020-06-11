import React, { useState, useEffect } from "react";
import ObjectsOutputList from "../../objects/ObjectOutputList";
import PageEndForm from "../PageEndForm";
import { Container, Grid } from "@material-ui/core";
import { Card, CardHeader, Loading, Title } from "@horizon/components-react";
import { makeStyles } from "@material-ui/core/styles";
import StepperChangePage from "../../StepperChangePage";
import axios from "../../../axios";

export default function CheckItemSortie(props) {
  const [checkitem, setCheckitem] = useState();
  const [isDataReady, setIsDataReady] = useState(false);
  const [formEnd, setFormEnd] = useState(false);
  const [executing, setExecuting] = useState(false);

  const url = window.location.href.split("/");
  const idCheckitem = url[url.length - 1];

  const handleNextStep = async () => {
    setExecuting(true);
    // POST UPDATED CHECKITEM
    let finalCheckitem = {};
    finalCheckitem.isClosed = true;
    finalCheckitem.objects = checkitem.objects;
    console.log("PATCH /checkitems/" + idCheckitem + ": %O", finalCheckitem);
    await axios
      .patch("/checkitems/" + idCheckitem, finalCheckitem, {
        headers: {
          Accept: "application/ld+json",
          "Content-Type": "application/merge-patch+json",
        },
      })
      .then((res) => {
        console.log("PATCH SUCCESS: " + res.toString());
        setFormEnd(!formEnd);
      })
      .catch((err) => {
        console.log(err);
      });
    setExecuting(false);
  };

  const handlePrevStep = () => {
    props.history.push("/");
  };

  const loadCheckitemData = async () => {
    await axios
      .get("/checkitems/" + idCheckitem, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => {
        setCheckitem(res.data);
        setIsDataReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCheckitemData();
  }, []);

  if (formEnd) {
    return <PageEndForm />;
  } else if (isDataReady) {
    let cardHeader = checkitem.noMsn ? "Aucun MSN" : "MSN n° " + checkitem.msn;
    cardHeader =
      cardHeader +
      " - Intervenant: " +
      checkitem.firstName +
      " " +
      checkitem.lastName;
    return (
      <Container>
        <Grid container direction="column" justify="center" spacing={2}>
          <Grid item xs={12} sm={8} lg={6}>
            <Card elevation={2}>
              <CardHeader title={cardHeader} />
            </Card>
          </Grid>
          <Grid item xs={12}>
            {checkitem.objects.length !== 0 ? (
              <ObjectsOutputList objects={checkitem.objects} />
            ) : (
              <Title tag="h4">Aucun objet entré en zone FOD</Title>
            )}
          </Grid>
          <Grid item xs={12}>
            <StepperChangePage
              prevStep={handlePrevStep}
              nextStep={handleNextStep}
              nextBtn={props.nextBtn || "Terminer"}
              isNextBtnDisabled={executing}
            />
          </Grid>
        </Grid>
      </Container>
    );
  } else {
    return <Loading dots={true}>Loading...</Loading>;
  }
}
