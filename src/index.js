
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import SignIn from "./components/SignIn";
import * as serviceWorker from "./serviceWorker";
import "fontsource-roboto";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers";
require("dotenv").config();
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
    {/* <SignIn /> */}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
