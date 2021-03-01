import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import {
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import ProductTable from "./ProductTable";
import ProductChart from "./ProductChart";
import { groupByMaterial, createChildRows, createMaterialChartData } from "helpers/materialHelpers";

interface Props {
  materials: IMaterialInventory[];
}

const ProductView = (props: Props) => {
  const dispatch = useDispatch();

  const displayMode = useSelector((state: IRootState) => state.displayMode);
  const materialInventory = useSelector(
    (state: IRootState) => state.materialInventory
  );

  const [tableData, setTableData] = useState<IMaterialTableRow[]>([]);
  const [chartData, setChartData] = useState<IMaterialChartItem[]>([]);

  useEffect(() => {
    const groupedMaterials = groupByMaterial(
      props.materials
    );
    const childRows = createChildRows(props.materials);
    const treeData = (groupedMaterials as IMaterialTableRow[]).concat(childRows);

    const chartData = createMaterialChartData(groupedMaterials);
    setTableData(treeData);
    setChartData(chartData);
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs>
          {displayMode == "table" ? (
            <Paper>
              <ProductTable data={tableData} />
            </Paper>
          ) : (
            <Paper>
              <ProductChart data={chartData} />
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductView;
