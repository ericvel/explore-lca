import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import SignIn from "./components/SignIn";
import * as serviceWorker from "./serviceWorker";
import "fontsource-roboto";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import HomePage from "components/HomePage";
require("dotenv").config();

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
    {/* <HomePage /> */}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
