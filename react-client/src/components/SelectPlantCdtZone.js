import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "@horizon/components-react";
import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";
import { storeGeneral } from "./store/storeGeneral";
import axios from "../axios";

export default function SelectPlantCdtZone(props) {
  // Props:
  //   selectedZone
  //   onChange
  //   errorMessage

  const errorMessage = props.errorMessage || "";

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const generalStore = useContext(storeGeneral);
  const state = generalStore.state;

  const [inputs, setInputs] = useState({
    plant: props.selectedZone.plant,
    cdt: props.selectedZone.cdt,
    zone: props.selectedZone.zone,
  });

  const handleInput = (e) => {
    let data = Object.assign({}, inputs);
    data[e.target.name] = e.target.value;
    setInputs(data);
    props.onChange(e); // To parent --> to put in global state
  };

  let [plantList, setPlantList] = useState([]);
  let [cdtList, setCdtList] = useState([]);
  let [zoneList, setZoneList] = useState([]);

  const fetchPlants = async () => {
    await axios
      .get("/plants", { headers: { accept: "application/ld+json" } })
      .then(function (res) {
        setPlantList(res.data["hydra:member"]);
      })
      .catch(function (err) {
        console.log("Erreur lors de la requete en base: " + err);
      });
  };

  const fetchCdts = async () => {
    await axios
      .get("/cdts", { headers: { accept: "application/ld+json" } })
      .then(function (res) {
        setCdtList(res.data["hydra:member"]);
      })
      .catch(function (err) {
        console.log("Erreur lors de la requete en base: " + err);
      });
  };

  const fetchZones = async () => {
    await axios
      .get("/zones", { headers: { accept: "application/ld+json" } })
      .then(function (res) {
        setZoneList(res.data["hydra:member"]);
      })
      .catch(function (err) {
        console.log("Erreur lors de la requete en base: " + err);
      });
  };

  useEffect(() => {
    fetchPlants();
    fetchCdts();
    fetchZones();
  }, []);

  return (
    <>
      <Row>
        <Col xs={6} sm={4} md={3} lg={2} xl={1}>
          <FormControl fullWidth variant="outlined">
            <InputLabel ref={inputLabel} id="select-plant-label">
              Usine
            </InputLabel>
            <Select
              labelId="select-plant-label"
              id="select-plant"
              name="plant"
              value={inputs.plant}
              onChange={(e) => handleInput(e)}
              labelWidth={labelWidth}
            >
              {plantList.map((elem) => (
                <MenuItem key={elem["@id"]} value={elem["@id"]}>
                  {elem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>

        <Col xs={6} sm={4} md={3} lg={2} xl={1}>
          {inputs.plant && inputs.plant.length !== 0 && (
            <FormControl
              fullWidth
              variant="outlined"
              error={errorMessage !== "" && inputs.cdt === ""}
            >
              <InputLabel ref={inputLabel} id="select-cdt-label">
                CDT
              </InputLabel>
              <Select
                labelId="select-cdt-label"
                id="select-cdt"
                name="cdt"
                value={inputs.cdt}
                onChange={(e) => handleInput(e)}
                labelWidth={labelWidth}
              >
                {cdtList
                  .filter((elem) => elem.plant["@id"] === inputs.plant)
                  .map((elem) => (
                    <MenuItem key={elem["@id"]} value={elem["@id"]}>
                      {elem.name}
                    </MenuItem>
                  ))}
              </Select>
              {errorMessage !== "" && inputs.cdt === "" && (
                <FormHelperText>{errorMessage}</FormHelperText>
              )}
            </FormControl>
          )}
        </Col>

        <Col xs={12} sm={4} md={3} lg={2} xl={1}>
          {inputs.cdt && inputs.cdt.length !== 0 && (
            <FormControl
              fullWidth
              variant="outlined"
              error={errorMessage !== ""}
            >
              <InputLabel ref={inputLabel} id="select-zone-label">
                Zone
              </InputLabel>
              <Select
                labelId="select-zone-label"
                id="select-zone"
                name="zone"
                value={inputs.zone}
                onChange={(e) => handleInput(e)}
                labelWidth={labelWidth}
                error={errorMessage !== ""}
              >
                {zoneList
                  .filter((elem) => elem.cdt["@id"] === inputs.cdt)
                  .map((elem) => (
                    <MenuItem key={elem["@id"]} value={elem["@id"]}>
                      {elem.name}
                    </MenuItem>
                  ))}
              </Select>
              {errorMessage !== "" && (
                <FormHelperText>{errorMessage}</FormHelperText>
              )}
            </FormControl>
          )}
        </Col>
      </Row>
    </>
  );
}
