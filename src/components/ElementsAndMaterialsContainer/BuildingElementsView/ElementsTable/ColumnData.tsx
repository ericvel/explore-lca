import { Column } from '@devexpress/dx-react-grid';
import { Table } from '@devexpress/dx-react-grid-material-ui';

class ColumnData {

    static readonly columns: Column[] = [
        // { name: 'idbuilding_elements', title: 'ID' },
        { name: 'name', title: 'Name' },
        { name: 'A1A3', title: 'A1-A3' },
        { name: 'A4', title: 'A4' },
        { name: 'B4_m', title: 'B4 (m)' },
        { name: 'B4_t', title: 'B4 (t)' },
    ];

    static readonly columnExtensions: Table.ColumnExtension[] = [
        // { columnName: 'idbuilding_elements', width: 90 },
        { columnName: 'name', width: 180, wordWrapEnabled: true },
        { columnName: 'A1A3', width: 130 },
        { columnName: 'A4', width: 130 },
        { columnName: 'B4_m', width: 130 },
        { columnName: 'B4_t', width: 130 },
    ];

    static readonly defaultHiddenColumnNames: string[] = [
        
    ];

    static readonly tableColumnVisibilityColumnExtensions = [
        { columnName: 'name', togglingEnabled: false },
    ]
}

export default ColumnData;