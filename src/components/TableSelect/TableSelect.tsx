import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

function TableSelect(props: any) {
    const classes = useStyles();
    const [tableName, setTableName] = useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        props.onChange(event.target.value);
    };
    
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Table</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.tableName}
                    onChange={handleChange}
                >
                    <MenuItem value={'buildings'}>Buildings</MenuItem>
                    <MenuItem value={'materials'}>Materials</MenuItem>
                </Select>
            </FormControl>
        </div>
    );

}

export default TableSelect;
