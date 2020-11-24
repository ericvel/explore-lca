import React, { useEffect, useState, ReactText } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
//import './App.css';
import TableSelect from '../TableSelect'
import BuildingsTable from '../BuildingsTable';
import BuildingInfoPane from '../BuildingInfoPane';
import BuildingInfoDrawer from '../BuildingInfoDrawer';
import NavBar from '../NavBar';
import Button from '@material-ui/core/Button';

function App() {
  // const [tableName, setTableName] = useState('buildings');
  const [selectedBuildingId, setSelectedBuildingId] = useState<number>();

  /*  function handleTableChange(tableName: string) {
     setTableName(tableName);
   } */

  function handleSelectRow(rowId: number) {
    setSelectedBuildingId(rowId);
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
          <BuildingsTable /* tableName={tableName} */ onSelectRow={handleSelectRow} />
        </Grid>
        <Grid item xs>
          {/* <TableSelect tableName={tableName} onChange={handleTableChange} /> */}
          <Typography variant="body1" gutterBottom>
            Click on a row to see more details about the building, including its <b>building elements</b> and <b>materials</b>.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Select multiple rows to compare buildings and calculate average values.
          </Typography>
          <Button variant="contained">Compare buildings</Button>
        </Grid>
      </Grid>

      <BuildingInfoPane selectedBuildingId={selectedBuildingId} />
      {/* <BuildingInfoDrawer selectedBuildingId={selectedBuildingId} /> */}
    </Container>
  );
}

export default App;