import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../redux/reducers';
import allActions from '../../redux/actions';

import { Theme, createStyles, makeStyles, withStyles, WithStyles, emphasize } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
    Stack,
    SeriesRef
} from '@devexpress/dx-react-chart';
import * as d3Format from 'd3-format';

interface Props {
    height: number;
}

interface IBarSeries {
    name: string;
    key: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        overlay: {
            zIndex: 1201
        },
        formControl: {
            margin: theme.spacing(3),
        },
    }),
);

const Overlay = (props: any) => {
    const classes = useStyles();
    return <Tooltip.Overlay {...props} className={classes.overlay} />;
};

const GWPCompareChart = (props: Props) => {
    const selectedBuildings = useSelector((state: IRootState) => state.selectedBuildings);
    const [chartData, setChartData] = useState<any[]>([]);
    const [barSeries, setBarSeries] = useState<IBarSeries[]>([]);
    const [dataKey, setDataKey] = useState("");
    const [tooltipTarget, setTooltipTarget] = useState<SeriesRef>();

    const [checkedLCAPhases, setcheckedLCAPhases] = useState({
        a1a3: true,
        a4: true,
        b4_m: true,
        b4_t: true,
    });

    const handleCheckedLCAPhaseChange = (event: any) => {
        setcheckedLCAPhases({ ...checkedLCAPhases, [event.target.name]: event.target.checked });
    };

    const { a1a3, a4, b4_m, b4_t } = checkedLCAPhases;

    useEffect(() => {
        var currentKey = "";

        selectedBuildings.forEach(element => {
            currentKey += (element.idbuildings).toString();
        });

        setDataKey(currentKey);

        createChartData();

    }, [selectedBuildings, checkedLCAPhases]);

    const createChartData = () => {
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
        setBarSeries(buildingNames);
    }

    const changeTooltip = (targetItem: SeriesRef) => setTooltipTarget(targetItem);

    const tooltipContentTitleStyle = {
        fontWeight: 'bold',
        paddingBottom: 0,
    };
    const tooltipContentBodyStyle = {
        paddingTop: 0,
    };
    const formatTooltip = d3Format.format(',.2r');
    const TooltipContent = (props: any) => {
        const { targetItem, text, ...restProps } = props;
        const targetSeries = barSeries.find(series => series.name === targetItem.series);
        console.log("Tooltip targetItem: ", targetItem);
        return (
            <div>
                <div>
                    <Tooltip.Content
                        {...restProps}
                        style={tooltipContentTitleStyle}
                        text={targetItem.series}
                    />
                </div>
                <div>
                    <Tooltip.Content
                        {...restProps}
                        style={tooltipContentBodyStyle}
                        text={chartData[targetItem.point][targetSeries?.key || -1]}
                    />
                </div>
            </div>
        );
    };


    const height = props.height;

    const classes = useStyles();


    return (
        <div key={dataKey}>
            <Paper>
                <Grid container>
                    <Grid item xs={12}>
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
                            {barSeries.map(({
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
                            <Tooltip 
                                targetItem={tooltipTarget}
                                onTargetItemChange={changeTooltip}
                                overlayComponent={Overlay}
                                contentComponent={TooltipContent}
                            />
                            <Animation duration={600} />
                        </Chart>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">LCA Phases</FormLabel>
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Checkbox checked={a1a3} onChange={handleCheckedLCAPhaseChange} name="a1a3" />}
                                    label="A1-A3"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={a4} onChange={handleCheckedLCAPhaseChange} name="a4" />}
                                    label="A4"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={b4_m} onChange={handleCheckedLCAPhaseChange} name="b4_m" />}
                                    label="B4 (m)"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={b4_t} onChange={handleCheckedLCAPhaseChange} name="b4_t" />}
                                    label="B4 (t)"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default GWPCompareChart;