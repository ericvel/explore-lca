import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../../redux/reducers';
import allActions from '../../../redux/actions';

import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import ElementsAndMaterialsContainer from '../../ElementsAndMaterialsContainer';
import GWPCompareChart from '../../GWPCompareChart';

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

    const selectedBuildings = useSelector((state: IRootState) => state.buildings);
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <Grid container>
                <Grid item xs={12}>
                    <GWPCompareChart height={400} />
                </Grid>
            </Grid>
        </div>
    );
};

export default MultipleBuildingsView;