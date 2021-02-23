import React from "react";
import TableCell from "@material-ui/core/TableCell";
import Select from "@material-ui/core/Select";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const LookupEditCellBase = ({
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
export const LookupEditCell = LookupEditCellBase;
