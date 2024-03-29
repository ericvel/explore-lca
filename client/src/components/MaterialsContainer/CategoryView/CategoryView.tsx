import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
  emphasize,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import CategoryTable from "./CategoryTable";
import CategoryChart from "./CategoryChart";
import {
  groupByMaterial,
  createChildRows,
  createMaterialChartData,
  groupByCategory,
  sortByEE,
} from "helpers/materialHelpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadCrumbs: {
      marginBottom: theme.spacing(2),
    },
    chart: {
      // height: 600,
      padding: theme.spacing(2),
    },
    elementTable: {
      padding: theme.spacing(2),
    },
  })
);

interface Props {
  materials: IMaterialInventory[];
}

const CategoryView = (props: Props) => {
  const dispatch = useDispatch();

  const displayMode = useSelector((state: IRootState) => state.displayMode);
  const materialInventory = useSelector(
    (state: IRootState) => state.materialInventory
  );

  const [tableData, setTableData] = useState<IMaterialTableRow[]>([]);
  const [chartData, setChartData] = useState<IMaterialChartItem[]>([]);

  useEffect(() => {
    const groupedMaterials = groupByMaterial(props.materials);

    const materialChildRows = createMaterialChartData(groupedMaterials);
    const categoryParentRows = groupByCategory(materialChildRows);
    const chartData = materialChildRows.concat(categoryParentRows);
    const sortedChartData = sortByEE(chartData) as IMaterialChartItem[];

    setTableData(groupedMaterials as IMaterialTableRow[]);
    setChartData(sortedChartData);
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs>
          {displayMode === "table" ? (
            <Paper>
              <CategoryTable materials={tableData} />
            </Paper>
          ) : (
            <CategoryChart data={chartData} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default CategoryView;
