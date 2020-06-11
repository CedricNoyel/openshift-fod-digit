import React, { useState } from 'react';
import { Row, Col, IconButton } from "@horizon/components-react";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function Intervenant(props) {
  const initialState = props.intervenant;
  const [state, setState] = useState(initialState);

  const inputChange = () => {
    props.onInputChange(state);
  }

  const handleInput = (e) => {
    if (e !== null) {
      let inputsCopy = state;
      inputsCopy[e.target.name] = e.target.value;
      setState(inputsCopy);
      console.log({ [e.target.name]: e.target.value})
    }
  }

  const handleChangeFirstName = (value) => {
    inputChange()
    setState({...state, firstName: value });
  }

  const handleChangePhone = (value) => {
    inputChange()
    setState({...state, phone: value });
  }

  const handleRemoveObject = (intervenant) => {
    props.removeIntervenant(intervenant);
  }

  const exempleData = [
    { lastName: "NOYEL", firstName: "Cédric", phone: "06 38 71 06 38"},
    { lastName: "CAILLET", firstName: "Guillaume", phone: "07 38 31 06 38"},
    { lastName: "RUNZT", firstName: "Julien", phone: "06 43 28 41 12"},
  ];

  return (
  <>
    <Row alignItems="center">
      <Col xs={2} sm={1}>
        <IconButton onClick={() => handleRemoveObject(state)}><DeleteIcon /></IconButton>
      </Col>
      <Col xs={10} sm={4} lg={3}>
        <Autocomplete
          id="free-solo-lastName"
          name="lastName"
          freeSolo
          options={exempleData.map(option => option.lastName)}
          defaultValue={state.lastName}
          renderInput={params => (
            <TextField {...params} name="lastName" label="Nom" margin="normal" variant="outlined" fullWidth required />
          )}
          value={state.lastName}
          onInputChange={e => handleInput(e)}
          onChange={e => handleInput(e)}
        />

      </Col>
      <Col xs={12} sm={3} md={3} lg={3} xl={2}>
        <Autocomplete
          id="free-solo-firstName"
          name="firstName"
          freeSolo
          options={exempleData.map(option => option.firstName)}
          renderInput={params => (
            <TextField {...params} name="firstName" label="Prénom" margin="normal" variant="outlined" fullWidth required />
          )}
          value={state.firstName}
          onInputChange={e => handleInput(e)}
          onChange={e => handleInput(e)}
          onClose={e => handleInput(e)}
          required
        />

      </Col>
      <Col xs={12} sm={4} md={3} lg={3} xl={2}>
        <Autocomplete
          id="free-solo-phone"
          name="phone"
          freeSolo
          options={exempleData.map(option => option.phone)}
          renderInput={params => (
            <TextField {...params} name="phone" type="tel" label="Téléphone" margin="normal" variant="outlined" fullWidth />
          )}
          value={state.phone}
          onInputChange={e => handleInput(e)}
          onChange={e => handleInput(e)}
          onClose={e => handleInput(e)}
        />
      </Col>
    </Row>
  </>
  )
}