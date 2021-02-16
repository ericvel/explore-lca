import React, { useEffect, useState, ReactText } from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "redux/actions";
import { IRootState } from "redux/reducers";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

interface Props {
  iconSize?: "small" | "inherit" | "large" | "default" | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      width: 350,
      padding: theme.spacing(2),
    },
    formControl: {
      marginTop: theme.spacing(3),
    },
  })
);

function SettingsButton(props: Props) {
  const dispatch = useDispatch();
  const checkedEEMetrics = useSelector((state: IRootState) => state.EEMetric);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEEMetricChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      allActions.settingsActions.setEEMetric({
        name: event.target.name,
        checked: event.target.checked,
      })
    );
  };

  const { perSqM, perYear } = checkedEEMetrics;

  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Settings">
        <IconButton aria-label='help' onClick={handleClickOpen}>
          <SettingsIcon fontSize={props.iconSize} />
        </IconButton>
      </Tooltip>
      <Drawer anchor='right' open={open} onClose={handleClose}>
        <Grid container spacing={3} className={classes.content}>
          <Grid item xs={12}>
            <Typography variant='h4' color='textPrimary' gutterBottom>
              Settings
            </Typography>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormLabel component='legend'>
                Embodied Emissions Metric
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={perSqM}
                      onChange={handleEEMetricChange}
                      name='perSqM'
                    />
                  }
                  label={"Per m\xB2"}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={perYear}
                      onChange={handleEEMetricChange}
                      name='perYear'
                    />
                  }
                  label='Per year'
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}

export default SettingsButton;
