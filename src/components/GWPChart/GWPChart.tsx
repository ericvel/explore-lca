import React, { useState, useEffect, useCallback } from "react";
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
    chartData: IDataItem[];
    height: number;
}

const useStyles = makeStyles({
    overlay: {
        zIndex: 501
    },
});

const Overlay = (props: any) => {
    const classes = useStyles();
    return <Tooltip.Overlay {...props} className={classes.overlay} />;
};

const GWPChart = (props: Props) => {

    const chartData = props.chartData;
    const height = props.height;

    return (
        <Paper>
            <Chart
                data={chartData}
                height={height}
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

export default GWPChart;