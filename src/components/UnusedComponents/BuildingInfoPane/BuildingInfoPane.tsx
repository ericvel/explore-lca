import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../../redux/actions';
import { IRootState } from '../../../redux/reducers';

import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import SlidingPane from "react-sliding-pane";
import "../UnusedComponents/BuildingInfoDrawer/node_modules/react-sliding-pane/dist/react-sliding-pane.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';
import './BuildingInfoPane.css';

import ElementsAndMaterialsContainer from '../../ElementsAndMaterialsContainer';
import GWPSingleChart from '../../GWPSingleChart';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        closeButton: {
            position: 'absolute',
            right: theme.spacing(2),
            top: theme.spacing(2),
            color: theme.palette.grey[500],
        },
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
        }
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
    floor_area: 0,
    A1A3: null,
    A4: null,
    B4_m: null,
    B4_t: null,
};

const BuildingInfoPane = (props: any) => {
    const dispatch = useDispatch();

    const selectedBuildings = useSelector((state: IRootState) => state.selectedBuildings);
    const multipleSwitchChecked = useSelector((state: IRootState) => state.canSelectMultipleBuildings);

    const [isPaneOpen, setIsPaneOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [building, setBuilding] = useState<IBuilding>(initialBuildingState);

    useEffect(() => {
        if (!multipleSwitchChecked && selectedBuildings.length > 0) {
            setBuilding(selectedBuildings[0]);
            setIsPaneOpen(true);
        } else {
            setIsPaneOpen(false);
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
        <div>
            <SlidingPane
                className="sliding-pane close-button"
                overlayClassName="sliding-pane-overlay"
                isOpen={isPaneOpen}
                width="100%"
                hideHeader={true}
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    // setIsPaneOpen(false);
                    dispatch(allActions.buildingActions.deselectAllBuildings());
                }}
            >
                <div>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={() => { dispatch(allActions.buildingActions.deselectAllBuildings()); }}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div>
                    <Grid container spacing={3} className={classes.buildingSection}>
                        <Grid item xs={11}>
                            <Typography variant="h4" color="textPrimary" >{loading ? <Skeleton /> : building_name}</Typography>
                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>{loading ? <Skeleton width={70} /> : building_identifier}</Typography>
                        </Grid>
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5" color="textSecondary" gutterBottom>General info</Typography>
                            <div>
                                <TextField
                                    key={project}
                                    inputProps={{
                                        readOnly: true,
                                        disabled: true
                                    }}
                                    InputProps={{ disableUnderline: true }}
                                    fullWidth={true}
                                    label="Project"
                                    name="project"
                                    margin="dense"
                                    defaultValue={project}
                                />
                                <TextField
                                    key={typology}
                                    inputProps={{
                                        readOnly: true,
                                        disabled: true
                                    }}
                                    InputProps={{ disableUnderline: true }}
                                    fullWidth={true}
                                    label="Typology"
                                    name="typology"
                                    margin="dense"
                                    defaultValue={typology}
                                />
                                <TextField
                                    key={construction_type}
                                    inputProps={{
                                        readOnly: true,
                                        disabled: true
                                    }}
                                    InputProps={{ disableUnderline: true }}
                                    fullWidth={true}
                                    label="Construction type"
                                    name="construction_type"
                                    margin="dense"
                                    defaultValue={construction_type}
                                />
                                <TextField
                                    key={floor_area}
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
                            {loading ?
                                <div>
                                    <Skeleton><TextField label="a" margin="dense" /></Skeleton>
                                    <Skeleton><TextField label="a" margin="dense" /></Skeleton>
                                    <Skeleton><TextField label="a" margin="dense" /></Skeleton>
                                    <Skeleton><TextField label="a" margin="dense" /></Skeleton>
                                </div>
                                :
                                <div>
                                    <GWPSingleChart chartData={gwpChartData} height={250} />
                                </div>
                            }
                        </Grid>
                    </Grid>

                    <Divider variant="middle" light={true} className={classes.divider} />

                    <ElementsAndMaterialsContainer buildingId={building.idbuildings} parentIsLoading={loading} />
                </div>
            </SlidingPane>
        </div>
    );
};

export default BuildingInfoPane;