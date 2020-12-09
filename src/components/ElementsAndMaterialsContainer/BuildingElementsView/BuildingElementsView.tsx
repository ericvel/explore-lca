import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../../redux/reducers';

import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import Paper from '@material-ui/core/Paper';

import {
    Chart,
    Series,
    CommonSeriesSettings,
    Legend,
    ValueAxis,
    Title,
    Tooltip,
    Size
} from 'devextreme-react/chart';

import BuildingElementItem from '../BuildingElementItem';
import MaterialsTable from "../MaterialsTable";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        breadCrumbs: {
            marginBottom: theme.spacing(2)
        },
        chart: {
            // height: 600,
            padding: theme.spacing(2)
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


const initialSelectedElementState: IBuildingElement = {
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
    const buildingElements = useSelector((state: IRootState) => state.buildingElements);
    const materialInventory = useSelector((state: IRootState) => state.materialInventory);

    const [selectedElement, setSelectedElement] = useState<IBuildingElement>(initialSelectedElementState);
    const [elementRoute, setElementRoute] = useState<IBuildingElement[]>([]);

    const [chartData, setChartData] = useState<IElementChartDataItem[]>([]);

    useEffect(() => {
        const childElements = getChildElements(selectedElement);
        const chartData: IElementChartDataItem[] = [];

        childElements.forEach(element => {
            const dataEntry: IElementChartDataItem = {
                name: element.name,
                id: element.idbuilding_elements,
                a1a3: Number(element.A1A3) || 0.0,
                a4: Number(element.A4) || 0.0,
                b4m: Number(element.B4_m) || 0.0,
                b4t: Number(element.B4_t) || 0.0,
            }

            chartData.push(dataEntry);
        });

        setChartData(chartData);
    }, [selectedElement]);

    useEffect(() => {
        const rootElement = buildingElements.find((element: IBuildingElement) => element.hierarchy === 0);
        if (rootElement !== undefined) {
            setSelectedElement(rootElement);
            setElementRoute([rootElement]);
        }
    }, []);

    const getChildElements = (parentElement: IBuildingElement) => {
        const childElements = buildingElements.filter(element => element.idparent === parentElement.idlevels);
        if (childElements !== undefined) {
            return childElements;
        }

        return [];
    }

    const getElementMaterials = (parentElement: IBuildingElement) => {
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

    const customizeTooltip = (arg: any) => {
        return {
            text: `<b>${arg.seriesName}</b>\n ${arg.valueText}`
        };
    }

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
                    {childElements?.length > 0 ?
                        <div>
                            {childElements.map((child, index) =>
                                <BuildingElementItem
                                    key={child.idlevels || index}
                                    element={child}
                                    hasMaterials={getElementMaterials(child)?.length > 0}
                                    onClickChildElementButton={goToChildElement}
                                    onClickElementMaterialsButton={goToElementMaterials}
                                />
                            )}
                            <Paper>
                                <Chart
                                    className={classes.chart}
                                    title="Embodied emissions"
                                    dataSource={chartData}
                                    palette="Material"
                                    rotated={true}
                                >
                                    <Size
                                        height={600}
                                    />
                                    <CommonSeriesSettings argumentField="name" type="stackedBar" barWidth={60} />
                                    <Series
                                        valueField="a1a3"
                                        name="A1-A3"
                                    />
                                    <Series
                                        valueField="a4"
                                        name="A4"
                                    />
                                    <Series
                                        valueField="b4m"
                                        name="B4 (m)"
                                    />
                                    <Series
                                        valueField="b4t"
                                        name="B4 (t)"
                                    />
                                    <ValueAxis>
                                        <Title
                                            text={"kgCO2e/m\xB2"}
                                            font={{
                                                size: 14
                                            }}
                                        />
                                    </ValueAxis>
                                    <Legend
                                        verticalAlignment="bottom"
                                        horizontalAlignment="center"
                                        itemTextPosition="top"
                                    />
                                    <Tooltip
                                        enabled={true}
                                        location="edge"
                                        customizeTooltip={customizeTooltip}
                                        zIndex={1200}
                                        arrowLength={6}
                                        format="fixedPoint"
                                    />
                                </Chart>
                            </Paper>
                        </div>
                        :
                        <MaterialsTable elementInventory={getElementMaterials(selectedElement)} />
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default BuildingElementsView;