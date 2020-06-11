import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckitemCard from "./CheckitemCard";
import { Loading } from "@horizon/components-react";
import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { BrowserRouter as Router, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    minWidth: "200px",
  },
}));

export default function CheckitemList(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    checkitems: [],
    isLoading: true,
    errors: null,
  });

  const getCheckitems = () => {
    axios
      .get("/checkitems")
      .then((res) => {
        setState({ checkitems: res.data["hydra:member"], isLoading: false });
        console.log(res.data["hydra:member"]);
      })
      .catch((err) => setState({ errors: err, isLoading: false }));
  };
  useEffect(() => {
    getCheckitems();
  }, []);

  if (!state.isLoading)
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={1}
        >
          {state.checkitems.map((row) => (
            <Grid item key={row["@id"]}>
              <Link
                to={"/admin/checkitems/" + row["@id"].split("/")[3]}
                style={{ textDecoration: "none" }}
              >
                <CheckitemCard key={row["@id"]} data={row} fullSize={false} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  else {
    return <Loading dots={true}>Loading...</Loading>;
  }
}
