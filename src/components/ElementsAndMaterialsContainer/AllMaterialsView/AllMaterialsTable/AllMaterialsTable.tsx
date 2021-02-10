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
  GroupingState,
  IntegratedGrouping,
  SummaryState,
  IntegratedSummary,
  TableGroupRowProps,
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
} from "@devexpress/dx-react-grid-material-ui";
import _ from "lodash";

import ColumnData from "./ColumnData";
import { GroupCell } from "./table-group-cell";

// const getRowId = (row: any) => row.idmaterialInventory;
const getHiddenColumnsFilteringExtensions = (hiddenColumnNames: string[]) =>
  hiddenColumnNames.map((columnName) => ({
    columnName,
    predicate: () => false,
  }));

const AllMaterialsTable = () => {
  const materialInventory = useSelector(
    (state: IRootState) => state.materialInventory
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
  const [quantityColumns] = useState(["quantity"]);
  const [decimalColumns] = useState(["quantity", "EEf_A1A3", "A1A3", "A4", "B4_t", "B4_m"]);
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

  const [grouping] = useState([{ columnName: "name" }]);
  const [groupSummaryItems] = useState([
    {
      columnName: "quantity",
      type: "sum",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "EEf_A1A3",
      type: "sum",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "A1A3",
      type: "sum",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "A4",
      type: "sum",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "B4_m",
      type: "sum",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "B4_t",
      type: "sum",
      showInGroupFooter: false,
      alignByColumn: true,
    },
  ]);

/*   const GroupCell = ({ row, children, ...props }: any) => (
    <TableGroupRow.Cell {...props}>
      <span>{children}</span>
    </TableGroupRow.Cell>
  ); */

  const GroupCellContent = ({ row, children, ...props }: any) => (
    <TableGroupRow.Content {...props}>
      <span>{children}</span>
    </TableGroupRow.Content>
  );

  const Messages = ({messages, ...props}: any) => {
    
  }

  // Displays all materials
  const rows = materialInventory;

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <DecimalTypeProvider for={decimalColumns} />
        <SearchState onValueChange={delayedCallback} />
        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
        <SortingState />
        <IntegratedSorting />
        <GroupingState grouping={grouping} columnExtensions={[{columnName: "name", groupingEnabled: false}]}/>
        <SummaryState groupItems={groupSummaryItems} />
        <IntegratedGrouping />
        <IntegratedSummary />
        <VirtualTable columnExtensions={columnExtensions} />
        <TableHeaderRow showSortingControls />
        <TableGroupRow messages={{sum: "Total"}} cellComponent={GroupCell} /* contentComponent={GroupCellContent} */ />
        <TableSummaryRow />
        {/* <TableFixedColumns leftColumns={leftColumns} /> */}
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

export default AllMaterialsTable;
