import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import MuiTooltip from "@material-ui/core/Tooltip";

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
  Font,
  Margin,
  Subtitle,
} from "devextreme-react/chart";

import {
  createMaterialChartData,
  sortByEE,
  wrapArgumentAxisLabel,
} from "helpers/materialHelpers";
import { Grid, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
      // padding: theme.spacing(2),
    },
    chart: {
      overflowX: "hidden",
      // padding: theme.spacing(2),
    },
    argumentAxisLabel: {
      fill: "#767676",
    },
    button: {
      position: "absolute",
      top: "12px",
      left: "18px",
    },
  })
);

interface Props {
  data: IMaterialChartItem[];
}

const CategoryChart = (props: Props) => {
  const [chartData, setChartData] = useState<IMaterialChartItem[]>([]);
  const [isFirstLevel, setIsFirstLevel] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    setChartData(filterData(""));
  }, [props.data]);

  const customizeTooltip = (arg: any) => {
    return {
      text: `<b>${arg.seriesName}</b>\n ${arg.valueText}`,
    };
  };

  const onPointClick = (e: any) => {
    if (isFirstLevel) {
      setIsFirstLevel(false);
      setSelectedCategory(e.target.originalArgument);
      setChartData(filterData(e.target.originalArgument));
    }
  };

  const onDrawn = (e: any) => {
    if (isFirstLevel) {
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
    }
  };

  const filterData = (name: string) => {
    return props.data.filter(function (item) {
      return item.materialCat === name;
    });
  };

  const handleBackClick = () => {
    if (!isFirstLevel) {
      setIsFirstLevel(true);
      setSelectedCategory("");
      setChartData(filterData(""));
    }
  };

  const height = 600; //+ chartData.length * 30;

  const classes = useStyles();

  console.log(isFirstLevel);

  return (
    <div className={classes.container}>
      <MuiTooltip title='Back'>
        <IconButton
          className={classes.button}
          onClick={handleBackClick}
          disabled={isFirstLevel}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </MuiTooltip>
      <Chart
        className={classes.chart}
        dataSource={chartData}
        // title={selectedCategory}
        palette='Material'
        rotated={true}
        onPointClick={onPointClick}
        onDrawn={onDrawn}
      >
        {selectedCategory === "" ? (
          <Title
            text='Click on a bar to see materials'
            horizontalAlignment='center'
            font={{
              size: 16,
              color: grey[500],
              weight: 400,
            }}
          ></Title>
        ) : (
          <Title
            text={selectedCategory}
            horizontalAlignment='center'
            font={{
              size: 18,
              color: "black",
              weight: 500,
              family: 'Roboto, "Segoe UI Light", "Helvetica Neue Light", "Segoe UI", "Helvetica Neue", "Trebuchet MS", Verdana, sans-serif'
            }}
          ></Title>
        )}
        <Size height={height} />
        <Margin top={10} bottom={10} left={30} right={30} />
        <CommonSeriesSettings
          argumentField='name'
          type='stackedBar'
          barWidth={50}
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
    </div>
  );
};

export default CategoryChart;
