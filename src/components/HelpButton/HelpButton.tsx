import React, { useEffect, useState, ReactText } from 'react';
import HelpStrings from './HelpStrings';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

interface Props {
    iconSize?: "small" | "inherit" | "large" | "default" | undefined;
    alertContentId: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '55vw',
            marginTop: theme.spacing(2)
        },
        mainContent: {
            width: '90%'
        },
        titleBar: {
            marginBottom: theme.spacing(2)
        }
    }),
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
            <IconButton aria-label="help" onClick={handleClickOpen} >
                <HelpOutlineIcon fontSize={props.iconSize} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"How to use"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {HelpStrings.helpDict[props.alertContentId]}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default HelpButton;