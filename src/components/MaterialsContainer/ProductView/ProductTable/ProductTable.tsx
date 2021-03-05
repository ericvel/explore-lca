import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import { writeSimulationToDb } from "services/firebase";

import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
  emphasize,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Input from "@material-ui/core/Input";

import {
  SortingState,
  IntegratedSorting,
  IntegratedFiltering,
  SearchState,
  DataTypeProvider,
  GroupingState,
  IntegratedGrouping,
  SummaryState,
  IntegratedSummary,
  TableGroupRowProps,
  EditingState,
  TreeDataState,
  CustomTreeData,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  TableHeaderRow,
  VirtualTable,
  Toolbar,
  SearchPanel,
  ColumnChooser,
  TableColumnVisibility,
  TableFixedColumns,
  TableGroupRow,
  TableSummaryRow,
  GroupingPanel,
  TableEditColumn,
  TableEditRow,
  TableTreeColumn,
} from "@devexpress/dx-react-grid-material-ui";

import _ from "lodash";

import ColumnData from "./ColumnData";
import { GroupCell, SummaryCell, LookupEditCell } from "./CustomCells";
// import { DecimalTypeProvider } from "./DecimalTypeProvider";
import {
  DecimalTypeProvider,
  BoldTypeProvider,
} from "components/TableComponents";
import allActions from "redux/actions";

interface Props {
  data: IMaterialTableRow[];
}

const getRowId = (row: any) => row.idmaterialInventory;

const getHiddenColumnsFilteringExtensions = (hiddenColumnNames: string[]) =>
  hiddenColumnNames.map((columnName) => ({
    columnName,
    predicate: () => false,
  }));

const ProductTable = (props: Props) => {
  const dispatch = useDispatch();

  const [columns] = useState(ColumnData.columns);
  const [columnExtensions] = useState(ColumnData.columnExtensions);
  const [defaultHiddenColumnNames] = useState(
    ColumnData.defaultHiddenColumnNames
  );
  const [tableColumnVisibilityColumnExtensions] = useState(
    ColumnData.tableColumnVisibilityColumnExtensions
  );

  const [decimalColumns] = useState(ColumnData.decimalColumns);

  const [searchTerm, setSearchTerm] = useState<string>();

  const changeSearchTerm = (value: any) => {
    console.log("Changed search term: ", value);
    setSearchTerm(value);
  };

  // Delays query so it is not fired on every keystroke
  const delayedCallback = useCallback(_.debounce(changeSearchTerm, 300), []);

  // Only search in visible columns
  const [filteringColumnExtensions, setFilteringColumnExtensions] = useState(
    getHiddenColumnsFilteringExtensions(defaultHiddenColumnNames)
  );

  const onHiddenColumnNamesChange = (hiddenColumnNames: string[]) =>
    setFilteringColumnExtensions(
      getHiddenColumnsFilteringExtensions(hiddenColumnNames)
    );

  const [expandedRowIds, setExpandedRowIds] = useState<(string | number)[]>([]);

  const [leftFixedColumns] = useState(["name"]);

  const CustomCell = ({ row, style, ...props }: any) => (
    <TableTreeColumn.Cell
      {...props}
      style={{
        fontWeight: row.parentId === null ? "bold" : undefined,
        ...style,
      }}
    />
  );

  const toggleExpandedRow = (rowId: number) => {
    // console.log("lezgo")
    let stateCopy = expandedRowIds;
    var index = expandedRowIds.indexOf(rowId);
    if (index > -1) {
      stateCopy.splice(index, 1);
    } else {
      stateCopy.push(rowId);
    }
    // console.log("State copy: ", stateCopy)
    setExpandedRowIds(stateCopy);
  };

  const getChildRows = (row: any, rootRows: any) => {
    // console.log("row: ", row)
    // console.log("rootRows: ", rootRows)
    const childRows = rootRows.filter(
      (r: any) => r.parentId === (row ? row.idmaterialInventory : null)
    );
    return childRows.length ? childRows : null;
  };

  return (
    <Grid rows={props.data} columns={columns} getRowId={getRowId}>
      <DecimalTypeProvider for={decimalColumns} />
      <TreeDataState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={setExpandedRowIds}
      />
      <CustomTreeData getChildRows={getChildRows} />
      <SearchState onValueChange={delayedCallback} />
      <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
      <SortingState />
      <IntegratedSorting />
      <VirtualTable columnExtensions={columnExtensions} />
      <TableHeaderRow showSortingControls />
      <TableTreeColumn for='name' cellComponent={CustomCell} />
      <TableFixedColumns leftColumns={leftFixedColumns} />
      <TableColumnVisibility
        defaultHiddenColumnNames={defaultHiddenColumnNames}
        columnExtensions={tableColumnVisibilityColumnExtensions}
        onHiddenColumnNamesChange={onHiddenColumnNamesChange}
      />
      <Toolbar />
      <SearchPanel />
      <ColumnChooser />
    </Grid>
  );
};

export default ProductTable;
