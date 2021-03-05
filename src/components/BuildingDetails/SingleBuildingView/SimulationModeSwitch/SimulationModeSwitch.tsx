import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { GroupBy } from "interfaces/enums";

const SimulationModeSwitch = () => {
  const dispatch = useDispatch();

  const isSimulationModeActive = useSelector(
    (state: IRootState) => state.isSimulationModeActive
  );
  const materialsGroupBy = useSelector(
    (state: IRootState) => state.materialsGroupBy
  );

  const handleSimulationModeChanged = () => {
    dispatch(allActions.uiActions.toggleSimulationMode());
    if (materialsGroupBy === GroupBy.BuildingElement) {
      dispatch(allActions.uiActions.setMaterialsGroupBy(GroupBy.Product));
    }
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isSimulationModeActive}
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
