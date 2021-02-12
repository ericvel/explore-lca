import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
  WithStyles,
  emphasize,
} from "@material-ui/core/styles";

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

import { groupByMaterial, sortByEE, wrapArgumentAxisLabel } from "helpers/chartHelpers";

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

const AllMaterialsChart = () => {

  const materialInventory = useSelector(
    (state: IRootState) => state.materialInventory
  );

  const [chartData, setChartData] = useState<IMaterialChartDataItem[]>([]);

  const chartRef: React.MutableRefObject<Chart | null> = useRef(null);

  useEffect(() => {
    const materialsGrouped: IMaterialChartDataItem[] = groupByMaterial(materialInventory);    
    const sortedChartData = sortByEE(materialsGrouped);
    setChartData(sortedChartData);
  }, []);

  const customizeTooltip = (arg: any) => {
    return {
      text: `<b>${arg.seriesName}</b>\n ${arg.valueText}`,
    };
  };

  const onPointHoverChanged = (e: any) => {
    const point = e.target;
    const hoveredElementId = point.data.id;
    const rowElement = document.getElementById("tableRow" + hoveredElementId);

    if (point.isHovered()) {
      // console.log("Hovered: ", hoveredElementId);
      if (rowElement !== null) rowElement.style.backgroundColor = "#F5F5F5";
      // dispatch(allActions.elementAndMaterialActions.hoverBuildingElement(hoveredElementId));
    } else {
      if (rowElement !== null)
        rowElement.style.removeProperty("background-color");
      // dispatch(allActions.elementAndMaterialActions.stopHoverBuildingElement(hoveredElementId));
    }
  };

  const handleRowHover = (elementName: string) => {
    if (chartRef.current !== null) {
      const chartInstance = chartRef.current.instance;
      const a1a3Series = chartInstance.getSeriesByName("A1-A3");
      const point = a1a3Series.getPointsByArg(elementName)[0];
      point.hover();
    }
  };

  const handleRowClearHover = (elementName: string) => {
    if (chartRef.current !== null) {
      const chartInstance = chartRef.current.instance;
      const a1a3Series = chartInstance.getSeriesByName("A1-A3");
      const point = a1a3Series.getPointsByArg(elementName)[0];
      point.clearHover();
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
    // onPointHoverChanged={onPointHoverChanged}
    // ref={chartRef}
    >
      <Size height={height} />
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

export default AllMaterialsChart;
