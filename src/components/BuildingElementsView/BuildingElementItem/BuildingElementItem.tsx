import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buildingElementPaper: {
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            // height: theme.spacing(8)
        },
        subElementButton: {
            marginLeft: 'auto',
        }
    }),
);

const BuildingElementItem = (props: any) => {    
    const [buildingElement] = useState<BuildingElement>(props.element);
    const [hasChildren] = useState<boolean>(props.hasChildren);

    const {
        name, A1A3, A4, B4_m, B4_t, idlevels
    } = buildingElement;

    const classes = useStyles();

    return (
        <div>
            <Paper variant="outlined" className={classes.buildingElementPaper}>
                <Grid container alignItems="center" >
                    <Grid item xs={10}>
                        <Typography variant="body1">
                            {name}
                        </Typography>
                        <Grid container>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="textSecondary">
                                        A1-A3:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        A4:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">
                                        {A1A3 || "0.0"}
                                    </Typography>
                                    <Typography variant="body2">
                                        {A4 || "0.0"}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="textSecondary">
                                        B4_t:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        B4_m:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">
                                        {B4_t || "0.0"}
                                    </Typography>
                                    <Typography variant="body2">
                                        {B4_m || "0.0"}
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {/* Check if element has children to decide if should display button */}
                        {hasChildren &&
                            <Tooltip title="See sub-elements">
                                <IconButton /* edge="end" */ color="default" aria-label="child elements" onClick={() => props.onClickChildElementButton(idlevels)}>
                                    <NavigateNextIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default BuildingElementItem;