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
    chartData: IElementChartDataItem[];
}



const GWPElementMaterialChart = (props: Props) => {
    // const selectedBuildings = useSelector((state: IRootState) => state.selectedBuildings);
    const [chartData, setChartData] = useState<IElementChartDataItem[]>([]);

    useEffect(() => {
        setChartData(props.chartData.reverse());
    }, [props.chartData]);

    /*   const customizeArgumentAxisLabel = (props: any) => {
          console.log("Props: ", props)
          return (
              <Label text="yoyoy"  />
          );
      }
   */
    const customizeArgumentAxisLabel = (label: { valueText: React.ReactNode; }) => {
        return <p>{label.valueText}</p>;
    }

    const customizeTooltip = (arg: any) => {
        return {
            text: `<b>${arg.seriesName}</b>\n ${arg.valueText}`
        };
    }

    const LabelTemplate = (data: { valueText: React.ReactNode; }) => {
        // const classes = useStyles();

        return (
            <svg overflow="visible">
                {/* <image filter="url(#DevExpress_shadow_filter)" y="0" width="60" height="40" href={getFilePath(data.valueText)}></image> */}
                <text className={classes.argumentAxisLabel} x="30" y="59" textAnchor="middle">{data.valueText}</text>
            </svg>
        );
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
                    rotationAngle={45}
                    overlappingBehavior="none"
                    displayMode="rotate"
                // render={LabelTemplate}
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