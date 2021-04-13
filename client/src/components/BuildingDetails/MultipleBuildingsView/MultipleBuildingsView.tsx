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

import MultipleBuildingsChart from "./MultipleBuildingsChart";
import SettingsButton from "components/SettingsButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(2),
    },
    heading: {
      marginBottom: theme.spacing(1)
    },
  })
);

const MultipleBuildingsView = () => {
  const dispatch = useDispatch();

  const selectedBuildings = useSelector(
    (state: IRootState) => state.selectedBuildings
  );
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container alignItems='center' justify='space-between' className={classes.heading}>
            <Grid item>
              <Typography variant='h5' color='textSecondary'>
                Embodied emissions
              </Typography>
            </Grid>
            <Grid item>
              <SettingsButton iconSize='default' />
            </Grid>
          </Grid>
          <MultipleBuildingsChart />
        </Grid>
      </Grid>
    </div>
  );
};

export default MultipleBuildingsView;
