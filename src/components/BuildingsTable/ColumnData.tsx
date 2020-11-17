import { Column } from '@devexpress/dx-react-grid';
import { Table } from '@devexpress/dx-react-grid-material-ui';

class ColumnData {
    static readonly buildingsColumns: Column[] = [
        { name: 'building_identifier', title: 'ID' },
        { name: 'building_name', title: 'Building name' },
        { name: 'project', title: 'Project' },
        { name: 'calculation_method', title: 'Calculation method' },
        { name: 'main_data_source', title: 'Data source' },
        { name: 'study_type', title: 'Study type' },
        { name: 'study_year', title: 'Study year' },
        { name: 'lifetime', title: 'Lifetime' },
        { name: 'floor_area', title: 'Floor area (m\xB2)' },
        { name: 'heated_volume', title: 'Heated volume' },
        { name: 'area_footprint', title: 'Area footprint' },
        { name: 'area_roof', title: 'Area roof' },
        { name: 'area_wall', title: 'Area wall' },
        { name: 'area_windowAndDoor', title: 'Area window and door' },
        { name: 'heatloss_number', title: 'Heatloss number' },
        { name: 'comments', title: 'Comments' },
    ];

    static readonly materialsColumns: Column[] = [
        { name: 'idmaterials', title: 'ID' },
        { name: 'source', title: 'Source' },
        { name: 'name', title: 'Name' },
        { name: 'dataType', title: 'Data type' },
        { name: 'sourceType', title: 'Source type' },
        { name: 'dataYear', title: 'Data year' },
        { name: 'FU', title: 'FU' },
        { name: 'density', title: 'Density' },
        { name: 'EEf_A1A3', title: 'EEf_A1A3' },
        { name: 'RSL', title: 'RSL' },
        { name: 'idmaterialCat', title: 'Category ID' }, // replace with Category name
        { name: 'idlocationproduction', title: 'Production location ID' }, // replace with Production location name
        { name: 'comments', title: 'Comments' },
    ];

    static getColumns(tableName: string): Column[] {
        switch (tableName) {
            case 'buildings':
                return this.buildingsColumns;
            case 'materials':
                return this.materialsColumns;
            default:
                return []
        }
    }

    static readonly buildingsColumnExtensions: Table.ColumnExtension[] = [
        { columnName: 'building_identifier', width: 100 },
        { columnName: 'project', width: 120 },
        { columnName: 'building_name', width: 200, wordWrapEnabled: true },
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

    static readonly materialsColumnExtensions: Table.ColumnExtension[] = [
        { columnName: 'idmaterials', width: 100 },
        { columnName: 'source', width: 200, /* wordWrapEnabled: true */ },
        { columnName: 'name', width: 200, /* wordWrapEnabled: true */ },
        { columnName: 'dataType', width: 120 },
        { columnName: 'sourceType', width: 100 },
        { columnName: 'dataYear', width: 100 },
        { columnName: 'FU', width: 70 },
        { columnName: 'idmaterialCat', width: 100 },     
        { columnName: 'idlocationproduction', width: 170 },
        { columnName: 'comments', width: 400, /* wordWrapEnabled: true */ },
    ];

    static getColumnExtensions(tableName: string): Table.ColumnExtension[] {
        switch (tableName) {
            case 'buildings':
                return this.buildingsColumnExtensions;
            case 'materials':
                return this.materialsColumnExtensions;
            default:
                return []
        }
    }

    static getSearchableColumns(tableName: string): String {
        switch (tableName) {
            case 'buildings':
                return 'building_name,project';
            case 'materials':
                return 'source,name';
            default:
                return ''
        }
    }

    static readonly defaultHiddenColumnNames: string[] = [
        'calculation_method',
        'lifetime',
        'heated_volume',
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