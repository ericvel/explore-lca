import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        materialPaper: {
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            // height: theme.spacing(8)            
            // background: theme.palette.warning.light
        },
        divider: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
    }),
);

const MaterialItem = (props: any) => {
    // const [materialItem] = useState<MaterialItem>(props.materialItem);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

   /*  const {
        name, source, materialCat
    } = materialItem.material;
 */
    const classes = useStyles();

    return (
        <div>
            <Paper variant="outlined" className={classes.materialPaper}>
                <Grid container spacing={2} alignItems="center" justify="space-between">
                    <Grid item xs={10}>
                        <Typography variant="body1">
                            {/* name */}
                        </Typography>
                        <Grid container>
                            <Grid container item xs={6}>

                            </Grid>
                            <Grid container item xs={6}>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Tooltip title="See inventory entries">
                            <IconButton color="default" aria-label="expand material" onClick={handleExpandClick}>
                                <ExpandMoreIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Collapse in={expanded} timeout="auto">
                    <Grid container>
                        {/* {materialItem.inventoryEntries.map((inventory, index) =>
                            <div key={index}>
                                <Divider variant="fullWidth" light={true} className={classes.divider} />

                                <Grid item>
                                    <Typography variant="body1">
                                        <b>Inventory ID: {inventory.idmaterialInventory}</b>
                                    </Typography>
                                    <Typography variant="body1">
                                        Quantity: {inventory.quantity}
                                    </Typography>
                                </Grid>
                                <Grid container>
                                    <Grid container item xs={8}>
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
                                                {inventory.A1A3 || "0.0"}
                                            </Typography>
                                            <Typography variant="body2">
                                                {inventory.A4 || "0.0"}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={4}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="textSecondary">
                                                B4 (t):
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                B4 (m):
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2">
                                                {inventory.B4_t || "0.0"}
                                            </Typography>
                                            <Typography variant="body2">
                                                {inventory.B4_m || "0.0"}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>

                        )} */}
                    </Grid>
                </Collapse>
            </Paper>
        </div>
    );
};

export default MaterialItem;