import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography,Hidden,Icon } from "@material-ui/core";
import Header from '../../Components/Header/Header'


const useStyles = makeStyles(theme => ({
    div:{
        height:'85vh'
    },
    cent:{
        textAlign:"center"
    },
    pad:{
        padding:theme.spacing(3,0,3,0)
    }
}));

const Thankyou = (props) => {
    const classes=useStyles()

    return ( 
        <div >
            <Header/>
            <Grid className={classes.div} container alignItems="center" justify="center">    
                <Typography variant="h6" className={classes.cent}>
                    <Typography variant="h4" className={classes.cent} component="div">Thank you</Typography>
                    <Typography variant='body1' className={classes.pad} component="div">Someone from our team will contact you shortly</Typography>
                    {props.match.params.id ? `Your Order ID is ${props.match.params.id}` : ''}
                </Typography>
            </Grid>
        </div>
     );
}
 
export default Thankyou;