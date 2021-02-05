import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const SimulationModeSwitch = () => {
  const dispatch = useDispatch();

  const isSimulationModeChecked = useSelector(
    (state: IRootState) => state.isSimulationModeActive
  );

  const handleSimulationModeChanged = () => {
    dispatch(allActions.uiActions.toggleSimulationMode());
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isSimulationModeChecked}
          onChange={handleSimulationModeChanged}
          name='simulationChecked'
          color='primary'
        />
      }
      label='Simulation mode'
    />
  );
};

export default SimulationModeSwitch;
