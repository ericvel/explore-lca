import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "redux/actions";
import { IRootState } from "redux/reducers";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.css";

import "react-reflex/styles.css";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";

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
      height: "100vh",
    },
    titleBar: {
      marginBottom: theme.spacing(2),
    },
    content: {
      padding: theme.spacing(2),
      boxSizing: "border-box",
      // maxHeight: "100vh"
    },
  })
);

function HomePage() {
  
  const classes = useStyles();

  return (
    <ReflexContainer className={classes.container} orientation='vertical'>
      <ReflexElement className={classes.content} minSize={400}>
        <Grid
          container
          alignItems='center'
          justify='space-between'
          spacing={2}
          className={classes.titleBar}
        >
          <Grid item>
            <Typography variant='h2'>bLCAd Tool - GUI</Typography>
          </Grid>

          <Grid item>
            <HelpButton />
          </Grid>
        </Grid>

        {/* TODO: use flexbox or something to make height stretch all the way to bottom of viewport */}
        <div style={{ height: "80vh" }}>
          <BuildingsTable />
        </div>
      </ReflexElement>

      <ReflexSplitter />

      <ReflexElement minSize={400}>
        <div>
          <BuildingDetails />
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
}

export default HomePage;
