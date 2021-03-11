import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { reduceEmissionNumber } from "./SimulationHelpers";
import { blue } from "@material-ui/core/colors";
import classes from "*.module.sass";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    simulatedField: {
      backgroundColor: blue[600],
    },
    labelAsterisk: {
      color: "blue",//theme.palette.simulated.main,
      fontWeight: "bolder",
      fontSize: "large",
    },
    subtitleAsterisk: {
      color: "blue",
      fontWeight: "bolder",
    },
  })
);

const sourceTypes = [
  "Test source",
  "EPD",
  "Ecoinvent",
  "Other",
  "Custom",
  "na",
  "Klimatre",
  "PEP",
];

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
  const [originalRow, setOriginalRow] = useState<IMaterialTableRow>(row);
  const [sourceType, setSourceType] = useState<string>("");
  const [simulatedA1A3, setSimulatedA1A3] = useState<number>(0);

  useEffect(() => {
    setOriginalRow(row);
    setSourceType(row.sourceType);
    setSimulatedA1A3(row.A1A3);
    console.log("Original row: ", originalRow);
  }, [row.idmaterialInventory]);

  const handleSourceTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSourceType(event.target.value);
    if (event.target.value === "Test source") {
      const simulatedValue = reduceEmissionNumber(originalRow.A1A3);
      setSimulatedA1A3(simulatedValue);
      const textFieldEvent = {
        target: { name: "A1A3", value: simulatedValue },
      };
      onChange(textFieldEvent);
    } else {
      setSimulatedA1A3(originalRow.A1A3);
    }
    onChange(event);
  };

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onCancelChanges}>
      <DialogTitle disableTypography>
        <Typography variant='h6' component='h2'>
          Simulate material details
        </Typography>
        <Typography variant='subtitle2' color='textSecondary'>
          Simulated fields are marked with{" "}
          <Typography variant='subtitle2' display='inline' className={classes.subtitleAsterisk}>
            *
          </Typography>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormGroup>
              <TextField
                select
                required={row.sourceType !== originalRow?.sourceType}
                margin='normal'
                name='sourceType'
                label='Source type'
                value={sourceType || ""}
                onChange={handleSourceTypeChange}
                InputLabelProps={{
                  classes: {
                    asterisk: classes.labelAsterisk,
                  },
                }}
              >
                {sourceTypes.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    disabled={
                      option !== originalRow?.sourceType &&
                      option !== "Test source"
                    }
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin='normal'
                name='materialCat'
                label='Category'
                value={row.materialCat || ""}
                onChange={onChange}
                disabled
              />
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <TextField
                required={simulatedA1A3 !== originalRow?.A1A3}
                margin='normal'
                name='A1A3'
                label='A1-A3'
                value={simulatedA1A3 || ""}
                onChange={onChange}
                disabled
                InputLabelProps={{
                  classes: {
                    asterisk: classes.labelAsterisk,
                  },
                }}
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
          </Grid>
        </Grid>
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
          { rows, getRowId, editingRowIds, createRowChange, rowChanges },
          { changeRow, commitChangedRows, stopEditRows, cancelChangedRows }
        ) => {
          let editedRow: any;
          let rowId: number;
          [rowId] = editingRowIds;
          const targetRow = rows.filter(
            (row: any) => getRowId(row) === rowId
          )[0];
          editedRow = { ...targetRow, ...rowChanges[rowId] };

          const processValueChange = ({ target: { name, value } }: any) => {
            const changeArgs = {
              rowId,
              change: createRowChange(editedRow, value, name),
            };
            changeRow(changeArgs);
          };
          const rowIds = editingRowIds;
          const applyChanges = () => {
            stopEditRows({ rowIds });
            commitChangedRows({ rowIds });
          };
          const cancelChanges = () => {
            stopEditRows({ rowIds });
            cancelChangedRows({ rowIds });
          };

          const open = editingRowIds.length > 0;
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
