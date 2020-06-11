import React, { createContext, useReducer } from "react";

const API = "https://fod-2j72-d.epaas.eu.airbus.corp/api/V1.0";

const objectList = [
  { id_: 0, lang: "fr", name: "Marteau", defaultNumber: "1" },
  { id_: 1, lang: "fr", name: "Scotch", defaultNumber: "1" },
  { id_: 2, lang: "fr", name: "Smarphone", defaultNumber: "1" },
  { id_: 3, lang: "fr", name: "Téléphone", defaultNumber: "1" },
  { id_: 4, lang: "fr", name: "Tablette", defaultNumber: "1" },
  { id_: 5, lang: "fr", name: "Caisse", defaultNumber: "1" },
];

const initialState = {
  API: API,
  objectList: objectList,
  plants: [],
};

const storeGeneral = createContext(initialState);
const { Provider } = storeGeneral;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    let copyState = state;
    switch (action.type) {
      case "SET_PLANTS":
        copyState = {}; // do something with the action
        return { ...state, plants: action.plants };
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { storeGeneral, StateProvider };
