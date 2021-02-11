import * as React from "react";
import * as PropTypes from "prop-types";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

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
  })
);

const TableSummaryCellBase = ({
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

export const SummaryCell = TableSummaryCellBase;
