import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import { EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiGrid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginRight: theme.spacing(2),
      minWidth: 180,
    },
  })
);

interface ISourceType {
  value: string;
  label: string;
}

/* const sourceTypes: ISourceType[] = [
  {
    value: "epd",
    label: "EPD",
  },
  {
    value: "ecoinvent",
    label: "Ecoinvent",
  },
  {
    value: "other",
    label: "Other",
  },
  {
    value: "custom",
    label: "Custom",
  },
  {
    value: "na",
    label: "na",
  },
  {
    value: "klimatre",
    label: "Klimatre",
  },
  {
    value: "pep",
    label: "PEP",
  },
  {
    value: "testSource",
    label: "Test source",
  },
]; */

const sourceTypes = ["EPD", "Ecoinvent", "Other", "Custom", "na", "Klimatre", "PEP", "Test source"];

interface PopupProps {
  row: IMaterialTableRow;
  onChange: any;
  onApplyChanges: any;
  onCancelChanges: any;
  open: boolean;
}

export const Popup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}: PopupProps) => {
  const [sourceType, setSourceType] = useState<string>("");

  useEffect(() => {
    /* const sourceTypeValue = sourceTypes.find(
      (sourceType) => sourceType.label === row.sourceType
    )?.value || ""; */

    setSourceType(row.sourceType);
  }, [row]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSourceType(event.target.value);
    onChange(event);
  };

  return (
    <Dialog
      open={open}
      onClose={onCancelChanges}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Material details</DialogTitle>
      <DialogContent>
        <MuiGrid container spacing={3}>
          <MuiGrid item xs={6}>
            <FormGroup>
              <TextField
                margin='normal'
                name='materialCat'
                label='Category'
                value={row.materialCat || ""}
                onChange={onChange}
                // disabled
              />
              <TextField
                margin='normal'
                name='quantity'
                label='Quantity'
                value={row.quantity || ""}
                onChange={onChange}
                disabled
              />
            </FormGroup>
          </MuiGrid>
          <MuiGrid item xs={6}>
            <FormGroup>
              <TextField
                select
                margin='normal'
                name='sourceType'
                label='Source type'
                value={sourceType || ""}
                onChange={handleChange}
              >
                {sourceTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormGroup>
          </MuiGrid>
        </MuiGrid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelChanges} color='primary'>
          Cancel
        </Button>
        <Button onClick={onApplyChanges} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const PopupEditing = React.memo(({ popupComponent: Popup }: any) => (
  <Plugin>
    <Template name='popupEditing'>
      <TemplateConnector>
        {(
          {
            rows,
            getRowId,
            addedRows,
            editingRowIds,
            createRowChange,
            rowChanges,
          },
          {
            changeRow,
            changeAddedRow,
            commitChangedRows,
            commitAddedRows,
            stopEditRows,
            cancelAddedRows,
            cancelChangedRows,
          }
        ) => {
          const isNew = addedRows.length > 0;
          let editedRow: any;
          let rowId: number;
          if (isNew) {
            rowId = 0;
            editedRow = addedRows[rowId];
          } else {
            [rowId] = editingRowIds;
            const targetRow = rows.filter(
              (row: any) => getRowId(row) === rowId
            )[0];
            editedRow = { ...targetRow, ...rowChanges[rowId] };
          }

          const processValueChange = ({ target: { name, value } }: any) => {
            const changeArgs = {
              rowId,
              change: createRowChange(editedRow, value, name),
            };
            if (isNew) {
              changeAddedRow(changeArgs);
            } else {
              changeRow(changeArgs);
            }
          };
          const rowIds = isNew ? [0] : editingRowIds;
          const applyChanges = () => {
            if (isNew) {
              commitAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              commitChangedRows({ rowIds });
            }
          };
          const cancelChanges = () => {
            if (isNew) {
              cancelAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              cancelChangedRows({ rowIds });
            }
          };

          const open = editingRowIds.length > 0 || isNew;
          return (
            <Popup
              open={open}
              row={editedRow}
              onChange={processValueChange}
              onApplyChanges={applyChanges}
              onCancelChanges={cancelChanges}
            />
          );
        }}
      </TemplateConnector>
    </Template>
    <Template name='root'>
      <TemplatePlaceholder />
      <TemplatePlaceholder name='popupEditing' />
    </Template>
  </Plugin>
));
