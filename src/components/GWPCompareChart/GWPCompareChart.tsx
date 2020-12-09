import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../redux/reducers';
import allActions from '../../redux/actions';

import { Theme, createStyles, makeStyles, withStyles, WithStyles, emphasize } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {
    Chart,
    Series,
    CommonSeriesSettings,
    Legend,
    ValueAxis,
    Title,
    Export,
    Tooltip
} from 'devextreme-react/chart';
import { getPalette } from 'devextreme/viz/palette';

interface Props {
    height: number;
}

interface IBarSeries {
    name: string;
    key: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chart: {
            height: 600,
            padding: theme.spacing(2)
        }
    }),
);



const GWPCompareChart = () => {
    const selectedBuildings = useSelector((state: IRootState) => state.selectedBuildings);
    const [chartData, setChartData] = useState<ICompareChartDataItem[]>([]);
    // const [barSeries, setBarSeries] = useState<IBarSeries[]>([]);
    // const [dataKey, setDataKey] = useState("");
    // const [tooltipTarget, setTooltipTarget] = useState<SeriesRef>();



    useEffect(() => {
        const chartData: ICompareChartDataItem[] = [];

        selectedBuildings.forEach(building => {
            const dataEntry: ICompareChartDataItem = {
                name: building.building_name,
                identifier: building.building_identifier,
                a1a3: Number(building.A1A3) || 0.0,
                a4: Number(building.A4) || 0.0,
                b4m: Number(building.B4_m) || 0.0,
                b4t: Number(building.B4_t)|| 0.0,
            }

            chartData.push(dataEntry);
        });

        setChartData(chartData);
    }, [selectedBuildings]);

    const customizeTooltip = (arg: any) => {
        return {
            text: `${arg.seriesName}: ${arg.valueText}`
        };
    }

    const classes = useStyles();

    return (
        <Chart
            className={classes.chart}
            title="Embodied emissions"
            dataSource={chartData}
            palette="Material"
            
        >
            <CommonSeriesSettings argumentField="name" type="stackedBar" />
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
    );
};

export default GWPCompareChart;