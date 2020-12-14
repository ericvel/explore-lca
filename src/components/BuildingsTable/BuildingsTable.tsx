import React, { useState, useEffect, useCallback, ReactText } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from 'redux/actions';
import { IRootState } from 'redux/reducers';

import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {
    SortingState,
    IntegratedSorting,
    SearchState,
    SelectionState,
    IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Toolbar,
    SearchPanel,
    TableHeaderRow,
    ColumnChooser,
    TableColumnVisibility,
    VirtualTable,
    TableSelection,
    TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';
import {
    Template,
    TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import _ from 'lodash';

import ColumnData from './ColumnData';
import LoadingIndicator from 'components/LoadingIndicator';

const URL = '/buildings'
const getRowId = (row: any) => row[Object.keys(row)[0]];
const Root = (props: any) => <Grid.Root {...props} style={{ height: '100%' }} />;

const getHiddenColumnsFilteringExtensions = (hiddenColumnNames: string[]) => hiddenColumnNames
    .map(columnName => ({
        columnName,
        predicate: () => false,
    }));

function BuildingsTable() {
    const dispatch = useDispatch();
    const buildings = useSelector((state: IRootState) => state.buildings);

    const [columns] = useState(ColumnData.columns);
    const [columnExtensions] = useState(ColumnData.columnExtensions);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>();

    const [defaultHiddenColumnNames] = useState(ColumnData.defaultHiddenColumnNames);
    const [tableColumnVisibilityColumnExtensions] = useState(ColumnData.tableColumnVisibilityColumnExtensions);
    const [leftColumns] = useState([TableSelection.COLUMN_TYPE, 'building_name']);
    const multipleSwitchChecked = useSelector((state: IRootState) => state.canSelectMultipleBuildings);

    const handleMultipleSwitchChange = () => {
        dispatch(allActions.flagActions.toggleCanSelectMultiple());
        dispatch(allActions.buildingActions.deselectAllBuildings());
        setSelectedRow([]);
    }


    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        if (!loading) {
            setLoading(true);

            fetch(URL)
                .then(response => response.json())
                .then(data => {
                    dispatch(allActions.buildingActions.setBuildings(data));
                    setLoading(false);
                    console.log("Fetched rows: ", buildings)
                })
                .catch(() => setLoading(false));
        }
    };

    const changeSearchTerm = (value: any) => {
        console.log("Changed search term: ", value)
        setSearchTerm(value);
    };

    // Delays query so it is not fired on every keystroke
    const delayedCallback = useCallback(_.debounce(changeSearchTerm, 300), []);

    const [filteringColumnExtensions, setFilteringColumnExtensions] = useState(
        getHiddenColumnsFilteringExtensions(defaultHiddenColumnNames),
    );

    const onHiddenColumnNamesChange = (hiddenColumnNames: string[]) => setFilteringColumnExtensions(
        getHiddenColumnsFilteringExtensions(hiddenColumnNames),
    );

    const [selectedRow, setSelectedRow] = useState<ReactText[]>([]);

    function changeSelection(selection: ReactText[]) {
        // Select one row or multiple rows at a time
        if (!multipleSwitchChecked) {
            const lastSelected = selection.find((selected) => selectedRow.indexOf(selected) === -1);

            if (lastSelected !== undefined) {
                setSelectedRow([lastSelected]);

                const rowId = selection[selection.length - 1];
                console.log("Selected row: ", rowId)
                const building = buildings.find(building => building.idbuildings === rowId);
                if (building !== undefined) dispatch(allActions.buildingActions.selectBuildings([building]));
            } else {
                // Clear selection by double-click on same row
                setSelectedRow([]);
                dispatch(allActions.buildingActions.deselectAllBuildings());
            }

        } else {
            setSelectedRow(selection);
            const selectedBuildings = buildings.filter(building => selection.includes(building.idbuildings));
            dispatch(allActions.buildingActions.selectBuildings(selectedBuildings));
        }
    }

    return (
        <Paper style={{ height: '600px' }}>
            <Grid
                rows={buildings}
                columns={columns}
                getRowId={getRowId}
                rootComponent={Root}
            >
                <SearchState
                    onValueChange={delayedCallback}
                />
                <IntegratedFiltering
                    columnExtensions={filteringColumnExtensions}
                />
                <SortingState />
                <IntegratedSorting />
                <SelectionState
                    selection={selectedRow}
                    onSelectionChange={changeSelection}
                />
                <VirtualTable height="auto" columnExtensions={columnExtensions} />
                <TableHeaderRow showSortingControls />
                <TableSelection
                    selectByRowClick
                    highlightRow={!multipleSwitchChecked}
                    showSelectionColumn={multipleSwitchChecked}
                />
                <TableFixedColumns
                    leftColumns={leftColumns}
                />
                <TableColumnVisibility
                    defaultHiddenColumnNames={defaultHiddenColumnNames}
                    columnExtensions={tableColumnVisibilityColumnExtensions}
                    onHiddenColumnNamesChange={onHiddenColumnNamesChange}
                />
                <Toolbar />
                <Template
                    name="toolbarContent"
                >
                    <TemplatePlaceholder />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={multipleSwitchChecked}
                                onChange={handleMultipleSwitchChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Select multiple"
                    />
                </Template>
                <SearchPanel />
                <ColumnChooser />
            </Grid>
            {loading && <LoadingIndicator />}
        </Paper>
    );
}

export default BuildingsTable;
