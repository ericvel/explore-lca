import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import {
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';



function DataTable() {
    const [error, setError] = useState<Error | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rows, setRows] = useState([]);

    const [columns] = useState([
        { name: 'building_identifier', title: 'Building ID' },
        { name: 'building_name', title: 'Building name' },
        { name: 'project', title: 'Project' },
        //{ name: 'calculation_method', title: 'Calculation method' },
        { name: 'main_data_source', title: 'Data source' },
        { name: 'study_type', title: 'Study type' },
        { name: 'study_year', title: 'Study year' },
        { name: 'lifetime', title: 'Lifetime' },
        { name: 'floor_area', title: 'Floor area (m\xB2)' },
        { name: 'heated_volume', title: 'Heated volume' },
        { name: 'area_footprint', title: 'Area footprint' }
    ]);

    const [tableColumnExtensions] = useState([
        { columnName: 'building_name', width: 200, wordWrapEnabled: true },
        { columnName: 'main_data_source', width: 'auto' },
        { columnName: 'study_type', width: 160 },
        { columnName: 'floor_area', width: 120 },
    ]);

    useEffect(() => {
        fetch(`/api/buildings`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setRows(result);
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
                        rows={rows}
                        columns={columns}
                    >
                        <SortingState
                            //defaultSorting={[{ columnName: 'building_name', direction: 'asc' }]}
                        />
                        <IntegratedSorting />
                        <Table columnExtensions={tableColumnExtensions} />
                        <TableHeaderRow showSortingControls />
                    </Grid>
                </Paper>
            </div>
        );
    }


}

export default DataTable;
