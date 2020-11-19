import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Skeleton from '@material-ui/lab/Skeleton';

import BuildingElementsView from '../BuildingElementsView';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }),
);

const BuildingMaterialsContainer = (props: any) => {
    const [buildingElements, setBuildingElements] = useState<BuildingElement[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [materialInventory, setMaterialInventory] = useState<MaterialInventory[]>([]);
    const [loading, setLoading] = useState(false);
    const [allMaterialsChecked, setAllMaterialsChecked] = useState(false);

    useEffect(() => {
        if (props.buildingId !== undefined) {
            loadData();
        }
    }, [props.buildingId]);

    const loadData = () => {
        const elementQuery = `/building_elements/${props.buildingId}`;
        const materialQuery = `/materials/${props.buildingId}`;
        const inventoryQuery = `/materials/inventory/${props.buildingId}`;

        if (!loading) {
            setLoading(true);
            Promise.all([
                fetch(elementQuery),
                fetch(materialQuery),
                fetch(inventoryQuery)
            ]).then(responses => Promise.all(responses.map(response => response.json())
            )).then(data => {
                ReactDOM.unstable_batchedUpdates(() => {
                    setBuildingElements(data[0]);
                    setMaterials(data[1]);
                    setMaterialInventory(data[2]);
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
                    <div>bruh</div>
                    :
                    <BuildingElementsView buildingElements={buildingElements} materials={materials} materialInventory={materialInventory} />
            }
        </div>
    );
};

export default BuildingMaterialsContainer;