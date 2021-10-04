import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
    input: {
        margin: '5px 0px',
        minWidth: 400,
    }
}));


const Input = ({id,value,type,disabled,label,placeholder,helperText,fullWidth,multiline,handleChange,ref,defaultValue}) => {

    const classes = useStyles();
    return ( 
            <TextField
                defaultValue={defaultValue}
                disabled={disabled}
                ref={ref}
                id={id}
                label={label}
                placeholder={placeholder}
                className={classes.input}
                margin="normal"
                helperText={helperText}
                fullWidth={false || fullWidth}
                variant="outlined"
                multiline={false||multiline}
                rows="8"
                onChange={handleChange}
                type={type}
                value={value}
            />
     );
}
 
export default Input;