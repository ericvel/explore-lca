import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';

import BuildingElementItem from '../BuildingElementItem';
import MaterialsTable from "../MaterialsTable";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        breadCrumbs: {
            marginBottom: theme.spacing(2)
        },
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
    A1A3: null,
    A4: null,
    B4_m: null,
    B4_t: null,
    idparent: null
};

const BuildingElementsView = (props: any) => {
    const [buildingElements] = useState<BuildingElement[]>(props.buildingElements);
    const [materialInventory] = useState<MaterialInventory[]>(props.materialInventory);

    const [selectedElement, setSelectedElement] = useState<BuildingElement>(initialSelectedElementState);
    const [elementRoute, setElementRoute] = useState<BuildingElement[]>([]);
    

    useEffect(() => {
        const rootElement = buildingElements.find((element: BuildingElement) => element.hierarchy === 0);
        if (rootElement !== undefined) {
            setSelectedElement(rootElement);
            setElementRoute([rootElement]);
        }
    }, []);

    const getChildElements = (parentElement: BuildingElement) => {
        const childElements = buildingElements.filter(element => element.idparent === parentElement.idlevels);
        if (childElements !== undefined) {
            return childElements;
        }

        return [];
    }

    const getElementMaterials = (parentElement: BuildingElement) => {
        const elementMaterials = materialInventory.filter(material => material.idbuilding_elements === parentElement.idbuilding_elements);
        if (elementMaterials !== undefined) {
            return elementMaterials;
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

    const goToElementMaterials = (elementId: number) => {
        const childElement = buildingElements.find(element => element.idlevels === elementId);
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

    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
                        {elementRoute.map((element, index) =>
                            <StyledBreadcrumb
                                key={index}
                                label={element.name}
                                variant="outlined"
                                icon={element.idlevels === 0 ? <HomeIcon fontSize="small" /> : undefined}
                                onClick={() => handleBreadcrumbClick(index)}
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
                        <MaterialsTable materialInventory={getElementMaterials(selectedElement)} />
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default BuildingElementsView;