import React, { useState } from "react";
import { Title, Divider } from "@horizon/components-react";
import ObjectOutput from "./ObjectOutput";
import { Grid } from "@material-ui/core";

export default function ObjectOutputList(props) {
  const [objects, setObjects] = useState(props.objects);

  const handleObjectDecrement = (obj) => {
    const objectList = objects;
    obj.quantityOutput = obj.quantityOutput - 1;
    objectList.splice(
      objectList.findIndex((a) => a._id === obj._id),
      1,
      obj
    );
    setObjects(objectList);
  };

  const handleObjectIncrement = (obj) => {
    const objectList = objects;
    obj.quantityOutput = obj.quantityOutput + 1;
    objectList.splice(
      objectList.findIndex((a) => a._id === obj._id),
      1,
      obj
    );
    setObjects(objectList);
  };

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={12}>
        <Title tag="h3">Mes objets</Title>
      </Grid>

      <Grid item xs={6} sm={4}>
        <Title tag="h5">Entrées</Title>
      </Grid>

      <Grid item xs={6} sm={4}>
        <Title tag="h5">Sorties</Title>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Divider></Divider>
      </Grid>

      <Grid item xs={12} sm={8}>
        {objects.map((obj) => (
          <ObjectOutput
            key={obj.objectId}
            obj={obj}
            onIncrement={() => handleObjectIncrement(obj)}
            onDecrement={() => handleObjectDecrement(obj)}
          />
        ))}
      </Grid>
    </Grid>
  );
}
