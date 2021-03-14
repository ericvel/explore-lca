import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import { getKeyValue } from "get-key-value";
import theme from "styles/theme";

import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
  WithStyles,
  emphasize,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  SeriesTemplate,
  ValueAxis,
  Title,
  Tooltip,
  Label,
} from "devextreme-react/chart";

import { roundTo } from "components/TableUtilities/SimulationHelpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chart: {
      height: 200,
      padding: theme.spacing(2),
    },
  })
);

const SingleBuildingChart = () => {
  const selectedBuildings = useSelector(
    (state: IRootState) => state.selectedBuildings
  );
  const simulatedMaterialProducts = useSelector(
    (state: IRootState) => state.simulatedMaterialProducts
  );
  const isSimulationModeActive = useSelector(
    (state: IRootState) => state.isSimulationModeActive
  );
  const simulatedData = useSelector((state: IRootState) => state.simulatedData);
  const checkedEEMetrics = useSelector((state: IRootState) => state.EEMetric);

  const [chartData, setChartData] = useState<ISingleChartDataItem[]>([]);

  useEffect(() => {
    var A1A3: number;
    var A4: number;
    var B4_m: number;
    var B4_t: number;
    var nonSimulatedValues = {
      A1A3: Number(selectedBuildings[0].A1A3) || 0.0,
      A4: Number(selectedBuildings[0].A4) || 0.0,
      B4_m: Number(selectedBuildings[0].B4_m) || 0.0,
      B4_t: Number(selectedBuildings[0].B4_t) || 0.0,
    };
    var simulatedValues = {};

    if (isSimulationModeActive) {
      A1A3 = isSeriesSimulated("A1A3") ? sumMaterialEmissions("A1A3") : nonSimulatedValues.A1A3;
      A4 = isSeriesSimulated("A4") ? sumMaterialEmissions("A4") : nonSimulatedValues.A4;
      B4_m = isSeriesSimulated("B4_m") ? sumMaterialEmissions("B4_m") : nonSimulatedValues.B4_m;
      B4_t = isSeriesSimulated("B4_t") ? sumMaterialEmissions("B4_t") : nonSimulatedValues.B4_t;
    } else {
      A1A3 = Number(selectedBuildings[0].A1A3) || 0.0;
      A4 = Number(selectedBuildings[0].A4) || 0.0;
      B4_m = Number(selectedBuildings[0].B4_m) || 0.0;
      B4_t = Number(selectedBuildings[0].B4_t) || 0.0;
    }

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
      { lcaPhase: "A1-A3", gwp: A1A3 },
      { lcaPhase: "A4", gwp: A4 },
      { lcaPhase: "B4 (m)", gwp: B4_m },
      { lcaPhase: "B4 (t)", gwp: B4_t },
    ];

    setChartData(chartData);
  }, [selectedBuildings[0], isSimulationModeActive, simulatedData]);

  const isSeriesSimulated = (series: string): boolean => {
    return Object.values(simulatedData).some(function (value: any) {
      return series in value;
    });
  };

  const sumMaterialEmissions = (column: string): number => {
    const sum = simulatedMaterialProducts.reduce(
      (a, b) =>
        a +
        (Number(
          getKeyValue<keyof IMaterialTableParentRow, IMaterialTableParentRow>(
            column as any,
            b
          )
        ) || 0),
      0
    );
    return sum;
  };

  const onDrawn = (e: any) => {
    if (isSimulationModeActive) {
      // Color emission series if contains simulated values
      e.element
        .querySelector(".dxc-arg-elements")
        .childNodes.forEach((el: any) => {
          const fieldName = labelToFieldname(el.innerHTML);
          if (isSeriesSimulated(fieldName))
            el.style.fill = theme.palette.simulated.main;
          el.style.fontWeight = 500;
        });
    }
  };

  const labelToFieldname = (seriesLabel: string) => {
    switch (seriesLabel) {
      case "A1-A3":
        return "A1A3";
      case "A4":
        return "A4";
      case "B4 (m)":
        return "B4_m";
      case "B4 (t)":
        return "B4_t";
      default:
        return "";
    }
  };

  var axisTitle = "kgCO2e";
  if (checkedEEMetrics.perSqM) axisTitle += "/m\xB2";
  if (checkedEEMetrics.perYear) axisTitle += "/year";

  const classes = useStyles();

  return (
    <Paper>
      <Chart
        className={classes.chart}
        dataSource={chartData}
        palette='Material'
        onDrawn={onDrawn}
      >
        <CommonSeriesSettings
          argumentField='lcaPhase'
          valueField='gwp'
          type='bar'
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
              size: 12,
            }}
          />
        </ValueAxis>
        <ArgumentAxis>
          {/* <Label
            font={{
              color: isSimulationModeActive
                ? theme.palette.simulated.main
                : "#767676",
            }}
          /> */}
        </ArgumentAxis>
        <SeriesTemplate nameField='lcaPhase' />
        <Tooltip
          enabled={true}
          zIndex={1200}
          arrowLength={6}
          format='fixedPoint'
          interactive
        />
      </Chart>
    </Paper>
  );
};

export default SingleBuildingChart;
