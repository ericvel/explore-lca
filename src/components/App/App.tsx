import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "redux/actions";
import { IRootState } from "redux/reducers";

import firebase from "firebase/app";

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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      setIsAuthenticated(true);
    } else {
      // No user is signed in.
      setIsAuthenticated(false)
    }
  });

  return isAuthenticated ? (
    <HomePage />
  ) : (
    <SignIn />
  );
}

export default App;
