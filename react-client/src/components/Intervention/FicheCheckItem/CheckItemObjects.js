import React, { useState, useContext } from "react";
import { Title, Button } from "@horizon/components-react";
import AddIcon from "@material-ui/icons/Add";
import { Grid, Typography } from "@material-ui/core";
import { storeIntervention } from "../../store/storeIntervention";
import StepperChangePage from "../../StepperChangePage";
import Object from "../../objects/ObjectInput";
import axios from "../../../axios";

export default function InterventionObjectsInputList(props) {
  const interventionStore = useContext(storeIntervention);
  const { dispatch } = interventionStore;
  const state = interventionStore.state;

  const [executingPost, setExecutingPost] = useState(false);
  const [objects, setObjects] = useState(state.objectList);

  const handleObjectNameChange = (obj, name) => {
    setValidForm({ formErrors: { objectsName: "", objectsQte: "" } });
    const objectList = objects;
    obj.name = name;
    objectList.splice(
      objectList.findIndex((a) => a.objectId === obj.objectId),
      1,
      obj
    );
    setObjects(objectList);
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

    setValidForm({ formErrors: { objectsNameValid: "", objectsQte: "" } });
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

    setValidForm({ formErrors: { objectsName: "", objectsQte: "" } });
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

    setValidForm({ formErrors: { objectsNameValid: "", objectsQte: "" } });
  };

  const handlePrevStep = () => {
    dispatch({ type: "objectListSet", objects: objects });
    props.prevStep();
  };

  const handleNextStep = async () => {
    setExecutingPost(true);
    if (validateForm()) {
      // dispatch({ type: 'objectListSet', objects: objects});
      let firstNameF =
        state.checkitem.firstName[0].toUpperCase() +
        state.checkitem.firstName.slice(1).toLowerCase();
      let newCheckitem = {
        firstName: firstNameF,
        lastName: state.checkitem.lastName.toUpperCase(),
        zone: state.checkitem.zone,
        msn: state.checkitem.noMsn ? "" : state.checkitem.msn,
        noMsn: state.checkitem.noMsn,
        objects: objects,
      };
      console.log("POST /checkitems:", newCheckitem);
      await axios
        .post("/checkitems", newCheckitem)
        .then(function (response) {
          console.log(response);
          props.nextStep();
        })
        .catch(function (err) {
          alert("Erreur lors de l'ajout en base de données: " + err);
          console.log(err);
        });
    }
    setExecutingPost(false);
  };

  // FORM VALIDATION

  const [validForm, setValidForm] = useState({
    formValid: false,
    objectsNameValid: false,
    objectsQteValid: false,
    formErrors: { objectsName: "", objectsQte: "" },
  });

  const validateForm = () => {
    let fieldValidationErrors = validForm.formErrors;
    let objectsNameValid = validForm.objectsNameValid;
    let objectsQteValid = validForm.objectsQteValid;

    objectsNameValid = !objects.some((obj) => obj.name.length === 0);
    objectsQteValid = !objects.some((obj) => obj.quantityInput === 0);

    validForm.formErrors.objectsName = objectsNameValid
      ? ""
      : "⚠️ Vérifiez le nom des objets renseignés";
    validForm.formErrors.objectsQte = objectsQteValid
      ? ""
      : "⚠️ Vérifiez la quantité des objets renseignés";

    const isFormValid = objectsNameValid && objectsQteValid;
    setValidForm({
      formValid: isFormValid,
      formErrors: fieldValidationErrors,
      objectsNameValid: objectsNameValid,
      objectsQteValid: objectsQteValid,
    });
    return isFormValid;
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

        <Grid item xs={12}>
          <Title color="error" tag="h5">
            {validForm.formErrors.objectsName}
          </Title>
          <Title color="error" tag="h5">
            {validForm.formErrors.objectsQte}
          </Title>
        </Grid>

        <Grid item xs={12}>
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
            isNextBtnDisabled={executingPost}
          />
        </Grid>
      </Grid>
    </>
  );
}
