import React, { useEffect, useState, ReactText } from "react";
import HelpStrings from "./HelpStrings";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import IconButton from "@material-ui/core/IconButton";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const terminologyDictionary = [
  { term: "A1-A3", definition: "Material production" },
  {
    term: "A4",
    definition: "Transportation of materials to the building site",
  },
  {
    term: "B4 (m)",
    definition: "Material replacements throughout the study lifetime period",
  },
  { term: "B4 (t)", definition: "Transportation of material replacements" },
];

function HelpButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title='Help'>
        <IconButton aria-label='help' onClick={handleClickOpen}>
          <HelpOutlineIcon fontSize='large' />
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Help
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant='h6'>How to use</Typography>
          <Typography>
            <ul>
              <li>
                Click on a row to see more details about the building, including
                its <b>materials</b> and <b>building elements</b>.
              </li>
              <li>
                Turn on <b>simulation mode</b> (<i>top-right in building details</i>) to edit a building's materials
                and see how the changes affect the rest of the building.
              </li>
              <li>
                Select multiple rows to <b>compare</b> the emission values of
                different buildings.
              </li>
            </ul>
          </Typography>
          <Typography variant='h6'>Terminology</Typography>
          <List>
            {terminologyDictionary.map((entry, index) => (
              <ListItem divider={index < terminologyDictionary.length - 1}>
                <Grid container spacing={1} alignItems='center'>
                  <Grid item xs={2}>
                    <Typography variant='body1'>
                      <b>{entry.term}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant='body1'>{entry.definition}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

/* 
interface Props {
  iconSize?: "small" | "inherit" | "large" | "default" | undefined;
  alertContentId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "55vw",
      marginTop: theme.spacing(2),
    },
    mainContent: {
      width: "90%",
    },
    titleBar: {
      marginBottom: theme.spacing(2),
    },
  })
);

function HelpButton(props: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div>
      <Tooltip title='Help'>
        <IconButton aria-label='help' onClick={handleClickOpen}>
          <HelpOutlineIcon fontSize={props.iconSize} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>How to use</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {HelpStrings.helpDict[props.alertContentId]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} */

export default HelpButton;
