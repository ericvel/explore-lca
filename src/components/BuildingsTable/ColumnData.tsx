import { Column } from '@devexpress/dx-react-grid';
import { Table } from '@devexpress/dx-react-grid-material-ui';

class ColumnData {
    static readonly columns: Column[] = [
        { name: 'building_identifier', title: 'ID' },
        { name: 'building_name', title: 'Building name' },
        { name: 'project', title: 'Project' },
        { name: 'country', title: 'Country' },
        { name: 'city', title: 'City' },
        { name: 'typology', title: 'Typology' },
        { name: 'construction_type', title: 'Construction type' },
        { name: 'built_status', title: 'Built status' },
        { name: 'energy_ambition_level', title: 'Energy ambition level' },
        { name: 'calculation_method', title: 'Calculation method' },
        { name: 'main_data_source', title: 'Data source' },
        { name: 'study_type', title: 'Study type' },
        { name: 'study_year', title: 'Study year' },
        { name: 'lifetime', title: 'Lifetime' },
        { name: 'floor_area', title: 'Floor area (m\xB2)' },
        { name: 'A1A3', title: 'A1-A3' },
        { name: 'A4', title: 'A4' },
        { name: 'B4_m', title: 'B4 (m)' },
        { name: 'B4_t', title: 'B4 (t)' },
        { name: 'GWP_B6', title: 'B6' },
        { name: 'GWP_B7', title: 'B7' },
        { name: 'heated_volume', title: 'Heated volume' },
        { name: 'area_footprint', title: 'Area footprint' },
        { name: 'area_roof', title: 'Area roof' },
        { name: 'area_wall', title: 'Area wall' },
        { name: 'area_windowAndDoor', title: 'Area window and door' },
        { name: 'heatloss_number', title: 'Heatloss number' },
        { name: 'comments', title: 'Comments' },
    ];

    static readonly columnExtensions: Table.ColumnExtension[] = [
        { columnName: 'building_identifier', width: 100 },
        { columnName: 'building_name', width: 200, wordWrapEnabled: true },
        { columnName: 'project', width: 120 },
        { columnName: 'country', width: 110 },
        { columnName: 'city', width: 120 },
        { columnName: 'typology', width: 130 },
        { columnName: 'construction_type', width: 160 },
        { columnName: 'built_status', width: 120 },
        { columnName: 'energy_ambition_level', width: 180 },
        { columnName: 'calculation_method', width: 170 },
        { columnName: 'main_data_source', width: 120 },
        { columnName: 'study_type', width: 160 },
        { columnName: 'study_year', width: 120 },
        { columnName: 'lifetime', width: 100 },
        { columnName: 'floor_area', width: 150 },
        { columnName: 'heated_volume', width: 150 },
        { columnName: 'area_footprint', width: 150 },
        { columnName: 'area_roof', width: 150 },
        { columnName: 'area_wall', width: 150 },
        { columnName: 'area_windowAndDoor', width: 150 },        
        { columnName: 'heatloss_number', width: 150 },
        { columnName: 'comments', width: 400, wordWrapEnabled: true },
    ];

    static readonly defaultHiddenColumnNames: string[] = [
        'country',
        'built_status',
        'energy_ambition_level',
        'main_data_source',
        'calculation_method',
        'lifetime',
        'heated_volume',
        'area_footprint',
        'area_roof',
        'area_wall',
        'area_windowAndDoor',
        'heatloss_number',
        'comments',
    ];

    static readonly tableColumnVisibilityColumnExtensions = [
        { columnName: 'building_identifier', togglingEnabled: false },
        { columnName: 'building_name', togglingEnabled: false },
    ]
}

export default ColumnData;