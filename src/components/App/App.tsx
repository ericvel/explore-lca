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
  const [selectedBuildings, setSelectedBuildings] = useState<number[]>([]);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);

  /*  function handleTableChange(tableName: string) {
     setTableName(tableName);
   } */

  function handleSelectSingleRow(building: IBuilding) {
    setSelectedSingleBuilding(building);
  }

  function handleSelectMultipleRows(rowIds: number[]) {
    setSelectedBuildings(rowIds);
  }

  function handleCompareButtonClick() {
    console.log("Compare button clicked")
    console.log("Selected Buildings: ", selectedBuildings)
    setCompareDialogOpen(true);
  }

  function closeCompareDialog() {
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
          <BuildingsTable onSelectSingleRow={handleSelectSingleRow} onSelectMultipleRows={handleSelectMultipleRows} />
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
          <Button variant="contained" onClick={handleCompareButtonClick} disabled={selectedBuildings.length < 2} >Compare buildings</Button>
        </Grid>
      </Grid>

      <BuildingInfoPane selectedBuilding={selectedSingleBuilding} />
      <CompareBuildingsDialog isOpen={compareDialogOpen} close={closeCompareDialog} buildingIds={selectedBuildings} />
    </Container>
  );
}

export default App;