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

    const chartData: ISingleChartDataItem[] = [
        { lcaPhase: 'A1-A3', gwp: Number(selectedBuildings[0].A1A3) || 0.0 },
        { lcaPhase: 'A4', gwp: Number(selectedBuildings[0].A4) || 0.0 },
        { lcaPhase: 'B4 (m)', gwp: Number(selectedBuildings[0].B4_m) || 0.0 },
        { lcaPhase: 'B4 (t)', gwp: Number(selectedBuildings[0].B4_t) || 0.0 },
    ];

    const height = props.height;

    const classes = useStyles();

    return (
        <Paper>
            <Chart className={classes.chart} dataSource={chartData}>
                <Series
                    valueField="gwp"
                    argumentField="lcaPhase"
                    name="Embodied emissions"
                    type="bar"
                    showInLegend={false}
                />
                <ValueAxis>
                    <Title
                        text={"kgCO2e/m\xB2"}
                        font={{
                            size: 12
                        }}
                    />
                </ValueAxis >
                <Tooltip
                    enabled={true}
                    zIndex={1200}
                    arrowLength={6}
                    format="fixedPoint"
                />
            </Chart>
        </Paper>
    );
};

export default GWPSingleChart;