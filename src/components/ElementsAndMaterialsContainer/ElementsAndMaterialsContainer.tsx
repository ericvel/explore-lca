import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'redux/reducers';
import allActions from 'redux/actions';

import ReactDOM from "react-dom";
import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Skeleton from '@material-ui/lab/Skeleton';

import BuildingElementsView from './BuildingElementsView';
import MaterialsTable from "./MaterialsTable";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }),
);

const ElementsAndMaterialsContainer = (props: any) => {    
    const dispatch = useDispatch();
    const selectedBuildings = useSelector((state: IRootState) => state.selectedBuildings);

    const [loading, setLoading] = useState(false);
    const [allMaterialsChecked, setAllMaterialsChecked] = useState(false);

    useEffect(() => {
        if (selectedBuildings.length > 0) {
            loadData();
        }
    }, [selectedBuildings]);

    const loadData = () => {
        const buildingId = selectedBuildings[0].idbuildings;

        const elementQuery = `/building_elements/${buildingId}`;
        const inventoryQuery = `/material_inventory/${buildingId}`;

        if (!loading) {
            setLoading(true);
            Promise.all([
                fetch(elementQuery),
                fetch(inventoryQuery)
            ]).then(responses => Promise.all(responses.map(response => response.json())
            )).then(data => {
                ReactDOM.unstable_batchedUpdates(() => {
                    dispatch(allActions.elementAndMaterialActions.setBuildingElements(data[0]));
                    dispatch(allActions.elementAndMaterialActions.setMaterialInventory(data[1]));
                    setLoading(false);
                })
            }).catch(() => setLoading(false));
        }
    };

    const handleChange = () => {
        setAllMaterialsChecked((prev) => !prev);
    };

    const headingText = allMaterialsChecked ? "All materials" : "Building elements";

    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={3} alignItems="center" justify="space-between">
                <Grid item xs>
                    <Typography variant="h5" color="textSecondary" gutterBottom>{headingText}</Typography>
                </Grid>
                <Grid item xs>
                    <FormControlLabel
                        control={<Switch checked={allMaterialsChecked} onChange={handleChange} />}
                        label="Show all materials"
                    />
                </Grid>
            </Grid>
            {loading || props.parentIsLoading ?
                <div>
                    <Skeleton height={120} /><Skeleton height={120} /><Skeleton height={120} />
                </div>
                :
                allMaterialsChecked ?
                    <MaterialsTable elementInventory={false} />
                    :
                    <BuildingElementsView />
            }
        </div>
    );
};

export default ElementsAndMaterialsContainer;