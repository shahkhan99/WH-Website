import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
    input: {
        width:100,
        fontSize: 8,
        '&:placeholder':{
            fontFamily:"'Roboto Mono', monospace",
            fontSize: 8,
            color:"black"
        }
    }
}));


const Input = ({id,value,type,disabled,label,placeholder,helperText,fullWidth,multiline,handleChange,ref}) => {

    const classes = useStyles();
    return ( 
            <TextField
                id={id}
                placeholder={placeholder}
                className={classes.input}
                onChange={handleChange}
                value={value}
            />
     );
}
 
export default Input;