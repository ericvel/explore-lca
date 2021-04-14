import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import Paper from "@material-ui/core/Paper";

import {
  Theme,
  createStyles,
  makeStyles,
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

import { sortByEE, wrapArgumentAxisLabel } from "helpers/materialHelpers";
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

const ElementsChart = () => {
  const chartRef = useRef<Chart>(null);

  var renderOptions = {
    force: true, // forces redrawing
    animate: true, // redraws the UI component with animation
  };

  const resizeObserver = useRef<ResizeObserver>(
    new ResizeObserver((entries: ResizeObserverEntry[]) => {
      // your code to handle the size change
      console.log("Size changed");
      chartRef?.current?.instance.render(renderOptions);
    })
  );

  const resizedContainerRef = useCallback(
    (container: HTMLDivElement) => {
      if (container !== null) {
        resizeObserver.current.observe(container);
      }
      // When element is unmounted, ref callback is called with a null argument
      // => best time to cleanup the observer
      else {
        if (resizeObserver.current) resizeObserver.current.disconnect();
      }
    },
    [resizeObserver.current]
  );

  const dispatch = useDispatch();

  const buildingElements = useSelector(
    (state: IRootState) => state.buildingElements
  );
  const selectedBuildingElement = useSelector(
    (state: IRootState) => state.selectedBuildingElement
  );
  const [chartData, setChartData] = useState<IElementChartItem[]>([]);

  useEffect(() => {
    const childElements = getChildElements(selectedBuildingElement);
    const chartData: IElementChartItem[] = [];

    childElements.forEach((element) => {
      const dataEntry: IElementChartItem = {
        name: element.idlevels + " - " + element.name,
        id: String(element.idbuilding_elements),
        A1A3: Number(element.A1A3) || 0.0,
        A4: Number(element.A4) || 0.0,
        B4_m: Number(element.B4_m) || 0.0,
        B4_t: Number(element.B4_t) || 0.0,
      };

      chartData.push(dataEntry);
    });

    const sortedChartData = sortByEE(chartData) as IElementChartItem[];

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

  const onDrawn = (e: any) => {
    // Add pointer cursor to all bar points
    e.element.querySelectorAll(".dxc-markers rect").forEach((el: any) => {
      el.style.cursor = "pointer";
    });

    // Add pointer cursor to argument axis labels
    e.element
      .querySelector(".dxc-arg-elements")
      .childNodes.forEach((el: any) => {
        el.style.cursor = "pointer";
      });
  };

  const height = 500; //+ chartData.length * 50;

  const classes = useStyles();

  return (
    <Paper ref={resizedContainerRef}>
      <Chart
        className={classes.chart}
        dataSource={chartData}
        palette='Material'
        rotated={true}
        onPointClick={onPointClick}
        onDrawn={onDrawn}
        ref={chartRef}
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
          customizeHint={customizeHint}
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
    </Paper>
  );
};

export default ElementsChart;
