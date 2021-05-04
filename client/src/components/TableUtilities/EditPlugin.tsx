import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

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
import theme from "styles/theme";

import { reduceEmissionNumber } from "./SimulationHelpers";
import { LCAPhaseTooltip } from "interfaces/enums";

const useStyles = makeStyles((/* theme: Theme */) =>
  createStyles({
    labelAsterisk: {
      color: theme.palette.simulated.main,
      fontWeight: "bolder",
      fontSize: "large",
    },
    subtitleAsterisk: {
      color: theme.palette.simulated.main,
      fontWeight: "bolder",
    },
    dialogContent: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      overflow: "auto"
    }
  }));

const sourceTypes = [
  "TestSource",
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
  const [sourceType, setSourceType] = useState<string>(row.sourceType);
  const [A1A3, setA1A3] = useState<number>(row.A1A3);

  const materialProducts = useSelector(
    (state: IRootState) => state.materialProducts
  );
  const simulatedMaterialProducts = useSelector(
    (state: IRootState) => state.simulatedMaterialProducts
  );

  useEffect(() => {
    const nonSimulatedRow = (materialProducts as IMaterialTableRow[]).find(
      (product) => product.idmaterialInventory === row.idmaterialInventory
    );
    if (nonSimulatedRow !== undefined) {
      setOriginalRow(nonSimulatedRow);
      setSourceType(row.sourceType);
      setA1A3(row.A1A3);
    }
  }, [row.idmaterialInventory]);

  const handleSourceTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSourceType(event.target.value);
    if (event.target.value === "TestSource") {
      const simulatedValue = reduceEmissionNumber(originalRow.A1A3);
      setA1A3(simulatedValue);
      const textFieldEvent = {
        target: { name: "A1A3", value: simulatedValue },
      };
      onChange(textFieldEvent);
    } else if (event.target.value === originalRow.sourceType) {
      setA1A3(originalRow.A1A3);
      const textFieldEvent = {
        target: { name: "A1A3", value: originalRow.A1A3 },
      };
      onChange(textFieldEvent);
    }
    onChange(event);
  };

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onCancelChanges} fullWidth maxWidth='xs'>
      <DialogTitle disableTypography>
        <Typography variant='h6' component='h2'>
          Edit material details
        </Typography>
        <Typography noWrap variant='subtitle2' component='h3'>
          {row.name}
        </Typography>
      </DialogTitle>
      {/* Replace DialogContent with div to avoid rendering unecessary scrollbar */}
      <div className={classes.dialogContent}>
        {sourceType !== originalRow.sourceType && (
          <Typography variant='body2' component='p' color='textSecondary'>
            Edited/affected fields are marked with{" "}
            <Typography
              variant='body1'
              component='span'
              display='inline'
              className={classes.subtitleAsterisk}
            >
              *
            </Typography>
          </Typography>
        )}
        <Grid container /* alignItems='center' */ spacing={3}>
          <Grid item xs={6}>
            <FormGroup>
              <TextField
                select
                required={sourceType !== originalRow.sourceType}
                margin='normal'
                name='sourceType'
                label='Data source'
                variant='outlined'
                value={sourceType || " "}
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
                      !(
                        option === originalRow.sourceType ||
                        option === "TestSource"
                      )
                    }
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField
                margin='normal'
                name='materialCat'
                label='Category'
                value={row.materialCat || " "}
                onChange={onChange}
                disabled
              />
              <TextField
                margin='normal'
                name='quantity'
                label='Quantity'
                value={row.quantity || "0"}
                onChange={onChange}
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {row.FU || ""}
                    </InputAdornment>
                  ),
                }}
              /> */}
              {/* <TextField
                margin='normal'
                name='RSL_mi'
                label='RSL'
                value={row.RSL_mi || "0"}
                onChange={onChange}
                disabled
              /> */}
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <Tooltip
                enterDelay={500}
                placement='bottom'
                title={LCAPhaseTooltip.A1A3}
              >
                <TextField
                  required={A1A3 !== originalRow.A1A3}
                  margin='normal'
                  name='A1A3'
                  label='A1-A3'
                  value={A1A3 || "0"}
                  onChange={onChange}
                  disabled
                  InputLabelProps={{
                    classes: {
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                />
              </Tooltip>
              <Tooltip
                enterDelay={500}
                placement='bottom'
                title={LCAPhaseTooltip.A4}
              >
                <TextField
                  margin='normal'
                  name='A4'
                  label='A4'
                  value={row.A4 || "0"}
                  onChange={onChange}
                  disabled
                />
              </Tooltip>
              <Tooltip
                enterDelay={500}
                placement='bottom'
                title={LCAPhaseTooltip.B4m}
              >
                <TextField
                  margin='normal'
                  name='B4_m'
                  label='B4 (m)'
                  value={row.B4_m || "0"}
                  onChange={onChange}
                  disabled
                />
              </Tooltip>
              <Tooltip
                enterDelay={500}
                placement='bottom'
                title={LCAPhaseTooltip.B4t}
              >
                <TextField
                  margin='normal'
                  name='B4_t'
                  label='B4 (t)'
                  value={row.B4_t || "0"}
                  onChange={onChange}
                  disabled
                />
              </Tooltip>
            </FormGroup>
          </Grid>
        </Grid>
      </div>
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
