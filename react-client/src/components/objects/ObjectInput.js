import React, { useState, useContext } from 'react';
import { Title, IconButton } from "@horizon/components-react";
import { TextField, Grid } from '@material-ui/core';
// import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { storeGeneral } from '../store/storeGeneral';
import AddIcon from "@material-ui/icons/Add";

export default function ObjectInput (props) {

  const generalStore = useContext(storeGeneral);
  // Get the object list and add the current object value in order to use the defaultValue property
  let objectList = generalStore.state.objectList
  if (props.obj.name !== '') objectList = objectList.concat(props.obj);

  const [objValue, setobjValue] = useState(props.obj.quantityInput);

  const incrementObj = () => {
    setobjValue(objValue + 1)
    props.onIncrement(props.obj)
  };

  const decrementObj = () => {
    if (objValue > 0){
      setobjValue(objValue - 1)
      props.onDecrement(props.obj)
    }
  };

  return (
    <Grid container alignItems="center">

      <Grid item xs={2} sm={1}>
        <IconButton onClick={() => props.onDelete(props.obj)}><DeleteIcon /></IconButton>
      </Grid>

      <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
        <Autocomplete
          freeSolo
          autoComplete
          disableOpenOnFocus
          id={"input-object-"+props.obj.id}
          defaultValue={props.obj.name}
          options={objectList.map(obj => obj.name)}
          onChange={(e, values) => props.onNameChange(values)}
          onInputChange={(e, values) => props.onNameChange(values)}
          renderInput={params => (
            <TextField 
              {...params} 
              label="" 
              name={"objet "+props.obj.id} 
              placeholder="ex: smarphone, outil, ..." 
              margin="normal" 
              variant="outlined"
              fullWidth 
              required 
            />
          )}
        />
      </Grid>

      <Grid 
        container item 
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1} xs={12} sm={4} md={4} lg={3} xl={2}
      >
        <IconButton size="large" color="info" onClick={decrementObj}><RemoveIcon /></IconButton>
        <Title color="info" tag="h4">{objValue.toString()}</Title>
        <IconButton size="large" color="info" onClick={incrementObj}><AddIcon /></IconButton>
      </Grid>
    </Grid>
  );
}