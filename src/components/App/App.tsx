import React, { useEffect, useState, ReactText } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//import './App.css';
import TableSelect from '../TableSelect';
import BuildingsTable from '../BuildingsTable';
import BuildingInfoPane from '../BuildingInfoPane';
import BuildingInfoDrawer from '../BuildingInfoDrawer';
import NavBar from '../NavBar';
import CompareBuildingsDialog from '../CompareBuildingsDialog';

function App() {
  // const [tableName, setTableName] = useState('buildings');
  const [selectedBuildingId, setSelectedBuildingId] = useState<number>();
  const [selectedSingleBuilding, setSelectedSingleBuilding] = useState<IBuilding>();
  const [selectedMultipleBuildings, setSelectedMultipleBuildings] = useState<IBuilding[]>([]);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);

  /*  function handleTableChange(tableName: string) {
     setTableName(tableName);
   } */

  function handleSelectSingleBuilding(building: IBuilding) {
    setSelectedSingleBuilding(building);
  }

  function handleSelectMultipleBuildings(buildings: IBuilding[]) {
    setSelectedMultipleBuildings(buildings);
  }

  function handleCompareButtonClick() {

    console.log("Selected Buildings: ", selectedMultipleBuildings)
    setCompareDialogOpen(true);
  }

  function handleCloseCompareDialog() {
    setCompareDialogOpen(false);
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
          <BuildingsTable onSelectSingleBuilding={handleSelectSingleBuilding} onSelectMultipleBuildings={handleSelectMultipleBuildings} />
        </Grid>
        <Grid item xs>
          {/* <TableSelect tableName={tableName} onChange={handleTableChange} /> */}
          <Typography variant="body1" gutterBottom>
            Click on a row to see more details about the building, including its <b>building elements</b> and <b>materials</b>.
          </Typography>
          <Typography variant="body1" >
            Select multiple rows to compare buildings and calculate average values.
          </Typography>
          <Typography variant="body1" gutterBottom>
            You must select <b>at least two buildings</b>.
          </Typography>
          <Button variant="contained" onClick={handleCompareButtonClick} disabled={selectedMultipleBuildings.length < 2} >Compare buildings</Button>
        </Grid>
      </Grid>

      <BuildingInfoPane selectedBuilding={selectedSingleBuilding} />
      <CompareBuildingsDialog isOpen={compareDialogOpen} onClose={handleCloseCompareDialog} buildings={selectedMultipleBuildings} />
    </Container>
  );
}

export default App;