import React, { useContext, useState } from "react";
import { Title } from "@horizon/components-react";
import SelectPlantCdtZone from "../../SelectPlantCdtZone";
import StepperChangePage from "../../StepperChangePage";
import { Grid, TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { storeIntervention } from "../../store/storeIntervention";

export default function CheckItemInfosPerso(props) {
  const interventionStore = useContext(storeIntervention);
  const { dispatch } = interventionStore;
  const state = interventionStore.state;

  const [noMsn, setNoMsn] = useState(state.checkitem.noMsn);
  const [inputs, setInputs] = useState({
    plant: state.checkitem.plant,
    cdt: state.checkitem.cdt,
    zone: state.checkitem.zone,
    msn: state.checkitem.msn,
  });

  // ACTION HANDLERS
  const handleInput = (e) => {
    if (e !== null) {
      let inputCopy = inputs;
      inputCopy[e.target.name] = e.target.value;
      setInputs(inputCopy);
    }
    setValidForm({ formErrors: { selectedZone: "", msn: "" } });
  };

  const handleNextStep = (e) => {
    dispatch({ type: "checkitemSet", field: "plant", value: inputs.plant });
    dispatch({ type: "checkitemSet", field: "cdt", value: inputs.cdt });
    dispatch({ type: "checkitemSet", field: "zone", value: inputs.zone });
    dispatch({ type: "checkitemSet", field: "msn", value: inputs.msn });
    dispatch({ type: "checkitemSet", field: "noMsn", value: noMsn });
    if (validateForm()) props.nextStep();
  };

  // FORM VALIDATION
  const [validForm, setValidForm] = useState({
    formValid: false,
    formErrors: { selectedZone: "", msn: "" },
  });

  const validateForm = () => {
    let fieldValidationErrors = validForm.formErrors;
    let selectedZoneValid = validForm.firstNameValid;
    let msnValid = validForm.lastNameValid;

    selectedZoneValid =
      inputs.plant !== "" && inputs.cdt !== "" && inputs.zone !== "";
    validForm.formErrors.selectedZone = selectedZoneValid
      ? ""
      : "⚠️ Vérifiez la zone renseignée";

    msnValid = noMsn || (inputs.msn !== "" && inputs.msn.match(/^[0-9]+$/));
    validForm.formErrors.msn = msnValid ? "" : "⚠️ Vérifiez le msn renseigné";

    const isFormValid = msnValid && selectedZoneValid;
    setValidForm({ formErrors: fieldValidationErrors });
    return isFormValid;
  };

  const selectedZone = {
    plant: state.checkitem.plant,
    cdt: state.checkitem.cdt,
    zone: state.checkitem.zone,
  };

  return (
    <Grid container spacing={2}>
      {/* <p>validForm.formValid: {validForm.formValid.toString()}</p> */}
      <Grid item xs={12}>
        <Title tag="h3">Informations avion</Title>
        <Title tag="h6" noGutterBottom>
          Zone de travail
        </Title>
      </Grid>

      <Grid item xs={12}>
        <SelectPlantCdtZone
          selectedZone={selectedZone}
          onChange={handleInput}
          errorMessage={validForm.formErrors.selectedZone}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid item xs={12}>
          <Title tag="h6" noGutterBottom>
            Avion
          </Title>
        </Grid>
        {!noMsn && (
          <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
            <Autocomplete
              name="msn"
              freeSolo
              options={[].map((option) => option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="number"
                  label="Msn"
                  name="msn"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  error={validForm.formErrors.msn !== ""}
                  helperText={validForm.formErrors.msn}
                />
              )}
              defaultValue={inputs.msn}
              onInputChange={(e) => handleInput(e)}
              // onChange={(e) => handleInput(e)}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Checkbox name="noMsn" color="primary" />}
            label="Aucun MSN présent sur zone"
            checked={noMsn}
            onChange={(e) => setNoMsn(!noMsn)}
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
