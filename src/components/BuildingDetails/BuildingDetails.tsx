import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../redux/reducers';
import allActions from '../../redux/actions';

import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';

import ElementsAndMaterialsContainer from '../ElementsAndMaterialsContainer';
import GWPSingleChart from '../GWPSingleChart';

const drawerWidth = "45vw";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buildingSection: {
            marginBottom: theme.spacing(2)
        },
        divider: {
            marginBottom: theme.spacing(2)
        },
        elementSection: {
            marginTop: theme.spacing(2)
        },
        buildingInfoLabels: {
            fontWeight: "bold"
        },
        noSelectionContainer: {
            height: '100vh'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            // padding: theme.spacing(2),
            // marginBottom: theme.spacing(2),
            width: drawerWidth,
        },
        drawerContent: {
            // margin: theme.spacing(1),
            padding: theme.spacing(2),
            // height: '600px'
        },
    }),
);

const initialBuildingState: IBuilding = {
    idbuildings: 0,
    building_identifier: 0,
    building_name: "",
    project: "",
    country: "",
    city: "",
    typology: "",
    construction_type: "",
    floor_area: 0,
    A1A3: null,
    A4: null,
    B4_m: null,
    B4_t: null,
};

const BuildingDetails = (props: any) => {
    const dispatch = useDispatch();

    const selectedBuildings = useSelector((state: IRootState) => state.buildings);
    const [building, setBuilding] = useState<IBuilding>(initialBuildingState);

    useEffect(() => {
        if (selectedBuildings.length > 0) {
            setBuilding(selectedBuildings[0]);
        }
    }, [selectedBuildings]);

    const {
        building_identifier, building_name, project, typology, construction_type, floor_area, A1A3, A4, B4_m, B4_t
    } = building;

    const gwpChartData: ISingleChartDataItem[] = [
        { lcaPhase: 'A1-A3', gwp: Number(A1A3) || 0.0 },
        { lcaPhase: 'A4', gwp: Number(A4) || 0.0 },
        { lcaPhase: 'B4 (m)', gwp: Number(B4_m) || 0.0 },
        { lcaPhase: 'B4 (t)', gwp: Number(B4_t) || 0.0 },
    ];

    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="right"
        >
            {selectedBuildings.length > 0 ?
                <div className={classes.drawerContent}>
                    <Grid container spacing={3} className={classes.buildingSection}>
                        <Grid item xs={11}>
                            <Typography variant="h4" color="textPrimary" >{building_name}</Typography>
                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>{building_identifier}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5" color="textSecondary" gutterBottom>General info</Typography>
                            <div>
                                {console.log("Project: ", project)}
                                <TextField
                                    key={project || "project"}
                                    inputProps={{
                                        readOnly: true,
                                        disabled: true
                                    }}
                                    InputProps={{ disableUnderline: true }}
                                    fullWidth={true}
                                    label="Project"
                                    name="project"
                                    margin="dense"
                                    defaultValue={project || "nil"}
                                />
                                <TextField
                                    key={typology || "typology"}
                                    inputProps={{
                                        readOnly: true,
                                        disabled: true
                                    }}
                                    InputProps={{ disableUnderline: true }}
                                    fullWidth={true}
                                    label="Typology"
                                    name="typology"
                                    margin="dense"
                                    defaultValue={typology || "nil"}
                                />
                                <TextField
                                    key={construction_type || "c_type"}
                                    inputProps={{
                                        readOnly: true,
                                        disabled: true
                                    }}
                                    InputProps={{ disableUnderline: true }}
                                    fullWidth={true}
                                    label="Construction type"
                                    name="construction_type"
                                    margin="dense"
                                    defaultValue={construction_type || "nil"}
                                />
                                <TextField
                                    key={floor_area || "f_area"}
                                    inputProps={{
                                        readOnly: true,
                                        disabled: true
                                    }}
                                    InputProps={{ disableUnderline: true }}
                                    fullWidth={true}
                                    label="Floor area"
                                    name="floor_area"
                                    margin="dense"
                                    defaultValue={floor_area + " m\xB2" || "nil"}
                                />
                            </div>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5" color="textSecondary" gutterBottom>GWP</Typography>
                            <GWPSingleChart chartData={gwpChartData} height={250} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Divider variant="middle" light={true} className={classes.divider} />
                            <ElementsAndMaterialsContainer buildingId={building.idbuildings} />
                        </Grid>
                    </Grid>
                </div>
                :
                <Grid container justify="center" alignItems="center" className={classes.noSelectionContainer}>
                    <Grid item xs={12}>
                        <Typography variant="h5" color="textSecondary" align="center">
                            Select a building
                            </Typography>
                    </Grid>
                </Grid>
            }
        </Drawer>
    );
};

export default BuildingDetails;