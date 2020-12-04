import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../../redux/reducers';

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
    TableFixedColumns
} from '@devexpress/dx-react-grid-material-ui';
import _ from 'lodash';

import ColumnData from "./ColumnData";

interface Props {
    elementInventory: IMaterialInventory[] | false;
}

// const getRowId = (row: any) => row.idmaterialInventory;

const MaterialsTable = (props: Props) => {    
    const materialInventory = useSelector((state: IRootState) => state.materialInventory);

    const [columns] = useState(ColumnData.columns);
    const [columnExtensions] = useState(ColumnData.columnExtensions);
    const [defaultHiddenColumnNames] = useState(ColumnData.defaultHiddenColumnNames);
    const [tableColumnVisibilityColumnExtensions] = useState(ColumnData.tableColumnVisibilityColumnExtensions);
    const [leftColumns] = useState(['name']);
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
    
    // Displays only inventory for selected building element if one is selected
    const rows = props.elementInventory || materialInventory;

    return (
        <Paper>
            <Grid
                rows={rows}
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
                <TableFixedColumns
                    leftColumns={leftColumns}
                />
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