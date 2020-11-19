import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { CardHeader } from "@material-ui/core";

import BuildingElementItem from './BuildingElementItem';
import MaterialItem from "./MaterialItem";

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
    const [buildingElements] = useState<BuildingElement[]>(props.buildingElements);
    const [materials] = useState<Material[]>(props.materials);
    const [materialInventory] = useState<MaterialInventory[]>(props.materialInventory);

    const [selectedElement, setSelectedElement] = useState<BuildingElement>(initialSelectedElementState);
    const [elementRoute, setElementRoute] = useState<BuildingElement[]>([]);
    // const [loading, setLoading] = useState(false);

    /* useEffect(() => {
        if (props.buildingId !== undefined) {
            setElementRoute([])
            loadData();
        }
    }, [props.buildingId]);
 */

    useEffect(() => {
        const rootElement = buildingElements.find((element: BuildingElement) => element.hierarchy === 0);
        if (rootElement !== undefined) {
            setSelectedElement(rootElement);
            setElementRoute([rootElement]);
        }
    }, []);

    /*  const loadData = () => {
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
                     const rootElement = data[0].find((element: BuildingElement) => element.hierarchy === 0);
                     if (rootElement !== undefined) {
                         setSelectedElement(rootElement);
                         setElementRoute([rootElement]);
                     }
                     setLoading(false);
                 })
             }).catch(() => setLoading(false));
         }
     }; */

    const getChildElements = (parentElement: BuildingElement) => {
        const childElements = buildingElements.filter(element => element.idparent === parentElement.idlevels);
        // console.log("Parent element: " + parentElement.idlevels + " - " + parentElement.name)
        // console.log("Child elements: ", childElements)
        if (childElements !== undefined) {
            return childElements;
        }

        return [];
    }

    const getElementMaterials = (parentElement: BuildingElement) => {
        const buildingElementId = parentElement.idbuilding_elements;
        const elementMaterials = materials.filter(material => material.idbuilding_elements === buildingElementId);

        var materialItems: MaterialItem[] = [];
        elementMaterials.forEach(function (material) {
            const inventoryEntries = materialInventory.filter(inventory => inventory.idmaterials === material.idmaterials && inventory.idbuilding_elements === buildingElementId);
            const materialItem: MaterialItem = {
                idbuilding_elements: buildingElementId,
                material: material,
                inventoryEntries: inventoryEntries
            }
            materialItems.push(materialItem)
        });

        return materialItems;
    }

    const goToChildElement = (elementId: number) => {
        const childElement = buildingElements.find(element => element.idlevels === elementId);
        // console.log("Clicked element id: ", elementId)
        if (childElement !== undefined) {
            setSelectedElement(childElement);
            setElementRoute([...elementRoute, childElement]);
        }
    }

    const goToElementMaterials = (elementId: number) => {
        const childElement = buildingElements.find(element => element.idlevels === elementId);
        // console.log("Clicked element id: ", elementId)
        if (childElement !== undefined) {
            setSelectedElement(childElement);
            setElementRoute([...elementRoute, childElement]);
        }
    }

    const handleBreadcrumbClick = (index: number) => {
        var tempRoute = elementRoute.slice(0, index + 1);
        setSelectedElement(tempRoute[tempRoute.length - 1])
        setElementRoute(tempRoute);
    };

    const childElements = getChildElements(selectedElement);
    // const elementMaterials = getElementMaterials(selectedElement);

    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={3} className="">
                <Grid item xs>
                    <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
                        {elementRoute.map((element, index) =>
                            <StyledBreadcrumb
                                key={index}
                                label={element.name}
                                variant="outlined"
                                icon={element.idlevels === 0 ? <HomeIcon fontSize="small" /> : undefined}
                                onClick={() => handleBreadcrumbClick(index)}
                            //deleteIcon={<ExpandMoreIcon />}
                            //onDelete={(() => { })}
                            />
                        )}
                    </Breadcrumbs>
                    { childElements?.length > 0 ?
                        childElements.map((child, index) =>
                            <BuildingElementItem
                                key={child.idlevels || index}
                                element={child}
                                hasMaterials={getElementMaterials(child)?.length > 0}
                                onClickChildElementButton={goToChildElement}
                                onClickElementMaterialsButton={goToElementMaterials}
                            />
                        )
                        :
                        getElementMaterials(selectedElement).map((materialItem, index) =>
                            <MaterialItem
                                key={index}
                                materialItem={materialItem}
                            />
                        )
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default BuildingElementsView;