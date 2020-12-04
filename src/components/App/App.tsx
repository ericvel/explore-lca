import React, { useEffect, useState, ReactText } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../redux/actions';
import { IRootState } from '../../redux/reducers';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import BuildingsTable from '../BuildingsTable';
import BuildingInfoPane from '../BuildingInfoPane';
import CompareBuildingsDialog from '../CompareBuildingsDialog';

function App() {
  const dispatch = useDispatch();
  const selectedBuildings = useSelector((state: IRootState) => state.buildings);
  
  function handleCompareButtonClick() {
    dispatch(allActions.flagActions.toggleCompareDialogOpen());
  }

  return (
    <Container>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography variant="h2" gutterBottom>
              bLCAd Tool - GUI
              </Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <BuildingsTable />
        </Grid>
        <Grid item xs>
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

      <BuildingInfoPane />
      <CompareBuildingsDialog />
    </Container>
  );
}

export default App;