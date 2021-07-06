import React from 'react';
import { Grid, Typography, Chip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';


const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: '30px 0px'
    },
    sizesWrapper: {
        padding: '10px 0px',
        margin: '5px 10px 20px 0px', 
        width: 400,
        borderRadius: 16,
        border: '1px solid #c4c4c4'
    },
    Chip: {
        width: 'min-content',
        margin: '5px 10px 2px 0px' 
    },
    variantWrapper: {
        padding: '10px 0px',
        margin: '5px 10px 5px 0px', 
        width: 400,
        borderRadius: 16,
        border: '1px solid #c4c4c4'
    },
    heading: {
        fontWeight: 700,
        textTransform: 'uppercase'
    },
    selectedImages: {
        width:170,
        height: 170,
        borderRadius: '4px',
        marginRight:20
    }
}));

const ProductDetails = ({ data, onEdit }) => {

    const classes = useStyles();
    return (
        <Grid className={classes.wrapper} container direction='column'>

            <h1 className={classes.heading}>Community Details:</h1>
            <br/>

            <Typography className={classes.heading}>Member Name</Typography>
            <Typography variant='body1'>{data.memberName}</Typography>
            <br/>

            <Typography className={classes.heading}>Company Name</Typography>
            <Typography variant='body1'>{data.companyName}</Typography>
            <br/>

            <Typography className={classes.heading}>Member Images</Typography>
            <Grid container direction='row'>
                {data.images.map(item => (
                    <div>
                        <img src={item} className={classes.selectedImages} />
                    </div>
                ))}
            </Grid>
            <br/><br/>

            <Button color='primary' style={{padding:'10px 20px', width:150}} onClick={onEdit} variant='contained'>Edit Community</Button>

        </Grid>
    )
}

export default ProductDetails;
