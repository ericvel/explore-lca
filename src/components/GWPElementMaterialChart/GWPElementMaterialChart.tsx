import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../redux/reducers';
import allActions from '../../redux/actions';

import { Theme, createStyles, makeStyles, withStyles, WithStyles, emphasize } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import text from '@material-ui/core/Typography';

import {
    Chart,
    Series,
    CommonSeriesSettings,
    Legend,
    ArgumentAxis,
    ValueAxis,
    Title,
    Tooltip,
    Size,
    Label
} from 'devextreme-react/chart';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chart: {
            padding: theme.spacing(2)
        },
        argumentAxisLabel: {
            fill: "#767676",
        }
    }),
);

interface Props {
    // chartData: IElementChartDataItem[];
}



const GWPElementMaterialChart = (props: Props) => {
    const buildingElements = useSelector((state: IRootState) => state.buildingElements);
    const selectedBuildingElement = useSelector((state: IRootState) => state.selectedBuildingElement);

    const [chartData, setChartData] = useState<IElementChartDataItem[]>([]);

    useEffect(() => {
        const childElements = getChildElements(selectedBuildingElement);
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

        setChartData(chartData.reverse());
    }, [selectedBuildingElement]);

    const getChildElements = (parentElement: IBuildingElement) => {
        const childElements = buildingElements.filter(element => element.idparent === parentElement.idlevels);
        if (childElements !== undefined) {
            return childElements;
        }

        return [];
    }

    // Wraps label over two lines if longer than 15 characters
    const customizeArgumentAxisLabel = (data: any) => {
        if (data.value.length > 15) {
            const wordArray = data.value.split(" ");
            if (wordArray.length > 2) {
                const firstLine = wordArray.slice(0, 2).join(" ");
                const secondLine = wordArray.slice(2).join(" ");
                return firstLine + "\n" + secondLine;
            } else {
                return wordArray.join("\n");
            }
        }

        return data.value;
    }

    const customizeTooltip = (arg: any) => {
        return {
            text: `<b>${arg.seriesName}</b>\n ${arg.valueText}`
        };
    }

    const height = 200 + (chartData.length * 50);

    const classes = useStyles();

    return (
        <Chart
            className={classes.chart}
            // title="Embodied emissions"
            dataSource={chartData}
            palette="Material"
            rotated={true}
            onArgumentAxisClick={(props: any) => console.log(props)}
        >
            <Size
                height={height}
            />
            <CommonSeriesSettings
                argumentField="name"
                type="stackedBar"
                barWidth={40}
            >
                {/* <Label visible></Label> */}
            </CommonSeriesSettings>
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
            <ArgumentAxis>
                <Label
                    customizeText={customizeArgumentAxisLabel}
                />
            </ArgumentAxis>
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
    );
};

export default GWPElementMaterialChart;