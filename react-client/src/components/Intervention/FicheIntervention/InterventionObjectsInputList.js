import React, { useState, useContext } from "react";
import { Title, Button } from "@horizon/components-react";
import Object from "../../objects/ObjectInput";
import AddIcon from "@material-ui/icons/Add";
import StepperChangePage from "../../StepperChangePage";
import { Grid } from "@material-ui/core";
import { storeIntervention } from "../../store/storeIntervention";

export default function InterventionObjectsInputList(props) {
  const interventionStore = useContext(storeIntervention);
  const { dispatch } = interventionStore;
  const state = interventionStore.state;

  // const objList = globalState.state.objectList;

  const [objects, setObjects] = useState(state.objectList);

  const handleObjectNameChange = (obj, name) => {
    const objectList = objects;
    obj.name = name;
    objectList.splice(
      objectList.findIndex((a) => a.objectId === obj.objectId),
      1,
      obj
    );
    setObjects(objectList);
    // console.log(objectList);
  };

  const handleObjectRemove = (myObject) => {
    setObjects(objects.filter((obj) => obj.objectId !== myObject.objectId));
  };

  const handleObjectAdd = () => {
    let maxId = 0;
    if (objects.length !== 0) {
      maxId = objects.reduce(
        (max, obj) => (obj.objectId > max ? obj.objectId : max),
        objects[0].objectId
      );
    }
    setObjects([
      ...objects,
      { objectId: maxId + 1, name: "", quantityInput: 0, quantityOutput: 0 },
    ]);
  };

  const handleObjectDecrement = (obj) => {
    const objectList = objects;
    obj.quantityInput = obj.quantityInput - 1;
    objectList.splice(
      objectList.findIndex((a) => a.objectId === obj.objectId),
      1,
      obj
    );
    setObjects(objectList);
  };

  const handleObjectIncrement = (obj) => {
    const objectList = objects;
    obj.quantityInput = obj.quantityInput + 1;
    objectList.splice(
      objectList.findIndex((a) => a.objectId === obj.objectId),
      1,
      obj
    );
    setObjects(objectList);
  };

  const handlePrevStep = () => {
    dispatch({ type: "objectListSet", objects: objects });
    props.prevStep();
  };

  const handleNextStep = () => {
    dispatch({ type: "objectListSet", objects: objects });
    props.nextStep();
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Title tag="h3">
            {props.status === "output"
              ? "Objets sortis de zone"
              : "Objets entrés en zone"}
          </Title>
          {/* <Title tag="h6" noGutterBottom>Zone de travail</Title> */}
        </Grid>
        <Grid item xs={12}>
          {objects.map((obj) => (
            <Object
              key={obj.objectId}
              obj={obj}
              onNameChange={(newName) => handleObjectNameChange(obj, newName)}
              onDelete={() => handleObjectRemove(obj)}
              onIncrement={() => handleObjectIncrement(obj)}
              onDecrement={() => handleObjectDecrement(obj)}
            />
          ))}
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Button withIcon onClick={handleObjectAdd}>
            <AddIcon />
            Ajouter un objet
          </Button>
        </Grid>

        <Grid item xs={12}>
          <StepperChangePage
            prevStep={handlePrevStep}
            nextStep={handleNextStep}
            nextBtn={props.nextBtn || "Suivant"}
          />
        </Grid>
      </Grid>
    </>
  );
}
