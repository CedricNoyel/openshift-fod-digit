import React, { useState, useEffect } from "react";
import {
  Title,
  Card,
  CardContent,
  CardHeader,
  BooleanField,
  Loading,
} from "@horizon/components-react";
import StepperChangePage from "../../StepperChangePage";
import { Grid } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import axios from "../../../axios";

export default function InterventionCallRDZ(props) {
  const [personList, setPersonList] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [formErrors, setFormErrors] = useState({
    checkboxConfirm: false,
  });
  const [dataLoading, setDataLoading] = useState(true);

  const getPersonToCall = async () => {
    await axios
      .get("/users?zones=%2Fapi%2Fzones%2F1&exists%5BphoneNumber%5D=true")
      .then((res) => {
        // console.log(res.data);
        setPersonList(
          res.data["hydra:member"].filter((e) => e.roles.includes("ROLE_PROD"))
        );
      })
      .catch((err) => console.log(err));
    setDataLoading(false);
  };

  useEffect(() => {
    getPersonToCall();
  }, []);

  const isFormValid = () => {
    if (!confirm) {
      setFormErrors({
        checkboxConfirm: "La case doit être cochée pour valider le formulaire",
      });
      return;
    }
    props.nextStep();
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <Title tag="h3">Mon intervention</Title>
        <p>
          Afin de <b>démarrer</b> votre intervention, vous devez{" "}
          <b>contacter</b> le responsable de zone :
        </p>
      </Grid>

      <Grid
        container
        item
        xs={12}
        justify="center"
        alignItems="center"
        spacing={3}
      >
        {dataLoading ? (
          <Loading dots={true}>Loading ...</Loading>
        ) : personList.length !== 0 ? (
          personList.map((e, idx) => {
            return (
              <Grid item key={idx} xs={12} sm={4}>
                <Card elevation={2}>
                  <CardHeader title={e.firstName + " " + e.lastName} />
                  <CardContent>
                    <Grid container spacing={2}>
                      <PhoneIcon />
                      <Title tag="h6">
                        {e.phoneNumber.substr(0, 2) +
                          " " +
                          e.phoneNumber.substr(2, 2) +
                          " " +
                          e.phoneNumber.substr(4, 2) +
                          " " +
                          e.phoneNumber.substr(6, 2) +
                          " " +
                          e.phoneNumber.substr(8)}
                      </Title>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Title tag="h5">
            Aucun responsable n'a été trouvé pour cette zone
          </Title>
        )}
      </Grid>

      <Grid item xs={12}>
        <BooleanField
          id="confirmCall"
          label="Signature electronique"
          control="checkbox"
          value={confirm}
          onChange={() => setConfirm(!confirm)}
          controlProps={{
            label:
              "Je confirme avoir contacté le responsable de zone et avoir son autorisation",
          }}
          error={formErrors.checkboxConfirm !== ""}
          errorText={formErrors.checkboxConfirm}
          style={{ overflow: "hidden" }}
        />
      </Grid>

      <Grid item xs={12}>
        <StepperChangePage
          prevStep={props.prevStep}
          nextStep={isFormValid}
          nextBtn="Terminer"
        />
      </Grid>
    </Grid>
  );
}
