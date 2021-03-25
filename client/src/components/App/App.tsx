import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "redux/actions";
import { IRootState } from "redux/reducers";

import firebase from "firebase/app";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.css";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "styles/theme";

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
      setIsAuthenticated(false);
    }
  });

  return isAuthenticated ? (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  ) : (
    <SignIn />
  );
  /*  <ThemeProvider theme={theme}>
      {isAuthenticated ? <HomePage /> : <SignIn />}
    </ThemeProvider> */
}

export default App;
