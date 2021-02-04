import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'redux/reducers';
import allActions from 'redux/actions';

import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import ElementsAndMaterialsContainer from 'components/ElementsAndMaterialsContainer';
import GWPSingleChart from './GWPSingleChart';

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
        content: {
            // margin: theme.spacing(1),
            padding: theme.spacing(2),
            // height: '600px'
        },
    }),
);

const initialBuildingState: IBuilding = {
    idbuildings: 0,
    building_identifier: "",
    building_name: "",
    project: "",
    country: "",
    city: "",
    typology: "",
    construction_type: "",
    lifetime: 0,
    floor_area: 0,
    A1A3: null,
    A4: null,
    B4_m: null,
    B4_t: null,
};

const SingleBuildingView = (props: any) => {
    const dispatch = useDispatch();

    const selectedBuildings = useSelector((state: IRootState) => state.selectedBuildings);
    const [building, setBuilding] = useState<IBuilding>(initialBuildingState);

    const {
        building_identifier, building_name, project, typology, construction_type, floor_area, A1A3, A4, B4_m, B4_t
    } = selectedBuildings[0];

    const gwpChartData: ISingleChartDataItem[] = [
        { lcaPhase: 'A1-A3', gwp: Number(A1A3) || 0.0 },
        { lcaPhase: 'A4', gwp: Number(A4) || 0.0 },
        { lcaPhase: 'B4 (m)', gwp: Number(B4_m) || 0.0 },
        { lcaPhase: 'B4 (t)', gwp: Number(B4_t) || 0.0 },
    ];

    const classes = useStyles();

    return (
        <div className={classes.content}>
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
                <Grid item xs={6}>
                    <Typography variant="h5" color="textSecondary" gutterBottom>Embodied emissions</Typography>
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
    );
};

export default SingleBuildingView;