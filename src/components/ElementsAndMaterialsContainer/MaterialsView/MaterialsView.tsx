import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    TableHeaderRow,
    VirtualTable
} from '@devexpress/dx-react-grid-material-ui';


// const getRowId = (row: any) => row.idmaterialInventory;

const MaterialsView = (props: any) => {
    const [materialInventory] = useState<MaterialInventory[]>(props.materialInventory);

    const [columns] = useState([
        { name: 'idmaterials', title: 'ID' },
        { name: 'name', title: 'Name' },
        { name: 'source', title: 'Source' },
        { name: 'dataType', title: 'Data type' },
        { name: 'sourceType', title: 'Source type' },
        { name: 'dataYear', title: 'Data year' },
        { name: 'FU', title: 'FU' },
        { name: 'EEf_A1A3', title: 'EEf_A1A3' },
        { name: 'RSL', title: 'RSL' },
        { name: 'comments', title: 'comments' },
        { name: 'materialCat', title: 'Category' },
    ]);

    return (
        <Paper>
            <Grid
                rows={materialInventory}
                columns={columns}
            >
                <SortingState />
                <IntegratedSorting />
                <VirtualTable />
                <TableHeaderRow showSortingControls />
            </Grid>
        </Paper>
    );
};

export default MaterialsView;