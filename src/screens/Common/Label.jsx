import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    label:{
      // textTransform:'uppercase',
      margin:theme.spacing(3,0,0,2),
      fontSize:16,
      fontWeight:550,
    },
    }));
const Label = ({color,title,component}) => {
    const classes = useStyles();
    return ( 
        <Typography component={component||"div"} variant="h6" className={classes.label} color={color} style={{color:`${color ? color : 'black'}`}}>{title}</Typography>
     );
}
 
export default Label;