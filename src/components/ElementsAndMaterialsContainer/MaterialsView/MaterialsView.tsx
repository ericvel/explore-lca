import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import MaterialGrid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { RowDetailState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableRowDetail,
    VirtualTable
} from '@devexpress/dx-react-grid-material-ui';

import MaterialItem from "../MaterialItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        breadCrumbs: {
            marginBottom: theme.spacing(2)
        },
        buildingElementPaper: {
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            // height: theme.spacing(8)
        },
        subElementButton: {
            marginLeft: 'auto',
        },
        divider: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
    }),
);

const getRowId = (row: any) => row.idmaterials;
const Root = (props: any) => <Grid.Root {...props} style={{ height: '100%' }} />;

const MaterialsView = (props: any) => {
    const [materials] = useState<Material[]>(props.materials);
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

    const getInventoryEntries = (materialId: number) => {
        const inventoryEntries = materialInventory.filter(inventory => inventory.idmaterials === materialId);
        if (inventoryEntries !== undefined) {
            return inventoryEntries;
        }

        return [];
    }

    const RowDetail = ({ row }: any) => (
        <div>
            {getInventoryEntries(row.idmaterials).map((entry, index) =>
                <MaterialGrid container>
                    <MaterialGrid item xs={12}>
                        {index > 0 ?? <Divider variant="fullWidth" light={true} className={classes.divider} />}
                        <Typography variant="body1">
                            <b>Inventory ID: {entry.idmaterialInventory}</b>
                        </Typography>
                        <Typography variant="body1">
                            Quantity: {entry.quantity}
                        </Typography>
                    </MaterialGrid>
                </MaterialGrid>
            )}
        </div>
    );

    const getMaterialItems = () => {
        var materialItems: MaterialItem[] = [];
        materials.forEach(function (material) {
            const inventoryEntries = materialInventory.filter(inventory => inventory.idmaterials === material.idmaterials);
            const materialItem: MaterialItem = {
                material: material,
                inventoryEntries: inventoryEntries
            }
            materialItems.push(materialItem)
        });

        return materialItems;
    }

    const classes = useStyles();

    return (
        <Paper style={{ height: '600px' }}>
            <Grid
                rows={materials}
                columns={columns}
                getRowId={getRowId}
                rootComponent={Root}
            >
                <RowDetailState />
                <VirtualTable
                    height="auto"
                />                
                <TableHeaderRow />
                <TableRowDetail
                    contentComponent={RowDetail}
                />
            </Grid>
        </Paper>
    );
};

export default MaterialsView;