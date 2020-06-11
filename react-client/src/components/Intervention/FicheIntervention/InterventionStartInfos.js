import React, { useState, useContext } from 'react';
import { Title, Button } from "@horizon/components-react";
import { Grid, TextField } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import Intervenant from './Intervenant';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StepperChangePage from '../../StepperChangePage';
import { storeIntervention } from '../../store/storeIntervention';

export default function Intervention(props) {

  // GET GLOBAL STATE
  const interventionStore = useContext(storeIntervention);
  const { dispatch } = interventionStore;
  const state = interventionStore.state;

  // SET LOCAL STATE
  const [company, setCompany] = useState(state.intervention.company);
  const [intervenants, setIntervenants] = useState(state.intervention.intervenants);
  const [validForm, setValidForm] = useState({
    formValid: false,
    companyValid: false,
    intervenantsValid: false,
    formErrors: { company: '', intervenants: ''},
  });
  
  // EVENT HANDLERS
  const handleAddIntervenant = () => {
    setIntervenants([ ...intervenants, { _id: getNextId(intervenants), lastName: "", firstName: "", phone: "" }]);
  }

  const handleRemoveIntervenant = (myIntervenant) => {
    if (intervenants.length > 1) {
      setIntervenants(intervenants.filter( (elem) => elem._id !== myIntervenant._id ));
    }
  }
  const updateIntervenants = () => {
    dispatch({ type: 'interventionSet', field: 'intervenants', value: intervenants});
  }

  const handleInputCompany = (value) => {
    setCompany(value);
    dispatch({ type: 'interventionSet', field: 'company', value: value });
  }

  const handleInputIntervenant = (intervenant) => {
    let list = intervenants;
    list.splice(intervenants.findIndex((a) => a._id === intervenant._id), 1, intervenant);
  }

  const handleNextStep = () => {

    if (validateForm()) {
      updateIntervenants();
      props.nextStep();
    }
  }

  const handlePrevStep = () => {
    updateIntervenants();
    props.prevStep();
  }

  const validateForm = () => {  
    // INIT VALIDATION
    let fieldValidationErrors = validForm.formErrors;
    let companyValid = validForm.companyValid;
    let intervenantsValid = validForm.intervenantsValid;

    // CHECK FIELDS
    companyValid = company !== '' ? true : false;
    intervenantsValid = !intervenants.some((i) => i.lastName === "" || i.firstName === "");

    // SET ERROR MSG
    validForm.formErrors.company = companyValid ? '' : '⚠️ Vérifiez la société renseignée';
    validForm.formErrors.intervenants = intervenantsValid ? '' : '⚠️ Vérifiez les intervenans renseignés';
    
    const isFormValid = companyValid && intervenantsValid;
    setValidForm({ formErrors: fieldValidationErrors });
    return isFormValid;
  }

  const companies = [
    { _id: 0, name: "DAHER"},
    { _id: 1, name: "AAA"},
    { _id: 2, name: "SPI"},
  ];

  return (
  <>
    <Grid container direction="column" spacing={2}>

      <Grid item xs={12}>
        <Title tag="h3">Mes informations</Title>
        <Title tag="h6" noGutterBottom>Entreprise prestataire</Title>
      </Grid>

      {/* <Label>Société</Label> */}
      <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
      <Autocomplete
          freeSolo
          autoComplete
          disableOpenOnFocus
          id="autocomplete-text-company"
          defaultValue={company}
          options={companies.map((company) => company.name)}
          onChange={(e, value) => handleInputCompany(value)}
          onInputChange={(e, value) => handleInputCompany(value)}
          renderInput={params => (
            <TextField 
              {...params} 
              label="" 
              name="Société"
              placeholder="Spi, Daher, ..." 
              margin="normal" 
              variant="outlined"
              fullWidth 
              required 
              error={validForm.formErrors.company !== ''}
              helperText={validForm.formErrors.company}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Title tag="h6" noGutterBottom>Intervenants</Title>
        {intervenants.map((intervenant, idx) => (
          <Intervenant 
            key={intervenant._id}
            intervenant={intervenant} 
            onInputChange={handleInputIntervenant}
            removeIntervenant={handleRemoveIntervenant}
            deleteButton
          />
        ))}
        <div style={{color: '#f44336'}}>{validForm.formErrors.intervenants}</div>
      </Grid>
      
      <Grid item xs={12}>
        <Button onClick={handleAddIntervenant} withIcon><AddIcon />Ajouter un intervenant</Button>
      </Grid>

      <Grid item xs={12}>
        <StepperChangePage prevStep={handlePrevStep} nextStep={handleNextStep} />
      </Grid>
      
    </Grid>
  </>
  )
}

function getNextId(items) {
  let maxId = 0;
  maxId = items.reduce((max, item) => (item._id > max ? item._id : max), items[0]._id);
  return maxId + 1;
}
