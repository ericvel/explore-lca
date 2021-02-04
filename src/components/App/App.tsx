import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "redux/actions";
import { IRootState } from "redux/reducers";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.css";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import BuildingsTable from "../BuildingsTable";
import BuildingDetails from "../BuildingDetails";
import HelpButton from "../HelpButton";
import SettingsButton from "../SettingsButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "55vw",
      marginTop: theme.spacing(2),
    },
    mainContent: {
      width: "90%",
    },
    titleBar: {
      marginBottom: theme.spacing(2),
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={3}
        justify="center"
        className={classes.container}
      >
        <Grid container className={classes.mainContent}>
          <Grid
            container
            item
            alignItems="center"
            justify="space-around"
            spacing={2}
            className={classes.titleBar}
          >
            <Grid item xs={10}>
              <Typography variant="h2">bLCAd Tool - GUI</Typography>
            </Grid>

            <Grid item xs={1}>
              <HelpButton alertContentId="main" iconSize="large" />
            </Grid>
            <Grid item xs={1}>
              <SettingsButton iconSize="large" />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <BuildingsTable />
          </Grid>
        </Grid>
      </Grid>

      <BuildingDetails />
    </Container>
  );
}

export default App;
