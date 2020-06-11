// store.js
import React, { createContext, useReducer } from "react";

const initState = {
  checkitem: {
    firstName: "",
    lastName: "",
    zone: "",
    msn: "",
    noMsn: false,
    isClosed: false,
  },
  intervention: {
    company: "",
    intervenants: [{ _id: 0, lastName: "", firstName: "", phone: "" }],
    // plant: "",
    // cdt: "",
    zone: "",
    noMsn: false,
    msn: "",
    typeNCAM: "NONE",
    numeroNCAM: "",
    reason: "",
    selectedNature: "",
    isWorkDone: false,
    isClosed: false,
    isCallConfirmed: false,
  },
  objectList: [{ objectId: 0, name: "", quantityInput: 0, quantityOutput: 0 }],
};

const initialState = initState;

const storeIntervention = createContext(initialState);
const { Provider } = storeIntervention;

const InterventionProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    // console.log(state)
    // console.log(action)
    let copyState = state;
    switch (action.type) {
      case "clearState":
        copyState = initState;
        return copyState;

      case "checkitemSet":
        copyState.checkitem[action.field] = action.value;
        return copyState;

      case "objectListSet":
        copyState.objectList = action.objects;
        return copyState;

      case "interventionSet":
        copyState.intervention[action.field] = action.value;
        return copyState;

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { storeIntervention, InterventionProvider };
