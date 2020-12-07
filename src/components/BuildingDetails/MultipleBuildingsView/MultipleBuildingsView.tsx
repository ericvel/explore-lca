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
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

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
    const [checkedLCAPhases, setcheckedLCAPhases] = useState({
        a1a3: true,
        a4: true,
        b4_m: true,
        b4_t: true,
    });

    const handleCheckedLCAPhaseChange = (event: any) => {
        setcheckedLCAPhases({ ...checkedLCAPhases, [event.target.name]: event.target.checked });
    };

    const { a1a3, a4, b4_m, b4_t } = checkedLCAPhases;

    const classes = useStyles();

    return (
        <div className={classes.content}>
            <Grid container>
                <Grid item xs={12}>
                    <GWPCompareChart checkedLCAPhases={checkedLCAPhases} height={500} />
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
        </div>
    );
};

export default MultipleBuildingsView;