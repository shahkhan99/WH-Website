import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    label:{
      textTransform:'uppercase',
      fontSize:15,
      fontWeight:550,
    },
    }));
const Label = ({color,title}) => {
    const classes = useStyles();
    return ( 
        <Typography variant="h6" className={classes.label} style={{color:`${color ? color : 'black'}`}}>{title}</Typography>
     );
}
 
export default Label;