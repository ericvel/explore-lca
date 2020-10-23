interface Column {
    name: string;
    title: string;
}

interface ColumnExtensions {
    columnName: string;
    width: number|string;
    wordWrapEnabled?: boolean;
}

class ColumnData {
    static readonly buildingsColumns: Column[] = [
        { name: 'building_identifier', title: 'Building ID' },
        { name: 'building_name', title: 'Building name' },
        { name: 'project', title: 'Project' },
        { name: 'calculation_method', title: 'Calculation method' },
        { name: 'main_data_source', title: 'Data source' },
        { name: 'study_type', title: 'Study type' },
        { name: 'study_year', title: 'Study year' },
        { name: 'lifetime', title: 'Lifetime' },
        { name: 'floor_area', title: 'Floor area (m\xB2)' },
        { name: 'heated_volume', title: 'Heated volume' },
        { name: 'area_footprint', title: 'Area footprint' }
    ];

    static readonly materialsColumns: Column[] = [
        { name: 'source', title: 'Source' },
        { name: 'name', title: 'Name' },
        { name: 'dataType', title: 'Data type' },
        { name: 'sourceType', title: 'Source type' },
        { name: 'dataYear', title: 'Data year' },
        { name: 'FU', title: 'FU' },
        { name: 'density', title: 'Density' },
        { name: 'EEf_A1A3', title: 'EEf_A1A3' },
        { name: 'RSL', title: 'RSL' },
        { name: 'comments', title: 'Comments' },
        { name: 'idmaterialCat', title: 'Category ID' }, // replace with Category name
        { name: 'idlocationproduction', title: 'Production location ID' } // replace with Production location name
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

    static readonly buildingsColumnExtensions: ColumnExtensions[] = [
        { columnName: 'building_name', width: 200, wordWrapEnabled: true },
        { columnName: 'main_data_source', width: 'auto' },
        { columnName: 'study_type', width: 160 },
        { columnName: 'floor_area', width: 120 },
    ];

    static readonly materialsColumnExtensions: ColumnExtensions[] = [
        { columnName: 'source', width: 200, wordWrapEnabled: true },
        { columnName: 'name', width: 'auto' },
        { columnName: 'dataType', width: 160 },
        { columnName: 'sourceType', width: 120 },
    ];

    static getColumnExtensions(tableName: string): ColumnExtensions[] {
        switch (tableName) {
            case 'buildings':
                return this.buildingsColumnExtensions;
            case 'materials':
                return this.materialsColumnExtensions;
            default:
                return []
        }
    }
}

export default ColumnData;