import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'redux/reducers';
import allActions from 'redux/actions';

import { Theme, createStyles, makeStyles, withStyles, WithStyles, emphasize } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {
    Chart,
    Series,
    CommonSeriesSettings,
    Legend,
    ValueAxis,
    ArgumentAxis,
    Title,
    Tooltip,
    Size,
    Label
} from 'devextreme-react/chart';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chart: {
            padding: theme.spacing(2)
        }
    }),
);



const GWPCompareChart = () => {
    const selectedBuildings = useSelector((state: IRootState) => state.selectedBuildings);
    const checkedEEMetrics = useSelector((state: IRootState) => state.EEMetric);

    const [chartData, setChartData] = useState<ICompareChartDataItem[]>([]);


    useEffect(() => {
        const chartData: ICompareChartDataItem[] = [];

        selectedBuildings.forEach(building => {
            var A1A3: number = Number(building.A1A3) || 0.0;
            var A4: number = Number(building.A4) || 0.0;
            var B4_m: number = Number(building.B4_m) || 0.0;
            var B4_t: number = Number(building.B4_t) || 0.0;

            // Divides by floor area if setting is checked
            if (checkedEEMetrics.perSqM) {
                A1A3 = A1A3 / building.floor_area;
                A4 = A4 / building.floor_area;
                B4_m = B4_m / building.floor_area;
                B4_t = B4_t / building.floor_area;
            }

            // Divides by lifetime year if setting is checked
            if (checkedEEMetrics.perYear) {
                A1A3 = A1A3 / building.lifetime;
                A4 = A4 / building.lifetime;
                B4_m = B4_m / building.lifetime;
                B4_t = B4_t / building.lifetime;
            }


            const dataEntry: ICompareChartDataItem = {
                name: building.building_name,
                identifier: building.building_identifier,
                a1a3: A1A3,
                a4: A4,
                b4m: B4_m,
                b4t: B4_t,
            }

            chartData.push(dataEntry);
        });

        setChartData(chartData.reverse());
    }, [selectedBuildings, checkedEEMetrics]);

    const customizeTooltip = (arg: any) => {
        return {
            text: `<b>${arg.seriesName}</b>\n ${arg.valueText}`
        };
    }

    // Wraps label over two lines if longer than 15 characters
    const customizeArgumentAxisLabel = (data: any) => {
        if (data.value.length > 17) {
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
    
    var axisTitle = "kgCO2e";
    if (checkedEEMetrics.perSqM) axisTitle += "/m\xB2";
    if (checkedEEMetrics.perYear) axisTitle += "/year";

    const classes = useStyles();

    return (
        <Paper>
            <Chart
                className={classes.chart}
                dataSource={chartData}
                palette="Material"
                rotated

            >
                <Size
                    height={500}
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
                        text={axisTitle}
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
        </Paper>
    );
};

export default GWPCompareChart;