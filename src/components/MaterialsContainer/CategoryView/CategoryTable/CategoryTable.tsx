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
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
  Action,
} from "@devexpress/dx-react-core";

import _ from "lodash";

import ColumnData from "./ColumnData";
import { DecimalTypeProvider } from "./DecimalTypeProvider";
import allActions from "redux/actions";

interface Props {
  materials: IMaterialTableRow[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    parentTreeCell: {
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#F5F5F5",
        cursor: "pointer",
      },
    },
  })
);

const getRowId = (row: any) => row.idmaterialInventory;

const getHiddenColumnsFilteringExtensions = (hiddenColumnNames: string[]) =>
  hiddenColumnNames.map((columnName) => ({
    columnName,
    predicate: () => false,
  }));

const CategoryTable = (props: Props) => {
  const dispatch = useDispatch();

  const selectedBuildings = useSelector(
    (state: IRootState) => state.selectedBuildings
  );

  const [rows, setRows] = useState<IMaterialTableRow[]>(props.materials);

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
  const [boldColumns] = useState(["name"]);

  const BoldFormatter = ({ value }: any) => <b>{value}</b>;

  const BoldTypeProvider = (props: any) => {
    console.log("Type provider props: ", props);
    return <DataTypeProvider formatterComponent={BoldFormatter} {...props} />;
  };

  const CustomCell = ({ row, style, ...props }: any) => (
    <TableTreeColumn.Cell
      {...props}
      style={{
        fontWeight: row.parentId === null ? "bold" : undefined,
        ...style
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
    debugExpandedRows(stateCopy);
  };

  const getChildRows = (row: any, rootRows: any) => {
    // console.log("row: ", row)
    // console.log("rootRows: ", rootRows)
    const childRows = rootRows.filter(
      (r: any) => r.parentId === (row ? row.idmaterialInventory : null)
    );
    return childRows.length ? childRows : null;
  };

  const debugExpandedRows = (props: any) => {
    console.log("Debug props: ", props);
    setExpandedRowIds(props);
  };

  // console.log("Expanded row ids: ", expandedRowIds);

  return (
    <Paper>
      <Grid rows={props.materials} columns={columns} getRowId={getRowId}>
        {/* <BoldTypeProvider for={boldColumns} /> */}
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
    </Paper>
  );
};

export default CategoryTable;
