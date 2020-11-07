import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }),
);

const BuildingElementsView = (props: any) => {
    const classes = useStyles();

    
    return (
        <div>
            <Grid container spacing={3} className="">
                <Grid item xs>
                    <Typography variant="h5" color="textSecondary" gutterBottom>Building elements</Typography>
                    
                </Grid>
            </Grid>
        </div>
    );
};

export default BuildingElementsView;