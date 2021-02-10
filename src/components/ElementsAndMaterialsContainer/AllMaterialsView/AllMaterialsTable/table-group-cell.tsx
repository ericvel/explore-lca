import * as React from "react";
import * as PropTypes from "prop-types";
// import classNames from "classnames";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";

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
      cursor: "pointer",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
    indentCell: {
      padding: 0,
    },
    groupButton: {
      // verticalAlign: "middle",
      display: "inline-block",
      // height: theme.spacing(5),
      width: theme.spacing(5),
      // marginRight: theme.spacing(5),
    },
    columnTitle: {
      verticalAlign: "middle",
    },
  })
);

const TableGroupCellBase = ({
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
      <Grid container alignItems="center" justify="space-around">
        <Grid item xs={2}>
          <IconButton className={styles.groupButton}>
            {expanded ? <ExpandMore /> : <ChevronRight />}
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <span className={styles.columnTitle}><strong>{children || row.value}</strong></span>
        </Grid>
      </Grid>
    </TableCell>
  );
};

export const GroupCell = TableGroupCellBase; /*withStyles(styles, { name: "TableGroupCell" })(
  TableGroupCellBase
);*/
