import React, { useState, useEffect, useReducer, useMemo, useCallback, ReactText } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {
    Column,
    SortingState,
    VirtualTableState,
    createRowCache,
    SearchState,
    SelectionState
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
import LoadingIndicator from '../LoadingIndicator';


const VIRTUAL_PAGE_SIZE = 100;
const MAX_ROWS = 50000;
const URL = '/buildings'
const getRowId = (row: any) => row[Object.keys(row)[0]];
const Root = (props: any) => <Grid.Root {...props} style={{ height: '100%' }} />;

const initialState = {
    rows: [],
    skip: 0,
    requestedSkip: 0,
    take: VIRTUAL_PAGE_SIZE * 2,
    totalCount: 0,
    loading: false,
    lastQuery: '',
    sorting: [],
    searchTerm: '',
    searchableColumns: 'building_name,project',
    forceReload: false,
};

function reducer(state: any, { type, payload }: any) {
    switch (type) {
        case 'UPDATE_ROWS':
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case 'START_LOADING':
            return {
                ...state,
                requestedSkip: payload.requestedSkip,
                take: payload.take,
            };
        case 'REQUEST_ERROR':
            return {
                ...state,
                loading: false,
            };
        case 'FETCH_INIT':
            return {
                ...state,
                loading: true,
                forceReload: false,
            };
        case 'UPDATE_QUERY':
            return {
                ...state,
                lastQuery: payload,
            };
        case 'CHANGE_SORTING':
            return {
                ...state,
                forceReload: true,
                rows: [],
                sorting: payload,
            };
        case 'CHANGE_SEARCH_TERM':
            return {
                ...state,
                forceReload: true,
                requestedSkip: 0,
                rows: [],
                searchTerm: payload,
            };
        default:
            return state;
    }
}

function BuildingsTable(props: any) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [columns] = useState(ColumnData.columns);
    const [columnExtensions] = useState(ColumnData.columnExtensions);    

    const cache = useMemo(() => createRowCache(VIRTUAL_PAGE_SIZE), [VIRTUAL_PAGE_SIZE]);

    const updateRows = (skip: number, count: number, newTotalCount: number) => {
        dispatch({
            type: 'UPDATE_ROWS',
            payload: {
                skip: Math.min(skip, newTotalCount),
                rows: cache.getRows(skip, count),
                totalCount: newTotalCount < MAX_ROWS ? newTotalCount : MAX_ROWS,
            },
        });
    };

    const getRemoteRows = (requestedSkip: number, take: number) => {
        dispatch({ type: 'START_LOADING', payload: { requestedSkip, take } });
    };

    const buildQueryString = () => {
        const {
            requestedSkip, take, searchTerm, searchableColumns, filters, sorting,
        } = state;
        /* const filterStr = filters
            .map(({ columnName, value, operation }) => (
                `["${columnName}","${operation}","${value}"]`
            )).join(',"and",'); */
        const searchConfig = {
            searchTerm: searchTerm,
            columns: searchableColumns,
        };
        const searchString = JSON.stringify(searchConfig);
        const searchQuery = searchString ? `&search=${encodeURIComponent(`${searchString}`)}` : '';

        const sortingConfig = sorting
            .map(({ columnName, direction }: any) => ({
                selector: columnName,
                desc: direction === 'desc',
            }));
        const sortingStr = JSON.stringify(sortingConfig);
        //const filterQuery = filterStr ? `&filter=[${escape(filterStr)}]` : '';
        const sortQuery = sortingStr ? `&sort=${escape(`${sortingStr}`)}` : '';

        return `${URL}?requireTotalCount=true&skip=${requestedSkip}&take=${take}${searchQuery}${sortQuery}`;
    };

    const loadData = () => {
        const {
            requestedSkip, take, lastQuery, loading, forceReload, totalCount,
        } = state;
        const query = buildQueryString();
        if ((query !== lastQuery || forceReload) && !loading) {
            if (forceReload) {
                cache.invalidate();
            }
            const cached = cache.getRows(requestedSkip, take);
            if (cached.length === take) {
                updateRows(requestedSkip, take, totalCount);
            } else {
                console.log("Query: " + query)
                dispatch({ type: 'FETCH_INIT' });
                fetch(query)
                    .then(response => response.json())
                    .then(({ data, totalCount: newTotalCount }) => {
                        cache.setRows(requestedSkip, data);
                        updateRows(requestedSkip, take, newTotalCount);
                    })
                    .catch(() => dispatch({ type: 'REQUEST_ERROR' }));
            }
            dispatch({ type: 'UPDATE_QUERY', payload: query });
        }
    };

    const changeSorting = (value: any) => {
        dispatch({ type: 'CHANGE_SORTING', payload: value });
    };

    const changeSearchTerm = (value: any) => {
        console.log("Changed search term: ", value)
        dispatch({ type: 'CHANGE_SEARCH_TERM', payload: value });
    };

    // Delays query so it is not fired on every keystroke
    const delayedCallback = useCallback(_.debounce(changeSearchTerm, 300), []);

    useEffect(() => {
        loadData();
    });

    const [selectedRow, setSelectedRow] = useState<ReactText[]>([]);

    function changeSelection(selection: ReactText[]) {
        // Select one row or multiple rows at a time
        if (!multipleSwitchChecked) {
            const lastSelected = selection.find((selected) => selectedRow.indexOf(selected) === -1);

            if (lastSelected !== undefined) {
                setSelectedRow([lastSelected]);
            } else {
                // NOTE: Uncomment the next line in order to allow clear selection by double-click
                setSelectedRow([])
            }

            const rowId = selection[selection.length - 1];
            console.log("Selected row: ", rowId)
            props.onSelectSingleRow(rowId);
        } else {
            setSelectedRow(selection);
            props.onSelectMultipleRows(selection);
            console.log("Selected rows: ", selection)
        }
    }

    const [defaultHiddenColumnNames] = useState(ColumnData.defaultHiddenColumnNames);
    const [tableColumnVisibilityColumnExtensions] = useState(ColumnData.tableColumnVisibilityColumnExtensions);
    const [leftColumns] = useState([TableSelection.COLUMN_TYPE, 'building_name']);
    const [multipleSwitchChecked, setMultipleSwitchChecked] = useState(false);

    const handleMultipleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMultipleSwitchChecked(event.target.checked);
        setSelectedRow([]);
        props.onSelectSingleRow(); // Closes BuildingInfoPane if open
        console.log("Switch checked: ", event.target.checked);
    }

    const {
        rows, skip, totalCount, loading, sorting, //filters,
    } = state;

    return (
        <Paper style={{ height: '600px' }}>
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
                rootComponent={Root}
            >
                <VirtualTableState
                    loading={loading}
                    totalRowCount={totalCount}
                    pageSize={VIRTUAL_PAGE_SIZE}
                    skip={skip}
                    getRows={getRemoteRows}
                    infiniteScrolling={false}
                />
                <SearchState
                    onValueChange={delayedCallback}
                />
                <SortingState
                    sorting={sorting}
                    onSortingChange={changeSorting}
                />
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
                        label="Select multiple rows"
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
