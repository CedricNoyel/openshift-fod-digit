import React, { useContext, useState } from "react";
import { Title } from "@horizon/components-react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import StepperChangePage from "../../StepperChangePage";
import { Grid, TextField } from "@material-ui/core";
import { storeIntervention } from "../../store/storeIntervention";

export default function CheckItemInfosPerso(props) {
  const exempleData = [];

  const interventionStore = useContext(storeIntervention);
  const { dispatch } = interventionStore;
  const state = interventionStore.state;

  const [inputs, setInputs] = useState({
    firstName: state.checkitem.firstName,
    lastName: state.checkitem.lastName,
  });

  const [validForm, setValidForm] = useState({
    formValid: false,
    firstNameValid: false,
    lastNameValid: false,
    formErrors: { firstName: "", lastName: "" },
  });

  const handleInput = (e) => {
    if (e !== null) {
      let inputsCopy = inputs;
      inputsCopy[e.target.name] = e.target.value;
      setInputs(inputs);
    }
    setValidForm({ formErrors: { firstName: "", lastName: "" } });
  };

  const handleNextStep = () => {
    if (validateForm()) {
      dispatch({
        type: "checkitemSet",
        field: "lastName",
        value: inputs.lastName,
      });
      dispatch({
        type: "checkitemSet",
        field: "firstName",
        value: inputs.firstName,
      });
      props.nextStep();
    }
  };

  const validateForm = () => {
    let fieldValidationErrors = validForm.formErrors;
    let firstNameValid = validForm.firstNameValid;
    let lastNameValid = validForm.lastNameValid;

    firstNameValid =
      inputs.firstName !== "" &&
      inputs.firstName.match(/^[-'a-zA-ZÀ-ÖØ-öø-ÿ]+$/);
    validForm.formErrors.firstName = firstNameValid
      ? ""
      : "⚠️ Vérifiez le prénom renseigné";

    lastNameValid =
      inputs.lastName !== "" && inputs.lastName.match(/^[-'a-zA-ZÀ-ÖØ-öø-ÿ]+$/);
    validForm.formErrors.lastName = lastNameValid
      ? ""
      : "⚠️ Vérifiez le nom renseigné";

    const isFormValid = firstNameValid && lastNameValid;
    setValidForm({
      formValid: isFormValid,
      formErrors: fieldValidationErrors,
      firstNameValid: firstNameValid,
      lastNameValid: lastNameValid,
    });
    return isFormValid;
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <Title tag="h3" noGutterBottom>
          Informations personnelles
        </Title>
        {/* <Title tag="h6" noGutterBottom>Nom et prénom</Title> */}
      </Grid>

      <Grid container direction="row" item xs={12} spacing={1}>
        <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
          <Autocomplete
            name="lastName"
            freeSolo
            options={exempleData.map((option) => option.lastName)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nom"
                name="lastName"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                error={validForm.formErrors.lastName !== ""}
                helperText={validForm.formErrors.lastName}
              />
            )}
            value={inputs.lastName}
            onInputChange={(e) => {
              handleInput(e);
            }}
            onChange={(e) => {
              handleInput(e);
            }}
            onClose={(e) => {
              handleInput(e);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
          <Autocomplete
            name="firstName"
            freeSolo
            options={exempleData.map((option) => option.firstName)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Prénom"
                name="firstName"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                error={validForm.formErrors.firstName !== ""}
                helperText={validForm.formErrors.firstName}
              />
            )}
            value={inputs.firstName}
            onInputChange={(e) => {
              handleInput(e);
            }}
            onChange={(e) => {
              handleInput(e);
            }}
            onClose={(e) => {
              handleInput(e);
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <StepperChangePage
          prevStep={props.prevStep}
          nextStep={handleNextStep}
        />
      </Grid>
    </Grid>
  );
}
