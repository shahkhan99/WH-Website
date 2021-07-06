import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    img:{
        height:150,
        width:150,
        backgroundSize:"cover",
        [theme.breakpoints.down("sm")]: {
            height:120,
            width:120,
        },
        backgroundSize:"cover",
    },
    paddB:{
        height: 'max-content',
        width: '100%',
        marginBottom:theme.spacing(3),
        border:"2px solid black"
    },
    font:{
        fontSize: 15,
        [theme.breakpoints.down("sm")]: {
            fontSize:13
        },
    },
    delete:{
        cursor:"pointer",
        marginTop:theme.spacing(1),
        marginRight:theme.spacing(1)
    },
    round:{
        cursor:"pointer",
        padding: '1px 6px',
        height: 'min-content',
        border:'1px solid black',
        borderRadius:50,
        lineHeight: 1.2
    },
}));



const CheckoutCard = ({data, quantity, index, onQantityChange, onRemove}) => {
    
    
    const classes = useStyles();
    return (
        <div className={classes.paddB}>
            <Grid container alignItems="flex-start">

                <Grid  container sm={4} xs={5}>
                    <img className={classes.img} src={data.images[0]}/>
                </Grid>

                <Grid style={{padding:'10px 0px'}} container sm={7} xs={6}>

                    <Grid container>
                        <Typography className={classes.font}>Name: {data.name}</Typography>
                    </Grid>

                    <Grid container>
                        <Typography className={classes.font}>Price: Rs.{parseInt(data.price) + parseInt(data.sizes.find(x => x.name===data.selectedSize).price)}</Typography>
                    </Grid>

                    <Grid container>
                        <Typography className={classes.font}>Size: {data.selectedSize}</Typography>
                    </Grid>

                    {data.selectedVariants.length>0 && data.selectedVariants.map((item, index) => (
                        item!=='none' && 
                            <Grid  container>
                                <Typography className={classes.font}>{`${data.productVariant[index].name}: ${data.productVariant[index].Options[item].content}`}</Typography>
                            </Grid>
                    ))}

                    <Grid container direction="row" alignItems='center'> 
                        <Typography className={classes.font} style={{marginRight:15}}>Quantity:</Typography>
                        <div id={index} title='minus' onClick={onQantityChange}>
                            <Typography style={{marginRight:20}} className={classes.round} component="span" variant="subtitle1">-</Typography>
                        </div>
                        <Typography component="span" variant="subtitle1">{quantity}</Typography>
                        <div id={index} title='plus' onClick={onQantityChange}>
                            <Typography style={{marginLeft:20}} className={classes.round} component="span" variant="subtitle1">+</Typography>
                        </div>
                    </Grid>

                </Grid>

                <Grid container justify="flex-end" sm={1} xs={1}>
                    <img id={data.id} className={classes.delete} onClick={onRemove} src={require('../../Assets/trash.png')} height="20" width="auto"/>
                </Grid>

            </Grid>
        </div>
    );
}
 
export default CheckoutCard;