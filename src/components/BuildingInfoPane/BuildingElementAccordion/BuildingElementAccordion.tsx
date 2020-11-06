import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
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

const BuildingElementAccordion = (props: any) => {
    const classes = useStyles();

    const handleClick = (elementId: number) => {
        props.changeSelectedElement(elementId);
    };

    const element: BuildingElement = props.element;

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={element.idlevels.toString()}
                >
                    <Typography className={classes.heading}>{element.idlevels} - {element.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <b>A1-A3:</b> {element.A1A3} <br />
                        <b>A4:</b> {element.A4} <br />
                        <b>B4_m:</b> {element.B4_m} <br />
                        <b>B4_t:</b> {element.B4_t} <br />
                        {element.hierarchy != 3 &&
                            <Button variant="outlined" disabled={element.hierarchy == 3} onClick={() => handleClick(element.idlevels)}>
                                See children -{'>'}
                            </Button>
                        }
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default BuildingElementAccordion;