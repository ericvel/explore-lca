import React, { useState, useEffect } from "react";
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
    const [buildingElements, setBuildingElements] = useState<IBuildingElement[]>([]);
    const [materialInventory, setMaterialInventory] = useState<IMaterialInventory[]>([]);
    const [loading, setLoading] = useState(false);
    const [allMaterialsChecked, setAllMaterialsChecked] = useState(false);

    useEffect(() => {
        if (props.buildingId !== undefined) {
            loadData();
        }
    }, [props.buildingId]);

    const loadData = () => {
        const elementQuery = `/building_elements/${props.buildingId}`;
        const inventoryQuery = `/material_inventory/${props.buildingId}`;

        if (!loading) {
            setLoading(true);
            Promise.all([
                fetch(elementQuery),
                fetch(inventoryQuery)
            ]).then(responses => Promise.all(responses.map(response => response.json())
            )).then(data => {
                ReactDOM.unstable_batchedUpdates(() => {
                    setBuildingElements(data[0]);
                    setMaterialInventory(data[1]);
                    setLoading(false);
                })
            }).catch(() => setLoading(false));
        }
    };

    const handleChange = () => {
        setAllMaterialsChecked((prev) => !prev);
    };

    const headingText = allMaterialsChecked ? "Materials" : "Building elements";

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
                    <Skeleton height={100} /><Skeleton height={100} /><Skeleton height={100} />
                </div>
                :
                allMaterialsChecked ?
                    <MaterialsTable materialInventory={materialInventory} />
                    :
                    <BuildingElementsView buildingElements={buildingElements} materialInventory={materialInventory} />
            }
        </div>
    );
};

export default ElementsAndMaterialsContainer;