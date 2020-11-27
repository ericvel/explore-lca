import React, { useState, useEffect, useCallback } from "react";
import { Theme, createStyles, makeStyles, withStyles, WithStyles, emphasize } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import GWPCompareChart from '../GWPCompareChart';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
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
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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

const CompareBuildingDialog = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [buildings, setBuildings] = useState<Building[]>([]);

    useEffect(() => {
        if (props.buildingIds !== undefined && props.buildingIds.length > 0) {
            loadData();
        }
    }, [props.isOpen]);

    /* useEffect(() => {

    }, [buildings]) */

    const loadData = () => {
        const buildingIdString = props.buildingIds.join();
        const buildingQuery = `/buildings/select/${buildingIdString}`;
        if (!loading) {
            setLoading(true);
            fetch(buildingQuery)
                .then(response => response.json())
                .then(data => {
                    setBuildings(data);
                    setLoading(false);
                }).catch(() => setLoading(false));
        }
    };

    const handleClose = () => {
        props.close();
    };

    // var gwpChartData: ICompareChartDataItem[] = [];

    var gwpChartData: any[] = [
        {
            lcaPhase: 'A1-A3',
        },
        {
            lcaPhase: 'A4',
        },
        {
            lcaPhase: 'B4 (m)',
        },
        {
            lcaPhase: 'B4 (t)',
        },
    ];

    var buildingNames: any[] = [];

    buildings.forEach(building => {
        gwpChartData[0][building.idbuildings] = Number(building.A1A3) || 0.0;
        gwpChartData[1][building.idbuildings] = Number(building.A4) || 0.0;
        gwpChartData[2][building.idbuildings] = Number(building.B4_m) || 0.0;
        gwpChartData[3][building.idbuildings] = Number(building.B4_t) || 0.0;

        buildingNames.push({
            [building.idbuildings]: building.building_name
        })
    });

    return (
        <Dialog fullWidth maxWidth={false} open={props.isOpen} onClose={handleClose} >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Compare buildings
            </DialogTitle>
            <DialogContent dividers>
                <Grid container>
                    <Grid item xs={6}>
                        { loading ?
                            <p>Loading...</p>
                            :
                            <GWPCompareChart chartData={gwpChartData} buildingNames={buildingNames} height={500} />
                        }
                    </Grid>
                    <Grid item xs={6}>
                        
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Ok, cool
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CompareBuildingDialog;