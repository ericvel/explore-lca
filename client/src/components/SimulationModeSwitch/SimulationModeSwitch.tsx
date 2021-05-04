import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

import { GroupBy } from "interfaces/enums";
import theme from "styles/theme";

const CustomSwitch = withStyles({
  switchBase: {
    // color: theme.palette.simulated.light,
    "&$checked": {
      color: theme.palette.simulated.main,
    },
    "&$checked + $track": {
      backgroundColor: theme.palette.simulated.main,
    },
  },
  checked: {},
  track: {},
})(Switch);

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
    if (materialsGroupBy !== GroupBy.Product) {
      dispatch(allActions.uiActions.setMaterialsGroupBy(GroupBy.Product));
    }
  };

  return (
    <FormControlLabel
      control={
        <CustomSwitch
          checked={isSimulationModeActive}
          onChange={handleSimulationModeChanged}
          name='simulationChecked'
          color='primary'
          // size="small"
        />
      }
      label='Edit mode'
    />
  );
};

export default SimulationModeSwitch;
