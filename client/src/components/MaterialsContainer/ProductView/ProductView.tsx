import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import ProductTable from "./ProductTable";
import ProductChart from "./ProductChart";
import {
  groupByMaterial,
  createChildRows,
  createMaterialChartData,
} from "helpers/materialHelpers";

interface Props {
  materials?: IMaterialInventory[];
}

const ProductView = (props: Props) => {
  const dispatch = useDispatch();

  const displayMode = useSelector((state: IRootState) => state.displayMode);
  const materialInventory = useSelector(
    (state: IRootState) => state.materialInventory
  );
  const materialProducts = useSelector(
    (state: IRootState) => state.materialProducts
  );
  const simulatedMaterialProducts = useSelector(
    (state: IRootState) => state.simulatedMaterialProducts
  );
  const isSimulationModeActive = useSelector(
    (state: IRootState) => state.isSimulationModeActive
  );
  const simulatedData = useSelector((state: IRootState) => state.simulatedData);

  const [tableData, setTableData] = useState<IMaterialTableRow[]>([]);
  const [chartData, setChartData] = useState<IMaterialChartItem[]>([]);

  useEffect(() => {
    let groupedMaterials;
    if (isSimulationModeActive) {
      groupedMaterials = simulatedMaterialProducts;
    } else {
      groupedMaterials = props.materials
        ? groupByMaterial(props.materials)
        : materialProducts;
    }
    const childRows = createChildRows(props.materials ?? materialInventory);
    const treeData = (groupedMaterials as IMaterialTableRow[]).concat(
      childRows as IMaterialTableRow[]
    );

    const chartData = createMaterialChartData(groupedMaterials);
    setTableData(treeData);
    setChartData(chartData);
  }, [isSimulationModeActive, simulatedData]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs>
          {displayMode == "table" ? (
            <Paper>
              <ProductTable data={tableData} />
            </Paper>
          ) : (
            <ProductChart data={chartData} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductView;
