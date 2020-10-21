import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

const columns = [
    { name: 'building_identifier', title: 'Building ID', width: 100 },
    { name: 'building_name', title: 'Building name', width: 200 },
    { name: 'project', title: 'Project', width: 130 },
    //{ name: 'calculation_method', title: 'Calculation method', width: 100 },
    { name: 'main_data_source', title: 'Data source', width: 100 },
    { name: 'study_type', title: 'Study type', width: 170 },
    { name: 'study_year', title: 'Study year', width: 100 },
    { name: 'lifetime', title: 'Lifetime', width: 80 },
    { name: 'floor_area', title: 'Floor area (m\xB2)', width: 120 },
    { name: 'heated_volume', title: 'Heated volume', width: 120 },
    { name: 'area_footprint', title: 'Area footprint', width: 130 }
];

function DataTable() {
    const [error, setError] = useState<Error|null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        fetch(`/api/buildings`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setBuildings(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error: Error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div>
                <Paper>
                    <Grid
                        rows={buildings}
                        columns={columns}
                    >
                        <Table />
                        <TableHeaderRow />
                    </Grid>
                </Paper>
            </div>
        );
      }

    
}

export default DataTable;
