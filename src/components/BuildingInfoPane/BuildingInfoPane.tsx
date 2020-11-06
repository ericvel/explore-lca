import React, { useState, useEffect } from "react";
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import './BuildingInfoPane.css';
import ReactDOM from "react-dom";
import BuildingElementAccordion from './BuildingElementAccordion';
import LoadingIndicator from '../LoadingIndicator';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        buildingSection: {

        },
        elementSection: {
            marginTop: theme.spacing(2)
        },
        elementInfoLabels: {
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

const initialSelectedElementState: BuildingElement = {
    idlevels: 0,
    name: "",
    hierarchy: 0,
};

const BuildingInfoPane = (props: any) => {
    const [isPaneOpen, setIsPaneOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [building, setBuilding] = useState<Building>(initialBuildingState);
    const [buildingElements, setBuildingElements] = useState<BuildingElement[]>([]);
    const [selectedElement, setSelectedElement] = useState<BuildingElement>(initialSelectedElementState);

    useEffect(() => {
        if (props.selectedRowId !== undefined) {
            loadData();
            setIsPaneOpen(true);
        } else {
            setIsPaneOpen(false);
        }
    }, [props.selectedRowId]);

    /* useEffect(() => {
        console.log("Re-render")
    }, [building, buildingElements])
 */
    const loadData = () => {
        const buildingQuery = `/buildings/${props.selectedRowId}`;
        const buildingElementQuery = `/building_elements/${props.selectedRowId}`;
        if (!loading) {
            setLoading(true);
            Promise.all([
                fetch(buildingQuery),
                fetch(buildingElementQuery)
            ]).then(responses => Promise.all(responses.map(response => response.json())
            )).then(data => {
                //console.log("Building elms: ", data[1]);
                ReactDOM.unstable_batchedUpdates(() => {
                    setBuilding(data[0][0]);
                    setBuildingElements(data[1]);
                    const rootElement = data[1].find((element: BuildingElement) => element.hierarchy === 0);
                    if (rootElement !== undefined) setSelectedElement(rootElement);
                    setLoading(false);
                });
            }).catch(() => setLoading(false));
        }
    };

    const getChildElements = (parentElement: BuildingElement) => {
        const childElements = buildingElements.filter(element => element.idparent === parentElement.idlevels);
        if (childElements !== undefined) {
            return childElements;
        }
        return [];
    }

    const changeSelectedElement = (elementId: number) => {
        const newSelection = buildingElements.find(element => element.idlevels === elementId);
        if (newSelection !== undefined) setSelectedElement(newSelection);
    }
    
    const {
        building_identifier, building_name, country, city, typology, construction_type
    } = building;

    const {
        name, A1A3, A4, B4_m, B4_t
    } = selectedElement;

    const childElements = getChildElements(selectedElement);
    const classes = useStyles();

    return (
        <div>
            <SlidingPane
                className="sliding-pane close-button"
                overlayClassName="sliding-pane-overlay"
                isOpen={isPaneOpen}
                title={loading ? "Loading..." : building_name}
                subtitle={loading ? "" : "ID: " + building_identifier}
                width="100%"
                closeIcon={<CloseIcon fontSize="large" />}
                hideHeader={true}
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setIsPaneOpen(false);
                }}
            >
                <div>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={() => {setIsPaneOpen(false)}}>
                        <CloseIcon />
                    </IconButton>
                </div>
                {loading ? <LoadingIndicator /> : (
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={11}>
                                <Typography variant="h4" color="textPrimary" >{building_name}</Typography>
                                <Typography variant="subtitle1" color="textSecondary" gutterBottom>{building_identifier}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h5" color="textSecondary" gutterBottom>General info</Typography>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" className={classes.elementInfoLabels}>Country:</Typography>
                                        <Typography variant="body1" className={classes.elementInfoLabels}>City:</Typography>
                                        <Typography variant="body1" className={classes.elementInfoLabels}>Typology:</Typography>
                                        <Typography variant="body1" className={classes.elementInfoLabels}>Construction type:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">{country || "nil"}</Typography>
                                        <Typography variant="body1">{city || "nil"}</Typography>
                                        <Typography variant="body1">{typology || "nil"}</Typography>
                                        <Typography variant="body1">{construction_type || "nil"}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h5" color="textSecondary" gutterBottom>GWP</Typography>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography variant="body1" className={classes.elementInfoLabels}>A1-A3:</Typography>
                                        <Typography variant="body1" className={classes.elementInfoLabels}>A4:</Typography>
                                        <Typography variant="body1" className={classes.elementInfoLabels}>B4_m:</Typography>
                                        <Typography variant="body1" className={classes.elementInfoLabels}>B4_t:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" align="right">{A1A3 || "0.0"}</Typography>
                                        <Typography variant="body1" align="right">{A4 || "0.0"}</Typography>
                                        <Typography variant="body1" align="right">{B4_m || "0.0"}</Typography>
                                        <Typography variant="body1" align="right">{B4_t || "0.0"}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider variant="middle" light={true} />
                        <Grid container spacing={3} className={classes.elementSection}>
                            <Grid item xs>
                                <Typography variant="h5" color="textSecondary" gutterBottom>Building elements</Typography>
                                {childElements.map(child =>
                                    <BuildingElementAccordion element={child} changeSelectedElement={changeSelectedElement} />

                                )}
                            </Grid>
                        </Grid>
                    </div>

                )}
            </SlidingPane>
        </div>
    );
};

export default BuildingInfoPane;