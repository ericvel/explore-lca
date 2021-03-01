import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chart: {
      padding: theme.spacing(2),
    },
    argumentAxisLabel: {
      fill: "#767676",
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

interface Props {
  data: IMaterialChartItem[];
}

const CategoryChart = (props: Props) => {
  const [chartData, setChartData] = useState<IMaterialChartItem[]>([]);
  const [isFirstLevel, setIsFirstLevel] = useState<boolean>(true);

  useEffect(() => {
    // const sortedChartData = sortByEE(props.data) as IMaterialChartItem[];
    // setChartData(props.data);

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
      setChartData(filterData(""));
    }
  }

  const height = 500; //+ chartData.length * 30;

  const classes = useStyles();
  
  console.log(isFirstLevel)

  return (
    <div>
      { !isFirstLevel ?
        (<Button className={classes.button} startIcon={<NavigateBeforeIcon />} onClick={handleBackClick}>
          {"Back"}
        </Button>)
        : <div>wah</div>
      }
      <Chart
        className={classes.chart}
        dataSource={chartData}
        palette='Material'
        rotated={true}
        onPointClick={onPointClick}
        onDrawn={onDrawn}
      >
        <Size height={height} />
        <CommonSeriesSettings
          argumentField='name'
          type='stackedBar'
          barWidth={80}
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
