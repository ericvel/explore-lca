import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './LoadingIndicator.css';

const LoadingIndicator = () => (
  <div className="loading-shading-mui">
    <CircularProgress className="loading-icon-mui" />
  </div>
);

export default LoadingIndicator;