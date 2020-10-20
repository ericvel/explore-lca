import React from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';

const defaultColumnProperties = {
    resizable: true,
    //width: 120
};

const columns = [
    { key: 'building_identifier', name: 'Building ID', width: 100 },
    { key: 'building_name', name: 'Building name', width: 200 },
    { key: 'project', name: 'Project', width: 130 },
    //{ key: 'calculation_method', name: 'Calculation method', width: 100 },
    { key: 'main_data_source', name: 'Data source', width: 100 },
    { key: 'study_type', name: 'Study type', width: 170 },
    { key: 'study_year', name: 'Study year', width: 100 },
    { key: 'lifetime', name: 'Lifetime', width: 80 },
    { key: 'floor_area', name: 'Floor area (m\xB2)', width: 120 },
    { key: 'heated_volume', name: 'Heated volume', width: 120 },
    { key: 'area_footprint', name: 'Area footprint', width: 130 }
].map(c => ({ ...c, ...defaultColumnProperties }));



const rows = [
    { id: 0, building_identifier: 'NU001', building_name: 'Råstølen sykehjem - concrete, lowcarbon', project: 'Asplan Viak', main_data_source: 'EPD', study_type: 'industry, certification', study_year: '2014', lifetime: '60', floor_area: 8076, heated_volume: 319, area_footprint: 485 },
    { id: 1, building_identifier: 'SC003', building_name: 'Prinsdal skole' }
];

function DataTable() {
    return (
        <div>
            <DataGrid
                columns={columns}
                rows={rows}
            />
        </div>
    );
}

export default DataTable;
