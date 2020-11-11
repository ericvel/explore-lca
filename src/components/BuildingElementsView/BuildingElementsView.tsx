import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    // const [childElements, setChildElements] = useState<BuildingElement[]>([]);
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
                        // setChildElements(getChildElements(rootElement));
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
            // setChildElements(getChildElements(childElement));
            setElementRoute([...elementRoute, childElement]);
        }
    }

    const resetBreadcrumbs = () => {
        const rootElement = buildingElements.find((element: BuildingElement) => element.hierarchy === 0);
        if (rootElement !== undefined) {
            setSelectedElement(rootElement);
            // setChildElements(getChildElements(rootElement));
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
        setSelectedElement(tempRoute[tempRoute.length-1])
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
                            <List component="nav" aria-label="main mailbox folder">
                                <ListItem>
                                    <ListItemText primary={child.name} secondary={child.idlevels} />
                                    {/* Check if element has children to decide if should display button */}
                                    {(getChildElements(child)?.length > 0) &&
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="comments" onClick={() => goToChildElement(child.idlevels)}>
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    }
                                </ListItem>
                            </List>
                            , {/* <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id={child.idbuilding_elements.toString()}
                                >
                                    <Typography className={classes.heading}>{child.idlevels} - {child.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <b>A1-A3:</b> {child.A1A3} <br />
                                        <b>A4:</b> {child.A4} <br />
                                        <b>B4_m:</b> {child.B4_m} <br />
                                        <b>B4_t:</b> {child.B4_t} <br />
                                        {(childElements !== []) &&
                                            <Button variant="outlined" disabled={child.hierarchy === 3} onClick={() => goToChildElement(child.idlevels)}>
                                                See children -{'>'}
                                            </Button>
                                        }
                                    </Typography>
                                </AccordionDetails>
                            </Accordion> */}
                        )
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default BuildingElementsView;