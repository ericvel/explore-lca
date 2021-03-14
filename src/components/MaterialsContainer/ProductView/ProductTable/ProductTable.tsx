import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import { writeSimulatedDataToDb } from "services/firebase";

import { getKeyValue } from "get-key-value";

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

import _, { update } from "lodash";

import ColumnData from "./ColumnData";
import {
  GroupCell,
  SummaryCell,
  LookupEditCell,
  EditCell,
  MaterialProductCell,
} from "components/TableUtilities/CustomCells";
import {
  DecimalTypeProvider,
  SortLabel,
  SimulatedFieldTypeProvider,
} from "components/TableUtilities/Formatters";
import { Popup, PopupEditing } from "components/TableUtilities/EditPlugin";
import allActions from "redux/actions";
import { mergeSimulatedDataIntoMaterialProducts } from "helpers/materialHelpers";

interface Props {
  data: IMaterialTableRow[];
}

const getRowId = (row: any) => row.idmaterialInventory;

const getHiddenColumnsFilteringExtensions = (hiddenColumnNames: string[]) =>
  hiddenColumnNames.map((columnName) => ({
    columnName,
    predicate: () => false,
  }));

const EditButton = ({ onExecute }: any) => (
  <Tooltip title='Edit material'>
    <IconButton onClick={onExecute}>
      <EditIcon />
    </IconButton>
  </Tooltip>
);

const commandComponents: any = {
  edit: EditButton,
};

const Command = ({ id, onExecute }: any) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

const CustomTreeCell = ({ row, style, ...props }: any) => (
  <TableTreeColumn.Cell
    {...props}
    style={{
      fontWeight: row.parentId === null ? "bold" : undefined,
      ...style,
    }}
  />
);

const ProductTable = (props: Props) => {
  const dispatch = useDispatch();

  const selectedBuildings = useSelector(
    (state: IRootState) => state.selectedBuildings
  );
  const materialProducts = useSelector(
    (state: IRootState) => state.materialProducts
  );
  const simulatedMaterialProducts = useSelector(
    (state: IRootState) => state.simulatedMaterialProducts
  );
  const simulatedData = useSelector((state: IRootState) => state.simulatedData);
  const isSimulationModeActive = useSelector(
    (state: IRootState) => state.isSimulationModeActive
  );

  const [rows, setRows] = useState<IMaterialTableRow[]>([]);
  const [columns] = useState(ColumnData.columns);
  const [columnExtensions] = useState(ColumnData.columnExtensions);
  const [defaultHiddenColumnNames] = useState(
    ColumnData.defaultHiddenColumnNames
  );
  const [tableColumnVisibilityColumnExtensions] = useState(
    ColumnData.tableColumnVisibilityColumnExtensions
  );

  const [decimalColumns] = useState(ColumnData.decimalColumns);

  useEffect(() => {
    // console.log("Useeffect, props: ", props.data)
    setRows(props.data);
  }, [props.data]);

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

  const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE, "name"]);

  const getChildRows = (row: any, rootRows: any) => {
    const childRows = rootRows.filter(
      (r: any) => r.parentId === (row ? row.idmaterialInventory : null)
    );
    return childRows.length ? childRows : null;
  };

  const commitChanges = ({ changed }: any) => {
    console.log("Changed: ", changed);
    const changedRowId = Object.keys(changed)[0];
    const originalRow = (materialProducts as IMaterialTableRow[]).find(
      (row) => String(row.idmaterialInventory) === changedRowId
    );

    if (Object.values(changed)[0] !== undefined && originalRow !== undefined) {
      const updatedSimulatedData: ISimulatedData = {
        ...simulatedData,
        ...changed,
      };

      for (const [key, value] of Object.entries(
        updatedSimulatedData[changedRowId]
      )) {
        const originalValue = getKeyValue<
          keyof IMaterialTableRow,
          IMaterialTableRow
        >(key as any, originalRow);
        // Remove field from simulated data if has been reset to original value
        if (value === originalValue) {
          delete updatedSimulatedData[changedRowId][key];
        }
      }

      // Remove simulated data row if all fields havs been removed it
      if (Object.keys(updatedSimulatedData[changedRowId]).length === 0) {
        delete updatedSimulatedData[changedRowId];
      }

      const updatedSimulatedMaterialProducts = mergeSimulatedDataIntoMaterialProducts(
        materialProducts as IMaterialTableRow[],
        updatedSimulatedData
      );

      const selectedBuildingId = String(selectedBuildings[0].idbuildings);
      writeSimulatedDataToDb(selectedBuildingId, updatedSimulatedData);
      dispatch(
        allActions.elementAndMaterialActions.setSimulatedData(
          updatedSimulatedData
        )
      );
      dispatch(
        allActions.elementAndMaterialActions.setSimulatedMaterialProducts(
          updatedSimulatedMaterialProducts
        )
      );
      setRows(updatedSimulatedMaterialProducts);
    }
  };

  return (
    <Grid rows={rows} columns={columns} getRowId={getRowId}>
      {/* <SimulatedFieldTypeProvider for={decimalColumns} /> */}
      <TreeDataState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={setExpandedRowIds}
      />
      <CustomTreeData getChildRows={getChildRows} />
      <SearchState onValueChange={delayedCallback} />
      <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
      <SortingState />
      <IntegratedSorting />
      <EditingState onCommitChanges={commitChanges} />
      <VirtualTable
        columnExtensions={columnExtensions}
        cellComponent={
          isSimulationModeActive
            ? (props) => MaterialProductCell(props, simulatedData)
            : (props) => <VirtualTable.Cell {...props} />
        }
      />

      <DecimalTypeProvider for={decimalColumns} />
      <TableHeaderRow showSortingControls sortLabelComponent={SortLabel} />
      <TableTreeColumn for='name' cellComponent={CustomTreeCell} />
      <TableEditColumn
        showEditCommand={isSimulationModeActive}
        commandComponent={Command}
        cellComponent={EditCell}
        width={isSimulationModeActive ? 70 : 0.1}
      />
      <TableFixedColumns leftColumns={leftFixedColumns} />
      <PopupEditing popupComponent={Popup} />
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
