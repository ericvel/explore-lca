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
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import SingleBuildingView from "./SingleBuildingView";
import MultipleBuildingsView from "./MultipleBuildingsView";

const drawerWidth = "50vw";

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
    noSelectionContainer: {
      height: "100vh",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      // padding: theme.spacing(2),
      // marginBottom: theme.spacing(2),
      width: drawerWidth,
    },
    content: {
      // margin: theme.spacing(1),
      padding: theme.spacing(2),
      // height: '600px'
    },
  })
);

const BuildingDetails = () => {
  const dispatch = useDispatch();

  const selectedBuildings = useSelector(
    (state: IRootState) => state.selectedBuildings
  );
  const canSelectMultipleBuildings = useSelector(
    (state: IRootState) => state.canSelectMultipleBuildings
  );

  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor='right'
    >
      {selectedBuildings.length > 0 ? (
        canSelectMultipleBuildings ? (
          <MultipleBuildingsView />
        ) : (
          <SingleBuildingView />
        )
      ) : (
        <Grid
          container
          justify='center'
          alignItems='center'
          className={classes.noSelectionContainer}
        >
          <Grid item xs={12}>
            <Typography variant='h5' color='textSecondary' align='center'>
              Select a building
            </Typography>
          </Grid>
        </Grid>
      )}
    </Drawer>
  );
};

export default BuildingDetails;
