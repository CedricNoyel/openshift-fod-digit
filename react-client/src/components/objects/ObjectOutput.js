import React, { useState } from 'react';
import { Title, IconButton } from "@horizon/components-react";
import { Grid } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";


export default function ObjectOutput (props) {

  const [quantity, setQuantity] = useState(props.obj.quantityOutput);

  const incrementObj = () => {
    props.onIncrement(props.obj);
    setQuantity(quantity + 1);
  };

  const decrementObj = () => {
    props.onDecrement(props.obj)
    if (quantity > 0) setQuantity(quantity - 1);
  };
  
  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={6}>
        <Title color="info" tag="h4">{props.obj.quantityInput}x {props.obj.name}</Title>
      </Grid>

      <Grid 
        container item 
        direction="row"
        alignItems="center"
        spacing={1} 
        xs={6}
      >
          <IconButton color="info" onClick={decrementObj}><RemoveIcon /></IconButton>
          <Title color="info" tag="h5">{quantity}</Title>
          <IconButton color="info" onClick={incrementObj}><AddIcon /></IconButton>
      </Grid>
      </Grid>
  );
}