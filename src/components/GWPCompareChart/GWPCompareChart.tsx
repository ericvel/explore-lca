import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../redux/reducers';
import allActions from '../../redux/actions';

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
import { createReadStream } from "fs";

interface Props {
    /* chartData: any[];//ICompareChartDataItem[];
    buildingNames: any[]; */
    height: number;
    checkedLCAPhases: {
        a1a3: boolean;
        a4: boolean;
        b4_m: boolean;
        b4_t: boolean;
    };
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

const GWPCompareChart = (props: Props) => {
    const selectedBuildings = useSelector((state: IRootState) => state.buildings);
    const [chartData, setChartData] = useState<any[]>([]);
    const [buildingNames, setBuildingNames] = useState<any[]>([]);
    const [series, setSeries] = useState<JSX.Element[]>();
    const [dataKey, setDataKey] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        var currentKey = "";

        selectedBuildings.forEach(element => {
            currentKey += (element.idbuildings).toString();
        });

        setDataKey(currentKey);
        
        createChartData();
        
    }, [selectedBuildings, props.checkedLCAPhases]);

    const createChartData = () => {
        const { a1a3, a4, b4_m, b4_t } = props.checkedLCAPhases;

        var chartData: any[] = [];
        var buildingNames: any[] = [];

        if (a1a3) chartData.push({
            lcaPhase: 'A1-A3'
        });
        if (a4) chartData.push({
            lcaPhase: 'A4'
        });
        if (b4_m) chartData.push({
            lcaPhase: 'B4 (m)'
        });
        if (b4_t) chartData.push({
            lcaPhase: 'B4 (t)'
        });

        selectedBuildings.forEach(building => {
            if (a1a3) chartData[chartData.findIndex(arrayEntry => arrayEntry.lcaPhase === 'A1-A3')][building.idbuildings] = Number(building.A1A3) || 0.0;
            if (a4) chartData[chartData.findIndex(arrayEntry => arrayEntry.lcaPhase === 'A4')][building.idbuildings] = Number(building.A4) || 0.0;
            if (b4_m) chartData[chartData.findIndex(arrayEntry => arrayEntry.lcaPhase === 'B4 (m)')][building.idbuildings] = Number(building.B4_m) || 0.0;
            if (b4_t) chartData[chartData.findIndex(arrayEntry => arrayEntry.lcaPhase === 'B4 (t)')][building.idbuildings] = Number(building.B4_t) || 0.0;

            buildingNames.push({
                name: building.building_name,
                key: building.idbuildings
            })
        });

        setChartData(chartData);
        setBuildingNames(buildingNames);
    }

    const height = props.height;


    return (
        <div key={dataKey}>
            <Paper>
                <Chart
                    data={chartData}
                    // width={800}
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
                    {buildingNames.map(({
                        name, key
                    }) =>
                        <BarSeries
                            key={key}
                            name={name}
                            valueField={key}
                            argumentField='lcaPhase'
                            scaleName='gwp'
                        />
                    )}
                    <Stack />
                    <Legend />
                    <EventTracker />
                    <Tooltip overlayComponent={Overlay} />
                    <Animation duration={700} />
                </Chart>
            </Paper>
        </div>
    );
};

export default GWPCompareChart;