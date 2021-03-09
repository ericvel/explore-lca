import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "redux/actions";
import { IRootState } from "redux/reducers";

import { Router, Link } from "@reach/router";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.css";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import BuildingsTable from "../BuildingsTable";
import BuildingDetails from "../BuildingDetails";
import HelpButton from "../HelpButton";
import SettingsButton from "../SettingsButton";

import HomePage from "components/HomePage";
import SignIn from "components/SignIn";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "50vw",
      marginTop: theme.spacing(2),
    },
    mainContent: {
      width: "90%",
    },
    titleBar: {
      marginBottom: theme.spacing(2),
    },
  })
);

function App() {
  const currentUser = useSelector((state: IRootState) => state.currentUser);
  console.log("Current user: ", currentUser)
  const user = currentUser;
  return user ? (
    <HomePage />
  ) : (
    // <Router>
      <SignIn path='/' />
    // </Router>
  );
}

export default App;
