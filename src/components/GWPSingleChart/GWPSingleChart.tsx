import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../redux/reducers';
import allActions from '../../redux/actions';

import { Theme, createStyles, makeStyles, withStyles, WithStyles, emphasize } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import {
    HoverState,
    EventTracker,
    ValueScale,
    Animation
} from '@devexpress/dx-react-chart';

interface Props {
    chartData: ISingleChartDataItem[];
    height: number;
}

const useStyles = makeStyles({
    overlay: {
        zIndex: 1201
    },
});

const Overlay = (props: any) => {
    const classes = useStyles();
    return <Tooltip.Overlay {...props} className={classes.overlay} />;
};

const GWPSingleChart = (props: Props) => {
    const selectedBuildings = useSelector((state: IRootState) => state.buildings);
    
    const gwpChartData: ISingleChartDataItem[] = [
        { lcaPhase: 'A1-A3', gwp: Number(selectedBuildings[0].A1A3) || 0.0 },
        { lcaPhase: 'A4', gwp: Number(selectedBuildings[0].A4) || 0.0 },
        { lcaPhase: 'B4 (m)', gwp: Number(selectedBuildings[0].B4_m) || 0.0 },
        { lcaPhase: 'B4 (t)', gwp: Number(selectedBuildings[0].B4_t) || 0.0 },
    ];

    const chartData = props.chartData;
    const height = props.height;

    return (
        <Paper>
            <Chart
                data={gwpChartData}
                height={height}
                key={selectedBuildings[0].idbuildings}
            >
                <ValueScale name="gwp" />
                <ArgumentAxis />
                <ValueAxis
                    scaleName="gwp"
                    showGrid={false}
                    showLine={true}
                    showTicks={true}
                />

                <BarSeries
                    name="GWP Values"
                    valueField="gwp"
                    argumentField="lcaPhase"
                    scaleName="gwp"
                />
                <EventTracker />
                <Tooltip overlayComponent={Overlay} />
                <Animation duration={700} />
            </Chart>
        </Paper>
    );
};

export default GWPSingleChart;