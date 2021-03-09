import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import MaterialsContainer from "components/MaterialsContainer";
import SingleBuildingChart from "./SingleBuildingChart";
import SimulationModeSwitch from "./SimulationModeSwitch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buildingSection: {
      marginBottom: theme.spacing(2),
    },
    divider: {
      marginBottom: theme.spacing(2),
    },
    elementSection: {
      marginTop: theme.spacing(2),
    },
    buildingInfoLabels: {
      fontWeight: "bold",
    },
    content: {
      // margin: theme.spacing(1),
      padding: theme.spacing(2),
      // height: '600px'
    },
  })
);

const initialBuildingState: IBuilding = {
  idbuildings: 0,
  building_identifier: "",
  building_name: "",
  project: "",
  country: "",
  city: "",
  typology: "",
  construction_type: "",
  lifetime: 0,
  floor_area: 0,
  A1A3: null,
  A4: null,
  B4_m: null,
  B4_t: null,
};

function SingleBuildingView() {
  const dispatch = useDispatch();

  const selectedBuildings = useSelector(
    (state: IRootState) => state.selectedBuildings
  );

  const isSimulationModeChecked = useSelector(
    (state: IRootState) => state.isSimulationModeActive
  );

  const handleSimulationModeChanged = () => {
    dispatch(allActions.uiActions.toggleSimulationMode());
  };

  const {
    building_identifier,
    building_name,
    project,
    typology,
    construction_type,
    floor_area,
    A1A3,
    A4,
    B4_m,
    B4_t,
  } = selectedBuildings[0];

  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Grid container spacing={3} className={classes.buildingSection}>
        <Grid item container alignItems='flex-start' justify='space-between'>
          <Grid item xs={8}>
            <Typography variant='h4' color='textPrimary'>
              {building_name}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary' gutterBottom>
              {building_identifier}
            </Typography>
          </Grid>
          <Grid item>
            <SimulationModeSwitch />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h5' color='textSecondary' gutterBottom>
            General info
          </Typography>
          <div>
            <TextField
              key={project || "project"}
              inputProps={{
                readOnly: true,
                disabled: true,
              }}
              InputProps={{ disableUnderline: true }}
              fullWidth={true}
              label='Project'
              name='project'
              margin='dense'
              defaultValue={project || "nil"}
            />
            <TextField
              key={typology || "typology"}
              inputProps={{
                readOnly: true,
                disabled: true,
              }}
              InputProps={{ disableUnderline: true }}
              fullWidth={true}
              label='Typology'
              name='typology'
              margin='dense'
              defaultValue={typology || "nil"}
            />
            <TextField
              key={construction_type || "c_type"}
              inputProps={{
                readOnly: true,
                disabled: true,
              }}
              InputProps={{ disableUnderline: true }}
              fullWidth={true}
              label='Construction type'
              name='construction_type'
              margin='dense'
              defaultValue={construction_type || "nil"}
            />
            <TextField
              key={floor_area || "f_area"}
              inputProps={{
                readOnly: true,
                disabled: true,
              }}
              InputProps={{ disableUnderline: true }}
              fullWidth={true}
              label='Floor area'
              name='floor_area'
              margin='dense'
              defaultValue={floor_area + " m\xB2" || "nil"}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h5' color='textSecondary' gutterBottom>
            Embodied emissions
          </Typography>
          <SingleBuildingChart />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs>
          <Divider variant='middle' light={true} className={classes.divider} />
          <MaterialsContainer />
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleBuildingView;
