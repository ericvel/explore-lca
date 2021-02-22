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

import { sortByEE, wrapArgumentAxisLabel } from "helpers/chartHelpers";

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

const ElementsChart = () => {
  const dispatch = useDispatch();

  const buildingElements = useSelector(
    (state: IRootState) => state.buildingElements
  );
  const selectedBuildingElement = useSelector(
    (state: IRootState) => state.selectedBuildingElement
  );
  const [chartData, setChartData] = useState<IElementChartDataItem[]>([]);

  useEffect(() => {
    const childElements = getChildElements(selectedBuildingElement);
    const chartData: IElementChartDataItem[] = [];

    childElements.forEach((element) => {
      const dataEntry: IElementChartDataItem = {
        name: element.name,
        id: String(element.idbuilding_elements),
        A1A3: Number(element.A1A3) || 0.0,
        A4: Number(element.A4) || 0.0,
        B4_m: Number(element.B4_m) || 0.0,
        B4_t: Number(element.B4_t) || 0.0,
      };

      chartData.push(dataEntry);
    });

    const sortedChartData = sortByEE(chartData);

    setChartData(sortedChartData);
  }, [selectedBuildingElement]);

  const getChildElements = (parentElement: IBuildingElement) => {
    const childElements = buildingElements.filter(
      (element) => element.idparent === parentElement.idlevels
    );
    if (childElements !== undefined) {
      return childElements;
    }

    return [];
  };

  const customizeTooltip = (arg: any) => {
    return {
      text: `<b>${arg.seriesName}</b>\n ${arg.valueText}`,
    };
  };

  const onPointClick = (e: any) => {
    const point = e.target;
    const clickedElementId = Number(point.data.id);

    const element = buildingElements.find(
      (el) => el.idbuilding_elements === clickedElementId
    );

    if (element !== undefined) {
      dispatch(
        allActions.elementAndMaterialActions.selectBuildingElement(element)
      );
      dispatch(allActions.elementAndMaterialActions.addToElementRoute(element));
    }
  };

  const onPointHoverChanged = (e: any) => {
    if (e.target.isHovered()) {
      e.element.style.cursor = "pointer";
    } else {
      e.element.style.cursor = "auto";
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
      onPointClick={onPointClick}
      onPointHoverChanged={onPointHoverChanged}
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
        interactive
      />
    </Chart>
  );
};

export default ElementsChart;
