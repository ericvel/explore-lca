import React, { useState, useEffect, useCallback } from "react";
import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
    SortingState,
    IntegratedSorting,
    SearchState,
    DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    TableHeaderRow,
    VirtualTable,
    Toolbar,
    SearchPanel,
    ColumnChooser,
    TableColumnVisibility,
} from '@devexpress/dx-react-grid-material-ui';
import _ from 'lodash';

import ColumnData from "./ColumnData";


// const getRowId = (row: any) => row.idmaterialInventory;

const MaterialsTable = (props: any) => {
    const [materialInventory] = useState<IMaterialInventory[]>(props.materialInventory);
    const [columns] = useState(ColumnData.columns);
    const [columnExtensions] = useState(ColumnData.columnExtensions);
    const [defaultHiddenColumnNames] = useState(ColumnData.defaultHiddenColumnNames);
    const [tableColumnVisibilityColumnExtensions] = useState(ColumnData.tableColumnVisibilityColumnExtensions);
    const [gwpColumns] = useState(['A1A3', 'A4', 'B4_t', 'B4_m'])

    const GWPFormatter = ({value}: any) => value && value > 0.0 ? parseFloat(value).toFixed(3) : 0.0.toFixed(1);

    const GWPTypeProvider = (props: any) => (
        <DataTypeProvider
            formatterComponent={GWPFormatter}
            {...props}
        />
    );

    const changeSearchTerm = (value: any) => {
        console.log("Changed search term: ", value)
    };

    // Delays query so it is not fired on every keystroke
    const delayedCallback = useCallback(_.debounce(changeSearchTerm, 300), []);


    return (
        <Paper>
            <Grid
                rows={materialInventory}
                columns={columns}
            >
                <GWPTypeProvider
                    for={gwpColumns}
                />
                <SearchState
                    onValueChange={delayedCallback}
                />
                <SortingState />
                <IntegratedSorting />
                <VirtualTable columnExtensions={columnExtensions} />
                <TableHeaderRow showSortingControls />
                <TableColumnVisibility
                    defaultHiddenColumnNames={defaultHiddenColumnNames}
                    columnExtensions={tableColumnVisibilityColumnExtensions}
                />
                <Toolbar />
                <SearchPanel />
                <ColumnChooser />
            </Grid>
        </Paper>
    );
};

export default MaterialsTable;