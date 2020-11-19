import React, { useState, useEffect } from "react";
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';
import './BuildingInfoPane.css';
import ReactDOM from "react-dom";
import BuildingElementsView from '../BuildingElementsView';
import BuildingMaterialsContainer from '../BuildingMaterialsContainer';

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

const initialBuildingState: Building = {
    idbuildings: 0,
    building_identifier: 0,
    building_name: "",
    country: "",
    city: "",
    typology: "",
    construction_type: ""
};

const BuildingInfoPane = (props: any) => {
    const [isPaneOpen, setIsPaneOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [building, setBuilding] = useState<Building>(initialBuildingState);

    useEffect(() => {
        if (props.selectedBuildingId !== undefined) {
            loadData();
            setIsPaneOpen(true);
        } else {
            setIsPaneOpen(false);
        }
    }, [props.selectedBuildingId]);

    const loadData = () => {
        const buildingQuery = `/buildings/${props.selectedBuildingId}`;
        if (!loading) {
            setLoading(true);
            fetch(buildingQuery)
                .then(response => response.json())
                .then(data => {
                    setBuilding(data[0]);
                    setLoading(false);
                }).catch(() => setLoading(false));
        }
    };


    const {
        building_identifier, building_name, country, city, typology, construction_type, A1A3, A4, B4_m, B4_t
    } = building;

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
                    setIsPaneOpen(false);
                }}
            >
                <div>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={() => { setIsPaneOpen(false) }}>
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
                            {loading ?
                                <div>
                                    <Skeleton><TextField label="a" margin="dense" /></Skeleton>
                                    <Skeleton><TextField label="a" margin="dense" /></Skeleton>
                                    <Skeleton><TextField label="a" margin="dense" /></Skeleton>
                                    <Skeleton><TextField label="a" margin="dense" /></Skeleton>
                                </div>
                                :
                                <div>
                                    <TextField
                                        inputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                        fullWidth={true}
                                        label="Country"
                                        name="country"
                                        margin="dense"
                                        defaultValue={country || "nil"}
                                    />
                                    <TextField
                                        inputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                        fullWidth={true}
                                        label="City"
                                        name="city"
                                        margin="dense"
                                        defaultValue={city || "nil"}
                                    />
                                    <TextField
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
                                </div>
                            }
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
                                    <TextField
                                        inputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                        fullWidth={true}
                                        label="A1-A3"
                                        name="a1a3"
                                        margin="dense"
                                        defaultValue={A1A3 || "0.0"}
                                    />
                                    <TextField
                                        inputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                        fullWidth={true}
                                        label="A4"
                                        name="a4"
                                        margin="dense"
                                        defaultValue={A4 || "0.0"}
                                    />
                                    <TextField
                                        inputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                        fullWidth={true}
                                        label="B4 (m)"
                                        name="b4m"
                                        margin="dense"
                                        defaultValue={B4_m || "0.0"}
                                    />
                                    <TextField
                                        inputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                        fullWidth={true}
                                        label="B4 (t)"
                                        name="b4t"
                                        margin="dense"
                                        defaultValue={B4_t || "0.0"}
                                    />
                                </div>
                            }
                        </Grid>
                    </Grid>

                    <Divider variant="middle" light={true} className={classes.divider} />
                    
                    <BuildingMaterialsContainer buildingId={props.selectedBuildingId} parentIsLoading={loading} />
                </div>
            </SlidingPane>
        </div>
    );
};

export default BuildingInfoPane;