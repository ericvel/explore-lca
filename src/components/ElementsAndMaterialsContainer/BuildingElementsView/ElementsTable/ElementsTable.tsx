import React, { useState, useEffect, useCallback, ReactText } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'redux/reducers';
import allActions from 'redux/actions';

import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import {
    SortingState,
    IntegratedSorting,
    SearchState,
    SelectionState,
    DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    TableHeaderRow,
    Table,
    VirtualTable,
    Toolbar,
    SearchPanel,
    ColumnChooser,
    TableColumnVisibility,
    TableFixedColumns,
    TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import _ from 'lodash';

import ColumnData from "./ColumnData";

interface Props {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        customRow: {
            '&:hover': {
                backgroundColor: '#F5F5F5',
                cursor: 'pointer'
            }
        },
    }),
);

// const getRowId = (row: any) => row.idmaterialInventory;

const ElementsTable = (props: Props) => {
    const dispatch = useDispatch();

    const buildingElements = useSelector((state: IRootState) => state.buildingElements);
    const selectedBuildingElement = useSelector((state: IRootState) => state.selectedBuildingElement);

    const [columns] = useState(ColumnData.columns);
    const [columnExtensions] = useState(ColumnData.columnExtensions);
    const [gwpColumns] = useState(['A1A3', 'A4', 'B4_t', 'B4_m'])
    const [tooltipColumns] = useState(['name']);

    const getChildElements = (parentElement: IBuildingElement) => {
        const childElements = buildingElements.filter(element => element.idparent === parentElement.idlevels);
        if (childElements !== undefined) {
            return childElements;
        }

        return [];
    }

    const CustomTableRow = (props: any) => (
        <VirtualTable.Row
            className={useStyles().customRow}
            onClick={() => handleRowClick(props.row)}
            {...props}
        />
    );

    const TooltipFormatter = ({ value }: any) => (
        <Tooltip title={(
            <span>
                Go to sub-elements
            </span>
        )}
        >
            <span>
                {value}
            </span>
        </Tooltip>
    );

    const CellTooltip = (props: any) => (
        <DataTypeProvider
            formatterComponent={TooltipFormatter}
            {...props}
        />
    );

    const handleRowClick = (row: IBuildingElement) => {
        dispatch(allActions.elementAndMaterialActions.selectBuildingElement(row));
        dispatch(allActions.elementAndMaterialActions.addToElementRoute(row));
    }

    const GWPFormatter = ({ value }: any) => value && value > 0.0 ? parseFloat(value).toFixed(3) : 0.0.toFixed(1);

    const GWPTypeProvider = (props: any) => (
        <DataTypeProvider
            formatterComponent={GWPFormatter}
            {...props}
        />
    );

    const rows = getChildElements(selectedBuildingElement);

    const height = 232 + (rows.length * 50);

    return (
        <Grid
            rows={rows}
            columns={columns}
        >
            <CellTooltip
                for={tooltipColumns}
            />
            <GWPTypeProvider
                for={gwpColumns}
            />
            <SortingState />
            <IntegratedSorting />
            <VirtualTable
                columnExtensions={columnExtensions}
                rowComponent={CustomTableRow}
                height={height}
            />
            <TableHeaderRow showSortingControls />
        </Grid>
    );
};

export default ElementsTable;