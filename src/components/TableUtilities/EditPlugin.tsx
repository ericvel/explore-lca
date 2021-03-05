import React, { useState } from "react";
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

export const Popup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}: any) => (
  <Dialog
    open={open}
    onClose={onCancelChanges}
    aria-labelledby='form-dialog-title'
  >
    <DialogTitle id='form-dialog-title'>Employee Details</DialogTitle>
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
            />
            <TextField
              margin='normal'
              name='quantity'
              label='Quantity'
              value={row.quantity || ""}
              onChange={onChange}
            />
            <TextField
              margin='normal'
              name='position'
              label='Position'
              value={row.position || ""}
              onChange={onChange}
            />
          </FormGroup>
        </MuiGrid>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
              margin='normal'
              name='lastName'
              label='Last Name'
              value={row.lastName || ""}
              onChange={onChange}
            />
            <TextField
              margin='normal'
              name='phone'
              label='Phone'
              value={row.phone || ""}
              onChange={onChange}
            />
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
