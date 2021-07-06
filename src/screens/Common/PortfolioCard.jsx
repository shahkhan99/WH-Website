import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    img:{
        cursor: 'pointer',
        height:350,
        width:350,
        [theme.breakpoints.down("sm")]: {
            height:320,
            width:320,
        },
        backgroundSize:"cover",
        '&:hover':{
            transition:'filter 500ms,transform 800ms',
            filter:'brightness(50%)',
            // transform:'scale(1.1)'

        }
    },
    text:{
        fontWeight:300,
        cursor:"pointer"
    },
    box:{
        height:360,
        width:350,
        [theme.breakpoints.down("sm")]: {
            height:350,
            width:320,
        },
        overflow:"hidden"
    },
    width:{
        height:"auto",
        width:350,
        [theme.breakpoints.down("sm")]: {
            height:350,
            width:320,
        },
    }
  }));


const PCard = ({image,text}) => {
    const classes=useStyles()
    return ( 
        <div className={classes.width}>
            <div className={classes.box}>
                <img className={classes.img} src={require(`../../Assets/${image}`)}/>
            </div>
            <Typography className={classes.text} variant="subtitle1">{text}</Typography>
        </div>
     );
}
 
export default PCard;