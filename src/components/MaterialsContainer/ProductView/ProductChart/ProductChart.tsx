import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import theme from "styles/theme";

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
  Label,
} from "devextreme-react/chart";

import {
  createMaterialChartData,
  sortByEE,
  wrapArgumentAxisLabel,
} from "helpers/materialHelpers";
import { customizeHint } from "components/ChartComponents";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chart: {
      padding: theme.spacing(2),
    },
    argumentAxisLabel: {
      fill: "#767676",
    },
  })
);

interface Props {
  data: IMaterialChartItem[];
}

const ProductChart = (props: Props) => {
  const [chartData, setChartData] = useState<IMaterialChartItem[]>([]);
  const isSimulationModeActive = useSelector(
    (state: IRootState) => state.isSimulationModeActive
  );
  const simulatedData = useSelector((state: IRootState) => state.simulatedData);
  const simulatedMaterialProducts = useSelector(
    (state: IRootState) => state.simulatedMaterialProducts
  );

  useEffect(() => {
    const sortedChartData = sortByEE(props.data) as IMaterialChartItem[];
    setChartData(sortedChartData);
  }, [props.data]);

  const customizeTooltip = (arg: any) => {
    return {
      text: `<b>${arg.seriesName}</b>\n ${arg.valueText}`,
    };
  };

  const labelToMaterialId = (label: string): number => {
    return (
      (simulatedMaterialProducts as IMaterialTableRow[]).find((material) => material.name === label)
        ?.idmaterialInventory || 0
    );
  };

  const onDrawn = (e: any) => {
    if (isSimulationModeActive) {
      // Color emission series if contains simulated values
      e.element
        .querySelector(".dxc-arg-elements")
        .childNodes.forEach((el: any) => {
          // const fieldName = labelToFieldname(el.innerHTML);
          var labelText = "";
          if (el.childNodes.length > 1) {
            let spans: string[] = [];
            el.childNodes.forEach((subEl: any) => {
              spans.push(subEl.innerHTML);
            });
            labelText = spans.join(" ");
          } else {
            labelText = el.innerHTML;
          }

          if (labelToMaterialId(labelText) in simulatedData) {
            el.style.fill = theme.palette.simulated.main;
            el.style.fontWeight = 500;
          }
        });
    }
  };

  const height = 200 + chartData.length * 30;

  const classes = useStyles();

  return (
    <Chart
      className={classes.chart}
      // title="Embodied emissions"
      dataSource={chartData}
      palette='Material'
      rotated={true}
      onDrawn={onDrawn}
    >
      <Size height={height > 500 ? height : 500} />
      <CommonSeriesSettings
        argumentField='name'
        type='stackedBar'
        barWidth={40}
        hoverMode='allArgumentPoints'
      ></CommonSeriesSettings>
      <Series valueField='A1A3' name='A1-A3' />
      <Series valueField='A4' name='A4' />
      <Series valueField='B4_m' name='B4 (m)' />
      <Series valueField='B4_t' name='B4 (t)' />
      <ValueAxis>
        <Title
          text={"kgCO2e"}
          font={{
            size: 14,
          }}
        />
      </ValueAxis>
      <ArgumentAxis>
        <Label customizeText={wrapArgumentAxisLabel} />
      </ArgumentAxis>
      <Legend
        verticalAlignment='bottom'
        horizontalAlignment='center'
        itemTextPosition='top'
        customizeHint={customizeHint}
      />
      <Tooltip
        enabled={true}
        location='edge'
        customizeTooltip={customizeTooltip}
        zIndex={1200}
        arrowLength={6}
        format='fixedPoint'
      />
    </Chart>
  );
};

export default ProductChart;
