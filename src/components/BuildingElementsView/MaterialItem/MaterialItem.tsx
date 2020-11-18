import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles, withStyles, emphasize } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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
        }
    }),
);

const MaterialItem = (props: any) => {
    const [materialItem] = useState<MaterialItem>(props.materialItem);

    const {
        name, source, materialCat
    } = materialItem.material;

    const classes = useStyles();

    return (
        <div>
            <Paper variant="outlined" className={classes.materialPaper}>
                <Grid container alignItems="center" >
                    <Grid item xs={10}>
                        <Typography variant="body1">
                            {name}
                        </Typography>
                        <Grid container>
                            <Grid container item xs={6}>
                                {materialItem.inventoryEntries.map((inventory, index) =>
                                    <div>
                                        <Typography variant="body1">
                                            <b>Inventory ID: {inventory.idmaterialInventory}</b>
                                        </Typography>
                                        <Typography variant="body1">
                                            Quantity: {inventory.quantity}
                                        </Typography>
                                    </div>
                                )
                                }
                            </Grid>
                            <Grid container item xs={6}>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default MaterialItem;