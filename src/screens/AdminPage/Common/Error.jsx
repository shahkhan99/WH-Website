import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    label:{
		textTransform:'uppercase',
		margin:theme.spacing(1,2),
		fontSize:12,
		fontWeight:550,
    }
}));
const Error = ({text,color}) => {
    const classes = useStyles();
    return ( 
        <Typography variant="h6" color={color||"error"} className={classes.label}>{text}</Typography>
	);
}
 
export default Error;