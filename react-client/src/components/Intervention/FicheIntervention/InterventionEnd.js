import React, { useState, useEffect } from "react";
import StepperChangePage from "../../StepperChangePage";
import PageEndForm from "../PageEndForm";
import { Container, Grid } from "@material-ui/core";
import {
  Card,
  CardHeader,
  CardContent,
  Loading,
} from "@horizon/components-react";
import ObjectsOutputList from "../../objects/ObjectOutputList";
import InterventionEndCallRdz from "./InterventionEndCallRdz";
import axios from "../../../axios";

export default function Intervention(props) {
  const [step, setStep] = useState(0);
  const [intervention, setIntervention] = useState();
  const [isDataReady, setIsDataReady] = useState(false);
  const [formEnd, setFormEnd] = useState(false);
  const [isWorkDone, setWorkDone] = useState(false);
  const [isCallConfirmed, setCallConfirmed] = useState(false);
  const [formErrors, setFormErrors] = useState({
    checkboxConfirm: false,
  });
  const [executing, setExecuting] = useState(false);

  const url = window.location.href.split("/");
  const idIntervention = url[url.length - 1];

  const steps = [
    { id: 0, name: "Mes objets" },
    { id: 1, name: "Mon intervention" },
  ];

  const loadInterventionData = async () => {
    await axios
      .get("/interventions/" + idIntervention)
      .then((res) => {
        console.log(res.data);
        setIntervention(res.data);
        setIsDataReady(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadInterventionData();
  }, []);

  const isFormValid = () => {
    if (!isCallConfirmed) {
      setFormErrors({
        checkboxConfirm: "La case doit être cochée pour valider le formulaire",
      });
      return false;
    }
    return true;
  };

  const handlePrevStep = () => {
    step > 0 ? setStep(step - 1) : props.history.push("/");
  };

  const handleNextStep = async () => {
    if (step === steps.length - 1) {
      if (isFormValid()) {
        setExecuting(true);
        console.log("PATCH");
        let copyIntervention = {};
        copyIntervention.objects = intervention.objects;
        copyIntervention.isWorkDone = isWorkDone;
        copyIntervention.isCallConfirmed = isCallConfirmed;
        copyIntervention.isClosed = true;
        console.log(copyIntervention);
        await axios
          .patch("/interventions/" + idIntervention, copyIntervention, {
            headers: {
              Accept: "application/ld+json",
              "Content-Type": "application/merge-patch+json",
            },
          })
          .then((res) => {
            console.log("PATCH SUCCESS: " + res.data);
            setFormEnd(!formEnd);
            setStep(step + 1);
          })
          .catch((err) => {
            console.log(err);
          });
        setExecuting(false);
        return;
      }
    } else {
      setStep(step + 1);
    }
  };

  if (!isDataReady) {
    return <Loading dots={true}>Loading...</Loading>;
  } else {
    let cardHeader = intervention.noMsn
      ? "Aucun MSN"
      : "MSN n° " + intervention.msn;

    let cardContent =
      intervention.intervenants === 1 ? "Intervenant : " : "Intervenants : ";
    cardContent += intervention.intervenants.map((interv) => {
      return " " + interv.firstName + " " + interv.lastName;
    });
    return (
      <Container>
        <Grid container direction="column" justify="center" spacing={3}>
          {(step === 0 || step === 1) && (
            <Grid item xs={12} sm={8} lg={6}>
              <Card elevation={2}>
                <CardHeader title={cardHeader} />
                {cardContent}
              </Card>
            </Grid>
          )}

          <Grid item xs={12}>
            {step === 0 && <ObjectsOutputList objects={intervention.objects} />}

            {step === 1 && (
              <InterventionEndCallRdz
                setWorkDone={(val) => setWorkDone(val)}
                setCallConfirmed={(val) => setCallConfirmed(val)}
                formErrors={formErrors}
              />
            )}

            {step > 1 && (
              <PageEndForm
                message1="Votre intervention a été cloturée"
                message2="Redirection vers la page d'accueil dans "
              />
            )}
          </Grid>

          {(step === 0 || step === 1) && (
            <Grid item xs={12}>
              <StepperChangePage
                prevStep={handlePrevStep}
                nextStep={handleNextStep}
                nextBtn={step === 1 ? "Terminer" : "Suivant"}
                isNextBtnDisabled={executing}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    );
  }
}
