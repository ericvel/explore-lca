import React, { useEffect, useState, ReactText } from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "redux/actions";
import { IRootState } from "redux/reducers";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";

interface Props {
  iconSize?: "small" | "inherit" | "large" | "default" | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      minWidth: 220,
    },
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      <Tooltip title='Metric settings'>
        <IconButton aria-label='help' onClick={handleClick}>
          <SettingsIcon fontSize={props.iconSize} />
        </IconButton>
      </Tooltip>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 170,
          },
        }}
      >
        <ListSubheader>Metric settings</ListSubheader>
        <ListItem>
          <ListItemText id='switch-list-label-sqm' primary={"Per m\xB2"} />
          <ListItemSecondaryAction>
            <Switch
              edge='end'
              checked={perSqM}
              onChange={handleEEMetricChange}
              name='perSqM'
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText id='switch-list-label-year' primary='Per year' />
          <ListItemSecondaryAction>
            <Switch
              edge='end'
              checked={perYear}
              onChange={handleEEMetricChange}
              name='perYear'
            />
          </ListItemSecondaryAction>
        </ListItem>
      </Menu>
    </div>
  );
}

export default SettingsButton;
