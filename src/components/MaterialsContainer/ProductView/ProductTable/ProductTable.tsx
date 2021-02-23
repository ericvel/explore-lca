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
import { GroupCell, SummaryCell, LookupEditCell } from "./CustomCells";
import { DecimalTypeProvider } from "./DecimalTypeProvider";
import allActions from "redux/actions";

interface Props {
  materials: IMaterialInventory[];
}

const getRowId = (row: any) => row.idmaterialInventory;
const getHiddenColumnsFilteringExtensions = (hiddenColumnNames: string[]) =>
  hiddenColumnNames.map((columnName) => ({
    columnName,
    predicate: () => false,
  }));

const availableValues: any = {
  sourceType: [
    "Ecoinvent",
    "EPD",
    "Superfirma 1",
    "WowzaCompany",
    "Other",
    "na",
  ],
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

const EditButton = ({ onExecute }: any) => (
  <Tooltip title='Edit row' enterDelay={200}>
    <IconButton onClick={onExecute}>
      <EditIcon />
    </IconButton>
  </Tooltip>
);

const CommitButton = ({ onExecute }: any) => (
  <Tooltip title='Save changes' enterDelay={200}>
    <IconButton onClick={onExecute}>
      <SaveIcon />
    </IconButton>
  </Tooltip>
);

const CancelButton = ({ onExecute }: any) => (
  <Tooltip title='Cancel changes' enterDelay={200}>
    <IconButton color='secondary' onClick={onExecute}>
      <CancelIcon />
    </IconButton>
  </Tooltip>
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

const ProductTable = (props: Props) => {
  const dispatch = useDispatch();

  const selectedBuildings = useSelector(
    (state: IRootState) => state.selectedBuildings
  );

  const isSimulationModeActive = useSelector(
    (state: IRootState) => state.isSimulationModeActive
  );
  const simulationData = useSelector(
    (state: IRootState) => state.simulationData
  );

  const [rows, setRows] = useState<IMaterialInventory[]>([]);

  useEffect(() => {
    if (isSimulationModeActive) {
      let rowsWithSimulation = props.materials;
      simulationData.forEach((simulatedEntry) => {
        /* let rowIndex = rowsWithSimulation.findIndex(
          (row) => row.idmaterialInventory === simulatedEntry.inventoryId
        );
        console.log("Index: ", rowIndex)
         */
        // console.log("SimulatedRow: ", simulatedEntry)
        const fields = simulatedEntry.simulatedFields;
        /* for (const field of fields) {
          (rowsWithSimulation[rowIndex] as any)[field.fieldName] =
            field.simulatedValue;
        } */
        /* fields.forEach((field) => {
          (rowsWithSimulation[rowIndex] as any)[field.fieldName] = field.simulatedValue;
        }) */
        const row = simulatedEntry.simulatedFields;

        const tempRows = rowsWithSimulation.map((originalEntry) =>
          originalEntry.idmaterialInventory === simulatedEntry.inventoryId
            ? { ...originalEntry, ...row }
            : originalEntry
        );

        rowsWithSimulation = tempRows;
      });
      setRows(rowsWithSimulation);
      // console.log("Rows: ", rowsWithSimulation);
    } else {
      setRows(props.materials);
    }
  }, [isSimulationModeActive]);

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
  const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);
  const [decimalColumns] = useState(ColumnData.decimalColumns);

  const [editingStateColumnExtensions] = useState(
    ColumnData.editingStateColumnExtensions
  );
  const [editingRowIds, getEditingRowIds] = useState<React.ReactText[]>([]);
  const [rowChanges, setRowChanges] = useState({});

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

  const commitChanges = ({ changed }: any) => {
    let changedRows: IMaterialInventory[] = [];
    if (changed) {
      changedRows = props.materials.map((row) =>
        changed[row.idmaterialInventory]
          ? { ...row, ...changed[row.idmaterialInventory] }
          : row
      );
      const key = Object.keys(changed)[0];
      const value = changed[key];
      console.log("Changed row: ", key);
      console.log("Changed values: ", value);

      writeSimulationToDb(String(selectedBuildings[0].idbuildings), changed);
    }
    dispatch(
      allActions.elementAndMaterialActions.setMaterialInventory(changedRows)
    );
  };

  // Displays all materials
  // const rows = materialInventory;

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
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={getEditingRowIds}
          rowChanges={rowChanges}
          onRowChangesChange={setRowChanges}
          // onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
          columnExtensions={editingStateColumnExtensions}
        />
        <VirtualTable columnExtensions={columnExtensions} />
        <TableHeaderRow showSortingControls />

        <TableEditRow cellComponent={EditCell} />
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
          leftColumns={isSimulationModeActive ? leftFixedColumns : []}
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

export default ProductTable;
