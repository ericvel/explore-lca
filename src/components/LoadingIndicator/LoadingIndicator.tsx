import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./LoadingIndicator.css";

const LoadingIndicator = () => (
  <div className="loading-shading-mui">
    <CircularProgress className="loading-icon-mui" size={50} thickness={5} />
  </div>
);

export default LoadingIndicator;
