import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'redux/reducers';
import allActions from 'redux/actions';

import { Theme, createStyles, makeStyles, withStyles, WithStyles, emphasize } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    SeriesTemplate,
    ValueAxis,
    Title,
    Tooltip,
} from 'devextreme-react/chart';

interface Props {
    chartData: ISingleChartDataItem[];
    height: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chart: {
            height: 250,
            padding: theme.spacing(2)
        }
    }),
);

const GWPSingleChart = (props: Props) => {
    const selectedBuildings = useSelector((state: IRootState) => state.selectedBuildings);
    const checkedEEMetrics = useSelector((state: IRootState) => state.EEMetric);

    var A1A3: number = Number(selectedBuildings[0].A1A3) || 0.0;
    var A4: number = Number(selectedBuildings[0].A4) || 0.0;
    var B4_m: number = Number(selectedBuildings[0].B4_m) || 0.0;
    var B4_t: number = Number(selectedBuildings[0].B4_t) || 0.0;

    // Divides by floor area if setting is checked
    if (checkedEEMetrics.perSqM) {
        A1A3 = A1A3 / selectedBuildings[0].floor_area;
        A4 = A4 / selectedBuildings[0].floor_area;
        B4_m = B4_m / selectedBuildings[0].floor_area;
        B4_t = B4_t / selectedBuildings[0].floor_area;
    }

    // Divides by lifetime year if setting is checked
    if (checkedEEMetrics.perYear) {
        A1A3 = A1A3 / selectedBuildings[0].lifetime;
        A4 = A4 / selectedBuildings[0].lifetime;
        B4_m = B4_m / selectedBuildings[0].lifetime;
        B4_t = B4_t / selectedBuildings[0].lifetime;
    }    

    const chartData: ISingleChartDataItem[] = [
        { lcaPhase: 'A1-A3', gwp: A1A3 },
        { lcaPhase: 'A4', gwp: A4 },
        { lcaPhase: 'B4 (m)', gwp: B4_m },
        { lcaPhase: 'B4 (t)', gwp: B4_t },
    ];

    var axisTitle = "kgCO2e";
    if (checkedEEMetrics.perSqM) axisTitle += "/m\xB2";
    if (checkedEEMetrics.perYear) axisTitle += "/year";

    const height = props.height;
    const classes = useStyles();

    return (
        <Paper>
            <Chart
                className={classes.chart}
                dataSource={chartData}
                palette="Material"
            >
                <CommonSeriesSettings
                    argumentField="lcaPhase"
                    valueField="gwp"
                    type="bar"
                    showInLegend={false}
                    ignoreEmptyPoints={true}
                />
                {/* <Series
                    valueField="gwp"
                    argumentField="lcaPhase"
                    name="Embodied emissions"
                    type="bar"
                    showInLegend={false}
                /> */}
                <ValueAxis>
                    <Title
                        text={axisTitle}
                        font={{
                            size: 12
                        }}
                    />
                </ValueAxis >
                <SeriesTemplate nameField="lcaPhase" />
                <Tooltip
                    enabled={true}
                    zIndex={1200}
                    arrowLength={6}
                    format="fixedPoint"
                    interactive
                />
            </Chart>
        </Paper>
    );
};

export default GWPSingleChart;