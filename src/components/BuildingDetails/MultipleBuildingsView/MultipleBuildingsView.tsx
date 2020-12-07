import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../../redux/reducers';
import allActions from '../../../redux/actions';

import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';

import ElementsAndMaterialsContainer from '../../ElementsAndMaterialsContainer';
import GWPSingleChart from '../../GWPSingleChart';

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
        buildingInfoLabels: {
            fontWeight: "bold"
        },
        content: {
            // margin: theme.spacing(1),
            padding: theme.spacing(2),
            // height: '600px'
        },
    }),
);

const initialBuildingState: IBuilding = {
    idbuildings: 0,
    building_identifier: 0,
    building_name: "",
    project: "",
    country: "",
    city: "",
    typology: "",
    construction_type: "",
    floor_area: 0,
    A1A3: null,
    A4: null,
    B4_m: null,
    B4_t: null,
};

const MultipleBuildingsView = (props: any) => {
    const dispatch = useDispatch();

    const selectedBuildings = useSelector((state: IRootState) => state.buildings);
    const [building, setBuilding] = useState<IBuilding>(initialBuildingState);

    useEffect(() => {
        if (selectedBuildings.length > 0) {
            setBuilding(selectedBuildings[0]);
        }
    }, [selectedBuildings]);

    const {
        building_identifier, building_name, project, typology, construction_type, floor_area, A1A3, A4, B4_m, B4_t
    } = building;

    const gwpChartData: ISingleChartDataItem[] = [
        { lcaPhase: 'A1-A3', gwp: Number(A1A3) || 0.0 },
        { lcaPhase: 'A4', gwp: Number(A4) || 0.0 },
        { lcaPhase: 'B4 (m)', gwp: Number(B4_m) || 0.0 },
        { lcaPhase: 'B4 (t)', gwp: Number(B4_t) || 0.0 },
    ];

    const classes = useStyles();

    return (
        <div className={classes.content}>
            MULTIPLE BUILDIIIIINGS
        </div>
    );
};

export default MultipleBuildingsView;