import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'redux/reducers';
import allActions from 'redux/actions';

import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import GWPCompareChart from './GWPCompareChart';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buildingSection: {
            marginBottom: theme.spacing(2)
        },
        divider: {
            marginBottom: theme.spacing(2)
        },
        elementSection: {
            marginTop: theme.spacing(2)
        },
        content: {
            padding: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(3),
        },
    }),
);

const MultipleBuildingsView = () => {
    const dispatch = useDispatch();

    const selectedBuildings = useSelector((state: IRootState) => state.selectedBuildings);
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" color="textSecondary" gutterBottom>Embodied emissions</Typography>
                    <GWPCompareChart />
                </Grid>
            </Grid>
        </div>
    );
};

export default MultipleBuildingsView;