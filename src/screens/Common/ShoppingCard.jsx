import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    img:{
        cursor: 'pointer',
        // height:360,
        //width:350
        maxHeight:'100%',
        maxWidth:'100%',
        // [theme.breakpoints.down("sm")]: {
        //     height:350,
        //     width:320,
        // },
        backgroundSize:"cover",
        '&:hover':{
            transition:'filter 500ms,transform 800ms',
            filter:'brightness(50%)',
            // transform:'scale(1.1)'

        }
    },
    text:{
        fontWeight:300,
        cursor:"pointer",

        // overflow:'hidden'
    },
    text1:{
        fontWeight:300,
        cursor:"pointer",
        fontSize:14,
        marginRight:theme.spacing(1)

        // overflow:'hidden'
    },
    box:{
        height:'90%',
        width:'100%',
        // height:360,
        // width:350,
        // [theme.breakpoints.down("sm")]: {
        //     height:350,
        //     width:320,
        // },
        // overflow:"hidden"
    },
    width:{
        height:"auto",
        // width:350,
        width:'92%',
        [theme.breakpoints.down("sm")]: {
            height:350,
            width:320,
        },
    },
  }));


const ShopCard = ({data}) => {

    const classes = useStyles()
    return (
        <div onClick={e => window.open(`/product/${data.id}`, '_self')} className={classes.width}>
            <div className={classes.box}>
                <img className={classes.img} src={data.images[0]} />
            </div>
            <Grid container>
                <Grid container xs={8}>
                    <Typography className={classes.text} variant="subtitle1">{data.name}</Typography>
                </Grid>
                <Grid container xs={4} justify="flex-end">
                     <Typography className={classes.text1} variant="subtitle1">Rs {data.price}</Typography>
                </Grid>
            </Grid>    
         </div>
     );
}
 
export default ShopCard;