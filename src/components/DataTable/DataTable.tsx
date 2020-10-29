import React, { useState, useEffect, useReducer, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    SortingState,
    IntegratedSorting,
    VirtualTableState,
    createRowCache
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    VirtualTable
} from '@devexpress/dx-react-grid-material-ui';
import ColumnData from './ColumnData';
import { Column } from '@devexpress/dx-react-grid';

import LoadingIndicator from '../LoadingIndicator';


const VIRTUAL_PAGE_SIZE = 150;
const MAX_ROWS = 50000;
var columns: Column[] = []
var columnExtensions: Table.ColumnExtension[] = []
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
    table: 'buildings',
    sorting: [],
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
        case 'CHANGE_TABLE':
            return {
                ...state,
                forceReload: true,
                requestedSkip: 0,
                rows: [],
                sorting: [],
                table: payload,
            };
        case 'CHANGE_SORTING':
            return {
                ...state,
                forceReload: true,
                rows: [],
                sorting: payload,
            };
        default:
            return state;
    }
}

function setColumnData(tableName: string) {
    columns = ColumnData.getColumns(tableName);
    columnExtensions = ColumnData.getColumnExtensions(tableName);
}


function DataTable(props: any) {
    const [state, dispatch] = useReducer(reducer, initialState);
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
            requestedSkip, take, table, filters, sorting,
        } = state;
        /* const filterStr = filters
            .map(({ columnName, value, operation }) => (
                `["${columnName}","${operation}","${value}"]`
            )).join(',"and",'); */
        const sortingConfig = sorting
            .map(({ columnName, direction }: any) => ({
                selector: columnName,
                desc: direction === 'desc',
            }));
        const sortingStr = JSON.stringify(sortingConfig);
        //const filterQuery = filterStr ? `&filter=[${escape(filterStr)}]` : '';
        const sortQuery = sortingStr ? `&sort=${escape(`${sortingStr}`)}` : '';

        return `/api/${table}?requireTotalCount=true&skip=${requestedSkip}&take=${take}${sortQuery}`;
        // return `${URL}?requireTotalCount=true&skip=${requestedSkip}&take=${take}${filterQuery}${sortQuery}`;
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

    useEffect(() => {
        console.log("UseEffect: Update columns")
        setColumnData(props.tableName);
        dispatch({ type: 'CHANGE_TABLE', payload: props.tableName });
    }, [props.tableName])

    useEffect(() => {
        console.log("UseEffect: LoadData")
        loadData();
    });

    const {
        rows, skip, totalCount, loading, sorting, //filters,
    } = state;

    return (
        <Paper style={{ height: '700px' }}>
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
                <SortingState
                    sorting={sorting}
                    onSortingChange={changeSorting}
                />
                <VirtualTable height="auto" columnExtensions={columnExtensions} />
                <TableHeaderRow showSortingControls />
            </Grid>
            {loading && <LoadingIndicator />}
        </Paper>
    );
}

export default DataTable;
