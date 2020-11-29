import React, { useState, useEffect, useCallback } from "react";
import { Theme, createStyles, makeStyles, withStyles, WithStyles, emphasize } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Legend,
    Title,
    ArgumentAxis,
    ValueAxis,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import {
    HoverState,
    EventTracker,
    ValueScale,
    Animation,
    Stack
} from '@devexpress/dx-react-chart';

interface Props {
    chartData: any[];//ICompareChartDataItem[];
    buildingNames: any[];
    height: number;
}

const useStyles = makeStyles({
    overlay: {
        zIndex: 1300
    },
});

const Overlay = (props: any) => {
    const classes = useStyles();
    return <Tooltip.Overlay {...props} className={classes.overlay} />;
};

const GWPCompareChart = (props: Props) => {

    const chartData = props.chartData;
    const buildingNames = props.buildingNames;

    const height = props.height;

    return (
        <Paper>
            <Chart
                data={chartData}
                // width={800}
                // height={height}
            >
                <ValueScale name="gwp" />
                <ArgumentAxis />
                <ValueAxis
                    scaleName="gwp"
                    showGrid={false}
                    showLine={true}
                    showTicks={true}
                />
                {buildingNames.map((idNamePair, index) =>
                    <BarSeries
                        key={index}
                        valueField={Object.keys(idNamePair)[0]}
                        argumentField="lcaPhase"
                        name={idNamePair[Object.keys(idNamePair)[0]]}
                        scaleName="gwp"
                    />
                )}
                <Stack />
                <Legend />
                <EventTracker />
                <Tooltip overlayComponent={Overlay} />
                <Animation duration={700} />
            </Chart>
        </Paper>
    );
};

export default GWPCompareChart;

/*
<BarSeries
        valueField="a1a3"
        argumentField="buildingName"
        name="A1-A3"
        scaleName="gwp"
    />
    <BarSeries
        valueField="a4"
        argumentField="buildingName"
        name="A4"
        scaleName="gwp"
    />
    <BarSeries
        valueField="b4_m"
        argumentField="buildingName"
        name="B4 (m)"
        scaleName="gwp"
    />
    <BarSeries
        valueField="b4_t"
        argumentField="buildingName"
        name="B4 (t)"
        scaleName="gwp"
    />
*/