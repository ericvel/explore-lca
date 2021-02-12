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


// DRILL-DOWN CHART PLS
// https://js.devexpress.com/Demos/WidgetsGallery/Demo/Charts/ChartsDrillDown/React/Light/

const MaterialsChart = (props: any) => {
  const dispatch = useDispatch();

  const contentType = useSelector((state: IRootState) => state.contentType);
  const materialInventory = useSelector(
    (state: IRootState) => state.materialInventory
  );
  const selectedBuildingElement = useSelector(
    (state: IRootState) => state.selectedBuildingElement
  );

  const [chartData, setChartData] = useState<IMaterialChartDataItem[]>([]);

  const chartRef: React.MutableRefObject<Chart | null> = useRef(null);

  useEffect(() => {
    const materials =
      contentType == "hierarchy"
        ? getElementMaterials(selectedBuildingElement)
        : materialInventory;
    const chartData: IMaterialChartDataItem[] = [];

    materials.forEach((material) => {
      const dataEntry: IMaterialChartDataItem = {
        name: material.name,
        id: String(material.idmaterialInventory),
        A1A3: Number(material.A1A3) || 0.0,
        A4: Number(material.A4) || 0.0,
        B4_m: Number(material.B4_m) || 0.0,
        B4_t: Number(material.B4_t) || 0.0,
      };

      chartData.push(dataEntry);
    });

    setChartData(chartData.reverse());
  }, []);

  const getElementMaterials = (parentElement: IBuildingElement) => {
    const elementMaterials = materialInventory.filter(
      (material) =>
        material.idbuilding_elements === parentElement.idbuilding_elements
    );
    if (elementMaterials !== undefined) {
      return elementMaterials;
    }

    return [];
  };

  // Wraps label over two lines if longer than 15 characters
  const customizeArgumentAxisLabel = (data: any) => {
    if (data.value.length > 15) {
      const wordArray = data.value.split(" ");
      if (wordArray.length > 2) {
        const firstLine = wordArray.slice(0, 2).join(" ");
        const secondLine = wordArray.slice(2).join(" ");
        return firstLine + "\n" + secondLine;
      } else {
        return wordArray.join("\n");
      }
    }

    return data.value;
  };

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

  const height = 200 + chartData.length * 50;

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
        argumentField='id'
        type='stackedBar'
        barWidth={40}
        hoverMode='allArgumentPoints'
      ></CommonSeriesSettings>
      <Series valueField='a1a3' name='A1-A3' />
      <Series valueField='a4' name='A4' />
      <Series valueField='b4m' name='B4 (m)' />
      <Series valueField='b4t' name='B4 (t)' />
      <ValueAxis>
        <Title
          text={"kgCO2e"}
          font={{
            size: 14,
          }}
        />
      </ValueAxis>
      <ArgumentAxis>
        <Label customizeText={customizeArgumentAxisLabel} />
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

export default MaterialsChart;
