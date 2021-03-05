import React, { useState, useEffect, useCallback, ReactText } from "react";
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
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";

import {
  SortingState,
  IntegratedSorting,
  SearchState,
  SelectionState,
  DataTypeProvider,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  TableHeaderRow,
  Table,
  VirtualTable,
  Toolbar,
  SearchPanel,
  ColumnChooser,
  TableColumnVisibility,
  TableFixedColumns,
  TableSelection,
} from "@devexpress/dx-react-grid-material-ui";
import _ from "lodash";

import {
  DecimalTypeProvider,
  BoldTypeProvider,
  SortLabel
} from "components/TableComponents";
import ColumnData from "./ColumnData";
import { getChildElements } from "helpers/materialHelpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customRow: {
      "&:hover": {
        backgroundColor: "#F5F5F5",
        cursor: "pointer",
      },
    },
  })
);

const ElementsTable = (props: any) => {
  const dispatch = useDispatch();

  const buildingElements = useSelector(
    (state: IRootState) => state.buildingElements
  );
  const selectedBuildingElement = useSelector(
    (state: IRootState) => state.selectedBuildingElement
  );

  const [columns] = useState(ColumnData.columns);
  const [columnExtensions] = useState(ColumnData.columnExtensions);
  const [decimalColumns] = useState(["A1A3", "A4", "B4_t", "B4_m"]);
  const [tooltipColumns] = useState(["name"]);
  const [boldColumns] = useState(["name"]);

  const CustomTableRow = ({ row, style, ...props }: any) => (
    <VirtualTable.Row
      {...props}
      id={"tableRow" + row.idbuilding_elements}
      className={useStyles().customRow}
      onClick={() => handleRowClick(row)}
    />
  );

  const TooltipFormatter = ({ value }: any) => (
    <Tooltip title={<span>Go to sub-elements</span>}>
      <span>
        <b>{value}</b>
      </span>
    </Tooltip>
  );

  

  const CellTooltip = (props: any) => (
    <DataTypeProvider formatterComponent={TooltipFormatter} {...props} />
  );

  const handleRowClick = (row: IBuildingElement) => {
    dispatch(allActions.elementAndMaterialActions.selectBuildingElement(row));
    dispatch(allActions.elementAndMaterialActions.addToElementRoute(row));
  };

  const rows = getChildElements(buildingElements, selectedBuildingElement);
  const height = 500; // 232 + rows.length * 50;

  return (
    <Grid rows={rows} columns={columns}>
      <BoldTypeProvider for={boldColumns} />
      <CellTooltip for={tooltipColumns} />
      <DecimalTypeProvider for={decimalColumns} />
      <SortingState />
      <IntegratedSorting />
      <VirtualTable
        columnExtensions={columnExtensions}
        rowComponent={CustomTableRow}
        height={height}
      />
      <TableHeaderRow showSortingControls sortLabelComponent={SortLabel} />
    </Grid>
  );
};

export default ElementsTable;
