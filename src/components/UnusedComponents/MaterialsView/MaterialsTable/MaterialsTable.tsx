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
import {
  SortingState,
  IntegratedSorting,
  IntegratedFiltering,
  SearchState,
  DataTypeProvider,
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
} from "@devexpress/dx-react-grid-material-ui";
import _ from "lodash";

import ColumnData from "./ColumnData";
import { GroupBy } from "interfaces/enums";

// const getRowId = (row: any) => row.idmaterialInventory;
const getHiddenColumnsFilteringExtensions = (hiddenColumnNames: string[]) =>
  hiddenColumnNames.map((columnName) => ({
    columnName,
    predicate: () => false,
  }));

const MaterialsTable = () => {
  const contentType = useSelector((state: IRootState) => state.materialsGroupBy);
  const materialInventory = useSelector(
    (state: IRootState) => state.materialInventory
  );
  const selectedBuildingElement = useSelector(
    (state: IRootState) => state.selectedBuildingElement
  );

  const [columns] = useState(ColumnData.columns);
  const [columnExtensions] = useState(ColumnData.columnExtensions);
  const [defaultHiddenColumnNames] = useState(
    ColumnData.defaultHiddenColumnNames
  );
  const [tableColumnVisibilityColumnExtensions] = useState(
    ColumnData.tableColumnVisibilityColumnExtensions
  );
  const [leftColumns] = useState(["name"]);
  const [gwpColumns] = useState(["A1A3", "A4", "B4_t", "B4_m"]);
  const [searchTerm, setSearchTerm] = useState<string>();

  const getElementMaterials = (parentElement: IBuildingElement) => {
    const elementMaterials = materialInventory.filter(
      (material) =>
        material.idbuilding_elements === parentElement.idbuilding_elements
    );
    if (elementMaterials !== undefined) {
      return elementMaterials;
    }

    return [];
  };

  const GWPFormatter = ({ value }: any) =>
    value && value > 0.0 ? parseFloat(value).toFixed(3) : (0.0).toFixed(1);

  const GWPTypeProvider = (props: any) => (
    <DataTypeProvider formatterComponent={GWPFormatter} {...props} />
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

  // Displays only inventory for selected building element if one is selected
  const rows =
    contentType == GroupBy.BuildingElement
      ? getElementMaterials(selectedBuildingElement)
      : materialInventory;

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <GWPTypeProvider for={gwpColumns} />
        <SearchState onValueChange={delayedCallback} />
        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
        <SortingState />
        <IntegratedSorting />
        <VirtualTable columnExtensions={columnExtensions} />
        <TableHeaderRow showSortingControls />
        <TableFixedColumns leftColumns={leftColumns} />
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

export default MaterialsTable;
