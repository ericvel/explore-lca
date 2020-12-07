import React, { useEffect, useState, ReactText } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../redux/actions';
import { IRootState } from '../../redux/reducers';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import BuildingsTable from '../BuildingsTable';
import BuildingDetails from '../BuildingDetails';
import BuildingInfoPane from '../BuildingInfoPane';
import CompareBuildingsDialog from '../CompareBuildingsDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '55vw',
      marginTop: theme.spacing(2)
    },
    mainContent: {
      width: '90%'
    },
    titleBar: {
      marginBottom: theme.spacing(2)
    }
  }),
);

function App() {
  const dispatch = useDispatch();
  const selectedBuildings = useSelector((state: IRootState) => state.buildings);

  function handleCompareButtonClick() {
    dispatch(allActions.flagActions.toggleCompareDialogOpen());
  }

  const classes = useStyles();

  return (
    <Container maxWidth="xl" >
      <Grid container spacing={3} justify="center" className={classes.container} >
        <Grid container className={classes.mainContent} >
          <Grid container item alignItems="center" justify="space-around" spacing={2} className={classes.titleBar}>
            <Grid item xs={10}>
              <Typography variant="h2" >
                bLCAd Tool - GUI
                </Typography>
            </Grid>
  
            <Grid item >
              <IconButton aria-label="help" >
                <HelpOutlineIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <BuildingsTable />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Click on a row to see more details about the building, including its <b>building elements</b> and <b>materials</b>.
            </Typography>
            <Typography variant="body1" >
              Select multiple rows to compare buildings and calculate average values.
            </Typography>
            <Typography variant="body1" gutterBottom>
              You must select <b>at least two buildings</b>.
            </Typography>
            <Button variant="contained" onClick={handleCompareButtonClick} disabled={selectedBuildings.length < 2} >Compare buildings</Button>
          </Grid>
        </Grid>
      </Grid>

      <BuildingDetails />
      {/* <BuildingInfoPane /> */}
      <CompareBuildingsDialog />
    </Container>
  );
}

export default App;