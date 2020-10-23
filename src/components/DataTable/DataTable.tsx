import React, { useState, useEffect, useReducer } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    SortingState,
    IntegratedSorting,
    VirtualTableState
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    VirtualTable
} from '@devexpress/dx-react-grid-material-ui';
import ColumnData from './ColumnData';
import { table } from 'console';


const VIRTUAL_PAGE_SIZE = 100;
var maxRows = 0;
var columns: Column[] = []
var columnExtensions: ColumnExtensions[] = []
var rowIdName: string = ''

const initialState = {
    rows: [],
    skip: 0,
    requestedSkip: 0,
    take: VIRTUAL_PAGE_SIZE * 2,
    totalCount: 0,
    loading: false,
    lastQuery: '',
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
            };
        case 'UPDATE_QUERY':
            return {
                ...state,
                lastQuery: payload,
            };
        case 'RESET_ROWS':
            return initialState
        default:
            return state;
    }
}

function setColumnData(tableName: string) {
    columns = ColumnData.getColumns(tableName);
    columnExtensions = ColumnData.getColumnExtensions(tableName);
    rowIdName = columns[0].name;
}


function DataTable(props: any) {
    const URL = `/api/${props.tableName}`;    
    const buildQueryString = (skip: any, take: any) => `${URL}?skip=${skip}&take=${take}`;

    const [state, dispatch] = useReducer(reducer, initialState);

    const getRemoteRows = (requestedSkip: any, take: any) => {
        dispatch({ type: 'START_LOADING', payload: { requestedSkip, take } });
    };

    const getRowId = (row: any) => {
        return row[rowIdName]
    }

    const loadData = () => {
        const {
            requestedSkip, take, lastQuery, loading,
        } = state;
        const query = buildQueryString(requestedSkip, take);
        if (query !== lastQuery && !loading) {
            dispatch({ type: 'FETCH_INIT' });
            console.log("Query: " + query)
            fetch(query)
                .then(response => response.json())
                .then((data) => {
                    console.log(data)
                    dispatch({
                        type: 'UPDATE_ROWS',
                        payload: {
                            skip: requestedSkip,
                            rows: data,
                            //totalCount: maxRows,
                        },
                    });
                })
                .catch(() => dispatch({ type: 'REQUEST_ERROR' }));
            dispatch({ type: 'UPDATE_QUERY', payload: query });
        }
    };

    const getMaxRows = () => {
        fetch(`/api/count/${props.tableName}`)
            .then(res => res.json())
            .then((result) => {
                    const count = result[0]['count(*)'];
                    console.log("Count: " + count);
                    maxRows = count;
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error: Error) => {
                    console.log("Error: " + error)
                }
            )
    };

    useEffect(() => {
        getMaxRows();
        setColumnData(props.tableName);
        dispatch({ type: 'RESET_ROWS' });
    }, [props.tableName])

    useEffect(() => {
        loadData();
    });

    const {
        rows, skip, totalCount, loading,
    } = state;

    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <VirtualTableState
                    loading={loading}
                    totalRowCount={maxRows}
                    pageSize={VIRTUAL_PAGE_SIZE}
                    skip={skip}
                    getRows={getRemoteRows}
                    infiniteScrolling={false}
                />
                <VirtualTable /* columnExtensions={columnExtensions} */ />
                <TableHeaderRow />
            </Grid>
        </Paper>
    );
    /////////////////////////////////////////////////////////////////////
    /*
        const [error, setError] = useState<Error | null>(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [rows, setRows] = useState([]);
    
        useEffect(() => {
    
            setColumnData(props.tableName);
    
            fetch(`/api/${props.tableName}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setRows(result);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error: Error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }, [props.tableName])
    
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <Paper>
                        <Grid
                            rows={rows}
                            columns={columns}
                        >
                            <SortingState
                            //defaultSorting={[{ columnName: 'building_name', direction: 'asc' }]}
                            />
                            <IntegratedSorting />
                            <Table columnExtensions={columnExtensions} />
                            <TableHeaderRow showSortingControls />
                        </Grid>
                    </Paper>
                </div>
            );
        }
    */

}

export default DataTable;
