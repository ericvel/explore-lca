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

import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
  emphasize,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
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
  })
);

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
  //   console.log("Children: ", children)
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
