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
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";

import {
  SortingState,
  IntegratedSorting,
  SearchState,
  SelectionState,
  DataTypeProvider,
  EditingState,
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
  TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";
import _ from "lodash";

import {
  DecimalTypeProvider,
  BoldTypeProvider,
  SortLabel,
} from "components/TableUtilities/Formatters";
import { EditCell } from "components/TableUtilities/CustomCells";
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

  const EditButton = ({ onExecute }: any) => (
    <Tooltip title='Go to sub-elements'>
      <IconButton onClick={onExecute}>
        <ChevronRightIcon />
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

  const rows = getChildElements(buildingElements, selectedBuildingElement);
  const height = 500; // 232 + rows.length * 50;

  return (
    <Grid rows={rows} columns={columns}>
      <BoldTypeProvider for={boldColumns} />
      {/* <CellTooltip for={tooltipColumns} /> */}
      <DecimalTypeProvider for={decimalColumns} />
      <SortingState />
      <IntegratedSorting />
      <EditingState onCommitChanges={() => {}} />
      <VirtualTable
        columnExtensions={columnExtensions}
        rowComponent={CustomTableRow}
        height={height}
      />
      <TableHeaderRow showSortingControls sortLabelComponent={SortLabel} />
      <TableEditColumn
        // showEditCommand={isSimulationModeActive}
        showEditCommand
        commandComponent={Command}
        // cellComponent={EditCell}
        width={80}
      />
    </Grid>
  );
};

export default ElementsTable;
