import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: '50px 40px'
    },
    heading: {
        fontSize: 18,
        fontWeight: 500
    }
}));

const Prices = ({prices}) => {

    const classes = useStyles();
    return (
        <div className={classes.wrapper}>

            <Typography className={classes.heading}>Shipment in Karachi</Typography>
            <div style={{height:10}} />
            <Typography>{`Small: Rs. ${prices.karachi.small}`}</Typography>
            <div style={{height:7}} />
            <Typography>{`Medium: Rs. ${prices.karachi.medium}`}</Typography>
            <div style={{height:7}} />
            <Typography>{`Large: Rs. ${prices.karachi.large}`}</Typography>
            <div style={{height:7}} />

            <Divider style={{margin:'20px 0px', width:400}} />

            <Typography className={classes.heading}>Shipment in Other Cities</Typography>
            <div style={{height:10}} />
            <Typography>{`Small: Rs. ${prices.others.small}`}</Typography>
            <div style={{height:7}} />
            <Typography>{`Medium: Rs. ${prices.others.medium}`}</Typography>
            <div style={{height:7}} />
            <Typography>{`Large: Rs. ${prices.others.large}`}</Typography>
            <div style={{height:7}} />
            
        </div>
    )
}

export default Prices;
