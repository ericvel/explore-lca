import React, { useState, useEffect, useCallback } from "react";
import { Theme, createStyles, makeStyles, withStyles, WithStyles, emphasize } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(3),
        },
    }),
);

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
    const [checkedLCAPhases, setcheckedLCAPhases] = useState({
        a1a3: true,
        a4: true,
        b4_m: true,
        b4_t: true,
    });

    const handleCheckedLCAPhaseChange = (event: any) => {
        setcheckedLCAPhases({ ...checkedLCAPhases, [event.target.name]: event.target.checked });
    };

    useEffect(() => {
        if (props.buildingIds !== undefined && props.buildingIds.length > 0) {
            loadData();
        }
    }, [props.isOpen]);

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

    const { a1a3, a4, b4_m, b4_t } = checkedLCAPhases;

    var gwpChartData: any[] = [];

    if (a1a3) gwpChartData.push({
        lcaPhase: 'A1-A3'
    });
    if (a4) gwpChartData.push({
        lcaPhase: 'A4'
    });
    if (b4_m) gwpChartData.push({
        lcaPhase: 'B4 (m)'
    });
    if (b4_t) gwpChartData.push({
        lcaPhase: 'B4 (t)'
    });

    var buildingNames: any[] = [];

    buildings.forEach(building => {
        if (a1a3) gwpChartData[gwpChartData.findIndex(arrayEntry => arrayEntry.lcaPhase === 'A1-A3')][building.idbuildings] = Number(building.A1A3) || 0.0;
        if (a4) gwpChartData[gwpChartData.findIndex(arrayEntry => arrayEntry.lcaPhase === 'A4')][building.idbuildings] = Number(building.A4) || 0.0;
        if (b4_m) gwpChartData[gwpChartData.findIndex(arrayEntry => arrayEntry.lcaPhase === 'B4 (m)')][building.idbuildings] = Number(building.B4_m) || 0.0;
        if (b4_t) gwpChartData[gwpChartData.findIndex(arrayEntry => arrayEntry.lcaPhase === 'B4 (t)')][building.idbuildings] = Number(building.B4_t) || 0.0;

        buildingNames.push({
            [building.idbuildings]: building.building_name
        })
    });


    const classes = useStyles();

    return (
        <Dialog fullWidth maxWidth={false} open={props.isOpen} onClose={handleClose} >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Compare buildings
            </DialogTitle>
            <DialogContent dividers>
                <Grid container>
                    <Grid item xs={6}>
                        {loading ?
                            <p>Loading...</p>
                            :
                            <GWPCompareChart chartData={gwpChartData} buildingNames={buildingNames} height={500} />
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">LCA Phases</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={a1a3} onChange={handleCheckedLCAPhaseChange} name="a1a3" />}
                                    label="A1-A3"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={a4} onChange={handleCheckedLCAPhaseChange} name="a4" />}
                                    label="A4"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={b4_m} onChange={handleCheckedLCAPhaseChange} name="b4_m" />}
                                    label="B4 (m)"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={b4_t} onChange={handleCheckedLCAPhaseChange} name="b4_t" />}
                                    label="B4 (t)"
                                />
                            </FormGroup>
                            {/* <FormHelperText>Helper text</FormHelperText> */}
                        </FormControl>
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