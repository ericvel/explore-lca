import React from "react";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Select from "@material-ui/core/Select";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

import { VirtualTable } from "@devexpress/dx-react-grid-material-ui";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import theme from "styles/theme";

import { useSelector } from "react-redux";
import { IRootState } from "redux/reducers";

const useStyles = makeStyles((/* theme: Theme */) =>
  createStyles({
    cell: {
      padding: theme.spacing(1),
    },
    indentCell: {
      padding: 0,
    },
    groupButton: {
      height: theme.spacing(4),
      width: theme.spacing(4),
    },
    lookupEditCell: {
      padding: theme.spacing(1),
    },
    inputRoot: {
      width: "100%",
    },
    selectMenu: {
      position: "absolute !important" as "absolute",
    },
    editCell: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
    simulatedField: {
      color: theme.palette.simulated.main,
      // fontWeight: "bolder",
    },
  }));

export const GroupCell = ({
  style,
  colSpan,
  row,
  column,
  expanded,
  onToggle,
  classes,
  children,
  className,
  tableRow,
  tableColumn,
  contentComponent,
  iconComponent,
  indentCellComponent,
  inlineSummaryComponent,
  inlineSummaryItemComponent,
  summaryCellComponent,
  summaryItemComponent,
  containerComponent,
  inlineSummaries,
  getMessage,
  ...restProps
}: any) => {
  const handleClick = () => onToggle();
  const styles = useStyles();
  return (
    <TableCell
      colSpan={colSpan}
      style={style}
      className={styles.cell}
      onClick={handleClick}
      {...restProps}
    >
      <Grid container alignItems='center' justify='space-around'>
        <Grid item xs={2}>
          <IconButton className={styles.groupButton}>
            {expanded ? <ExpandMore /> : <ChevronRight />}
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <span>
            <strong>{children || row.value}</strong>
          </span>
        </Grid>
      </Grid>
    </TableCell>
  );
};

export const SummaryCell = ({
  style,
  colSpan,
  row,
  column,
  expanded,
  onToggle,
  classes,
  children,
  className,
  tableRow,
  tableColumn,
  contentComponent,
  iconComponent,
  indentCellComponent,
  inlineSummaryComponent,
  inlineSummaryItemComponent,
  summaryCellComponent,
  summaryItemComponent,
  containerComponent,
  inlineSummaries,
  getMessage,
  ...restProps
}: any) => {
  const styles = useStyles();
  const handleClick = () => onToggle();
  var tooltipTitle: string = "";
  switch (children.props.columnSummaries[0].type) {
    case "sum":
      tooltipTitle = "Sum";
      break;
    case "avg":
      tooltipTitle = "Average";
      break;
    case "staticValue":
      tooltipTitle = "Static";
      break;
  }
  return (
    <TableCell
      colSpan={colSpan}
      onClick={handleClick}
      className={styles.cell}
      {...restProps}
    >
      {tooltipTitle === "Static" ? (
        <span>{children}</span>
      ) : (
        <Tooltip title={tooltipTitle}>
          <span>{children}</span>
        </Tooltip>
      )}
    </TableCell>
  );
};

export const LookupEditCell = ({
  availableColumnValues,
  value,
  onValueChange,
}: any) => (
  <TableCell className={useStyles().lookupEditCell}>
    <Select
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      MenuProps={{
        className: useStyles().selectMenu,
      }}
      input={<Input classes={{ root: useStyles().inputRoot }} />}
    >
      {availableColumnValues.map((item: any) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);

export const EditCell = ({ children, style, ...restProps }: any) => {
  return (
    <VirtualTable.Cell
      {...restProps}
      children={restProps.row.parentId === null ? children : null}
      style={{ paddingTop: "0px", paddingBottom: "0px", ...style }}
    />
  );
};

const SimulatedFieldCell = ({ value, style, ...restProps }: any) => (
  <VirtualTable.Cell
    {...restProps}
    style={{
      ...style,
    }}
  >
    <span
      style={{
        color: theme.palette.simulated.main,
        fontWeight: "bold"
      }}
    >
      {typeof value === "number" ? value.toLocaleString() : value}
    </span>
  </VirtualTable.Cell>
);

export const MaterialProductCell = (
  props: any,
  simulatedData: ISimulatedData
) => {
  const { column, row } = props;

  if (row.idmaterialInventory in simulatedData) {
    if (column.name in simulatedData[row.idmaterialInventory]) {
      return <SimulatedFieldCell {...props} />;
    }
  }

  return <VirtualTable.Cell {...props} />;
};
