import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";

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
} from "@devexpress/dx-react-grid-material-ui";

import _ from "lodash";

import ColumnData from "./ColumnData";
import { GroupCell } from "./GroupCell";
import { SummaryCell } from "./SummaryCell";

const getRowId = (row: any) => row.idmaterialInventory;
const getHiddenColumnsFilteringExtensions = (hiddenColumnNames: string[]) =>
  hiddenColumnNames.map((columnName) => ({
    columnName,
    predicate: () => false,
  }));

const AllMaterialsTable = () => {
  const materialInventory = useSelector(
    (state: IRootState) => state.materialInventory
  );

  const isSimulationModeActive = useSelector(
    (state: IRootState) => state.isSimulationModeActive
  );

  const [columns] = useState(ColumnData.columns);
  const [columnExtensions] = useState(ColumnData.columnExtensions);
  const [defaultHiddenColumnNames] = useState(
    ColumnData.defaultHiddenColumnNames
  );
  const [tableColumnVisibilityColumnExtensions] = useState(
    ColumnData.tableColumnVisibilityColumnExtensions
  );
  const [grouping] = useState([{ columnName: "name" }]);
  const [groupSummaryItems] = useState(ColumnData.groupSummaryItems);
  const [leftColumns] = useState([TableEditColumn.COLUMN_TYPE]);
  const [decimalColumns] = useState(ColumnData.decimalColumns);

  const [editingStateColumnExtensions] = useState(ColumnData.editingStateColumnExtensions);

  const [searchTerm, setSearchTerm] = useState<string>();

  const DecimalFormatter = ({ value }: any) =>
    value && value > 0.0 ? parseFloat(value).toFixed(3) : (0.0).toFixed(1);

  const DecimalTypeProvider = (props: any) => (
    <DataTypeProvider formatterComponent={DecimalFormatter} {...props} />
  );

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

  const groupRowSummaryItem = ({ value }: any) => {
    // Removes summary type label (i.e. "Sum: " or "Count: ")
    var formattedValue;
    if (typeof value === "string") {
      formattedValue = value;
    } else {
      // Formats decimal numbers
      formattedValue =
        value && value > 0.0 ? parseFloat(value).toFixed(3) : (0.0).toFixed(1);
    }

    return <strong>{formattedValue}</strong>;
  };

  const staticValueCalculator = (type: string, rows: any[], getValue: any) => {
    if (type === "staticValue") {
      if (!rows.length) {
        return null;
      }
      // Just display string value as "summary"
      return getValue(rows[0]);
    }
    return IntegratedSummary.defaultCalculator(type, rows, getValue);
  };

  const EditButton = ({ onExecute }: any) => (
    <IconButton onClick={onExecute} title='Edit row'>
      <EditIcon />
    </IconButton>
  );

  const CommitButton = ({ onExecute }: any) => (
    <IconButton onClick={onExecute} title='Save changes'>
      <SaveIcon />
    </IconButton>
  );

  const CancelButton = ({ onExecute }: any) => (
    <IconButton color='secondary' onClick={onExecute} title='Cancel changes'>
      <CancelIcon />
    </IconButton>
  );

  const commandComponents: any = {
    edit: EditButton,
    commit: CommitButton,
    cancel: CancelButton,
  };

  const Command = ({ id, onExecute }: any) => {
    const CommandButton = commandComponents[id];
    return <CommandButton onExecute={onExecute} />;
  };
  /* 
  const availableValues = {
    product: globalSalesValues.product,
    region: globalSalesValues.region,
    customer: globalSalesValues.customer,
  };

  const EditCell = (props: any) => {
    const { column } = props;
    const availableColumnValues = availableValues[column.name];
    if (availableColumnValues) {
      return (
        <LookupEditCell
          {...props}
          availableColumnValues={availableColumnValues}
        />
      );
    }
    return <TableEditRow.Cell {...props} />;
  };
 */
  // Displays all materials
  const rows = materialInventory;

  return (
    <Paper>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <DecimalTypeProvider for={decimalColumns} />
        <SearchState onValueChange={delayedCallback} />
        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
        <SortingState />
        <IntegratedSorting />
        <GroupingState grouping={grouping} />
        <SummaryState groupItems={groupSummaryItems} />
        <IntegratedGrouping />
        <IntegratedSummary calculator={staticValueCalculator} />
        <EditingState
          onCommitChanges={() => {}}
          columnExtensions={editingStateColumnExtensions}
        />
        <VirtualTable columnExtensions={columnExtensions} />
        <TableHeaderRow showSortingControls />

        <TableEditRow />
        <TableEditColumn
          showEditCommand={isSimulationModeActive}
          commandComponent={Command}
          width={isSimulationModeActive ? 100 : 0.1}
        />
        <TableGroupRow
          cellComponent={GroupCell}
          summaryCellComponent={SummaryCell}
          summaryItemComponent={groupRowSummaryItem}
          indentColumnWidth={isSimulationModeActive ? 0.1 : 48}
        />
        <TableSummaryRow />
        <TableFixedColumns
          leftColumns={isSimulationModeActive ? leftColumns : []}
        />
        <TableColumnVisibility
          defaultHiddenColumnNames={defaultHiddenColumnNames}
          columnExtensions={tableColumnVisibilityColumnExtensions}
          onHiddenColumnNamesChange={onHiddenColumnNamesChange}
        />
        <Toolbar />
        <GroupingPanel showSortingControls />
        <SearchPanel />
        <ColumnChooser />
      </Grid>
    </Paper>
  );
};

export default AllMaterialsTable;
