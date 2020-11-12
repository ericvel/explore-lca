import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { CardHeader } from "@material-ui/core";

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
        }
    }),
);

const StyledBreadcrumb = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591


const initialSelectedElementState: BuildingElement = {
    idbuilding_elements: 0,
    idlevels: 0,
    name: "",
    hierarchy: 0,
};

const BuildingElementsView = (props: any) => {
    const [buildingElements, setBuildingElements] = useState<BuildingElement[]>([]);
    const [selectedElement, setSelectedElement] = useState<BuildingElement>(initialSelectedElementState);
    const [elementRoute, setElementRoute] = useState<BuildingElement[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.buildingId !== undefined) {
            setElementRoute([])
            loadData();
        }
    }, [props.buildingId]);


    const loadData = () => {
        const query = `/building_elements/${props.buildingId}`;
        if (!loading) {
            setLoading(true);

            fetch(query)
                .then(response => response.json())
                .then(data => {
                    setBuildingElements(data);
                    const rootElement = data.find((element: BuildingElement) => element.hierarchy === 0);
                    if (rootElement !== undefined) {
                        setSelectedElement(rootElement);
                    }
                    setLoading(false);
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

    const goToChildElement = (elementId: number) => {
        const childElement = buildingElements.find(element => element.idlevels === elementId);
        if (childElement !== undefined) {
            setSelectedElement(childElement);
            setElementRoute([...elementRoute, childElement]);
        }
    }

    const resetBreadcrumbs = () => {
        const rootElement = buildingElements.find((element: BuildingElement) => element.hierarchy === 0);
        if (rootElement !== undefined) {
            setSelectedElement(rootElement);
            setElementRoute([]);
        }
    }

    const handleBreadcrumbClick = (hierarchy: number) => {
        // Don't do anything if click on last breadcrumb in route
        if (selectedElement.hierarchy === hierarchy) {
            return;
        }
        // Reset route if click on building breadcrumb
        else if (hierarchy === 0) {
            const rootElement = buildingElements.find((element: BuildingElement) => element.hierarchy === 0);
            if (rootElement !== undefined) {
                setSelectedElement(rootElement);
                setElementRoute([]);
                return;
            }
        }

        var tempRoute = elementRoute;
        for (let i = 0; i < elementRoute.length - hierarchy; i++) {
            tempRoute.pop();
            console.log("Poppin, new route: ", tempRoute);
        }
        setSelectedElement(tempRoute[tempRoute.length - 1])
        setElementRoute(tempRoute);
    };

    const childElements = getChildElements(selectedElement);

    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={3} className="">
                <Grid item xs>
                    <Typography variant="h5" color="textSecondary" gutterBottom>Building elements</Typography>
                    <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
                        <StyledBreadcrumb
                            label="Building"
                            variant="outlined"
                            icon={<HomeIcon fontSize="small" />}
                            onClick={() => handleBreadcrumbClick(0)}
                        />
                        {elementRoute.map(element =>
                            <StyledBreadcrumb
                                label={element.name}
                                variant="outlined"
                                onClick={() => handleBreadcrumbClick(element.hierarchy)}
                            //deleteIcon={<ExpandMoreIcon />}
                            //onDelete={(() => { })}
                            />
                        )}

                    </Breadcrumbs>
                    {loading || props.parentIsLoading ?
                        <div>
                            <Skeleton height={60} /><Skeleton height={60} /><Skeleton height={60} />
                        </div> :
                        childElements.map(child =>
                            <Paper variant="outlined" className={classes.buildingElementPaper}>
                                <Grid container alignItems="center" >
                                    <Grid item xs={10}>
                                        <Typography variant="body1">
                                            {child.name}
                                        </Typography>
                                        <Grid container>
                                            <Grid container item xs={6}>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        A1-A3:
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        A4:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2">
                                                        {child.A1A3 || "0.0"}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                    {child.A4 || "0.0"}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container item xs={6}>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        B4_t:
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        B4_m:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2">
                                                        {child.B4_t || "0.0"}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {child.B4_m || "0.0"}
                                                    </Typography>
                                                </Grid>

                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Grid item>
                                        {/* Check if element has children to decide if should display button */}
                                        {(getChildElements(child)?.length > 0) &&
                                            <Tooltip title="See sub-elements">
                                                <IconButton /* edge="end" */ color="default" aria-label="child elements" onClick={() => goToChildElement(child.idlevels)}>
                                                    <NavigateNextIcon />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default BuildingElementsView;