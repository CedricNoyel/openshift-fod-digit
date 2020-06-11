import React, { useState, useContext } from 'react';
import { Title } from "@horizon/components-react";
import { TextField, Checkbox, InputLabel, FormControl, Select, FormControlLabel, Grid, MenuItem } from '@material-ui/core';
import StepperChangePage from '../../StepperChangePage';
import SelectPlantCdtZone from '../../SelectPlantCdtZone';
import { storeIntervention } from '../../store/storeIntervention';

const selectNCAMOptions = [
  { label: "Aucun", value: "NONE" },
  { label: "NC", value: "NC" },
  { label: "AM", value: "AM" },
  { label: "Autre", value: "OTHER" },
];

export default function InterventionDescription(props) {
  const inputLabel = React.useRef(null);

  const interventionStore = useContext(storeIntervention);
  const { dispatch } = interventionStore;
  const store = interventionStore.state;

  const initialState = store.intervention;
  const [state, setState] = useState(initialState);

  const selectedZone = { plant: state.plant, cdt: state.cdt, zone: state.zone};

  // EVENT HANDLERS
  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState({ ...state, [e.target.name]: value });
  };

  const handleSelectNature = (value) => {
    if (value === state.selectedNature) {
      setState({ ...state, 'selectedNature': '' });
    } else {
      setState({ ...state, 'selectedNature': value });
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleNextStep();
    }
  };

  const handlePrevStep = () => {
    keepValues();
    props.prevStep();
  }

  const handleNextStep = () => {
    keepValues();
    props.nextStep();
  }

  const keepValues = () => {
    dispatch({ type: 'interventionSet', field: 'cdt', value: state.cdt });
    dispatch({ type: 'interventionSet', field: 'zone', value: state.zone });
    dispatch({ type: 'interventionSet', field: 'reason', value: state.reason });
    dispatch({ type: 'interventionSet', field: 'selectedNature', value: state.selectedNature });
    dispatch({ type: 'interventionSet', field: 'msn', value: state.msn });
    dispatch({ type: 'interventionSet', field: 'noMsn', value: state.noMsn });
    dispatch({ type: 'interventionSet', field: 'typeNCAM', value: state.typeNCAM });
    dispatch({ type: 'interventionSet', field: 'numeroNCAM', value: state.numeroNCAM });    
  }


  // FORM VALIDATION
  const [validForm, setValidForm] = useState({
    formValid: false,
    formErrors: { 
      selectedZone: '', 
      reason: '',
      nature: '',
      msn: '',
      numeroNCAM: ''
    },
  });

  const validateForm = () => {  
    let fieldValidationErrors = validForm.formErrors;
    let selectedZoneValid, reasonValid, msnValid, numeroNCAMValid = false;

    selectedZoneValid = state.plant !== '' && state.cdt !== '' && state.zone !== '';
    reasonValid = state.reason !== '';
    // natureValid = state.natureValid !== ''
    msnValid = state.noMsn || state.msn !== '' && state.msn.match(/^[0-9]+$/);
    numeroNCAMValid = state.typeNCAM === 'NONE' || state.typeNCAM !== 'NONE' && state.numeroNCAM !== '';
    
    validForm.formErrors.selectedZone = selectedZoneValid ? '' : '⚠️ Vérifiez la zone renseignée';
    validForm.formErrors.reason = reasonValid ? '' : '⚠️ Vérifiez la raison renseignée';
    // validForm.formErrors.nature = natureValid ? '' : '⚠️ Vérifiez la nature de l\'intervention';
    validForm.formErrors.msn = msnValid ? '' : '⚠️ Vérifiez le msn renseigné';
    validForm.formErrors.numeroNCAM = numeroNCAMValid ? '' : '⚠️ Vérifiez la référence renseignée';
    
    const isFormValid = selectedZoneValid && reasonValid && msnValid && numeroNCAMValid;
    setValidForm({ formErrors: fieldValidationErrors });
    return isFormValid;
  }

  return (
    <>
      <Grid container direction="column" spacing={2}>
        
        <Grid container item direction="row" xs={12} spacing={2}>
          <Grid item xs={12}>
            <Title tag="h3">Description de l'intervention</Title>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Title tag="h6">Zone de l'intervention</Title>
            </Grid>
            <Grid item xs={12}>
              <SelectPlantCdtZone 
                selectedZone={selectedZone}
                onChange={handleChange}
                errorMessage={validForm.formErrors.selectedZone}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container item direction="row" xs={12} spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Grid item xs={12}>
              <Title tag="h6">Raison de l'intervention</Title>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                type="text" 
                label="Raison" 
                name="reason"
                variant="outlined" 
                defaultValue={state.reason}
                fullWidth 
                required 
                onChange={handleChange}
                error={validForm.formErrors.reason !== ''}
                helperText={validForm.formErrors.reason}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Grid item xs={12}>
              <Title tag="h6">Nature de l'intervention</Title>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={ 
                  <Checkbox 
                    name="selectedNature"
                    checked={state.selectedNature === 'elec'} 
                    onChange={() => handleSelectNature('elec')}
                    color="primary" />
                }
                label="Élec"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    name="selectedNature"
                    checked={state.selectedNature === 'meca'} 
                    onChange={() => handleSelectNature('meca')}
                    color="primary"
                  />
                }
                label="Méca"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container item direction="row" xs={12} spacing={2}>
          {!state.noMsn && (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Grid item xs={12}>
              <Title tag="h6">Numéro d'avion</Title>
            </Grid>
            <Grid item xs={12} >
              <TextField 
                type="number" 
                label="Msn" 
                name="msn"
                variant="outlined" 
                fullWidth 
                required 
                defaultValue={state.msn}
                onChange={handleChange}
                error={validForm.formErrors.msn !== ''}
                helperText={validForm.formErrors.msn}
              />
            </Grid>
          </Grid>
          )}
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Grid item xs={12}>
              <Title tag="h6">Avion absent</Title>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox 
                    name="noMsn"
                    checked={state.noMsn} 
                    onChange={handleChange}
                    color="primary" 
                  />
                }
                label="Maintenance"
              />
            </Grid>
          </Grid>
        </Grid>
        
 
        <Grid container item direction="row" xs={12}>
          <Grid item xs={12}>
            <Title tag="h6">Références</Title>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            
              <FormControl fullWidth variant="outlined">
                <InputLabel ref={inputLabel} id="select-typeNCAM-label">Choix du type NC/AM</InputLabel>
                <Select
                  labelId="select-typeNCAM-label"
                  id="select-typeNCAM"
                  name="typeNCAM"
                  value={state.typeNCAM}
                  onChange={handleChange}
                  labelWidth={200}
                >
                  {selectNCAMOptions.map((elem, idx) => (
                    <MenuItem key={idx} value={elem.value}>{elem.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              {state.typeNCAM !== 'NONE' && (
              <TextField
                label="Numéro NC/AM"
                id="textfieldNumNcAm"
                name="numeroNCAM"
                defaultValue={state.numeroNCAM}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                error={validForm.formErrors.numeroNCAM !== ''}
                helperText={validForm.formErrors.numeroNCAM}
              />
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <StepperChangePage prevStep={handlePrevStep} nextStep={handleSubmit} />
        </Grid>
      
      </Grid>
    </>
  )
}