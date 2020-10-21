import React from 'react';
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



const rows = [
    { id: 0, building_identifier: 'NU001', building_name: 'Råstølen sykehjem - concrete, lowcarbon', project: 'Asplan Viak', main_data_source: 'EPD', study_type: 'industry, certification', study_year: '2014', lifetime: '60', floor_area: 8076, heated_volume: 319, area_footprint: 485 },
    { id: 1, building_identifier: 'SC003', building_name: 'Prinsdal skole' }
];

function DataTable() {
    return (
        <div>
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <Table />
                    <TableHeaderRow />
                </Grid>
            </Paper>
        </div>
    );
}

export default DataTable;
