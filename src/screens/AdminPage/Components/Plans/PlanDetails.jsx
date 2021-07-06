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

const PlanDetails = ({ data, onEdit }) => {

    const classes = useStyles();
    return (
        <Grid className={classes.wrapper} container direction='column'>

            <h1 className={classes.heading}>Plan Details:</h1>
            <br/>

            <Typography className={classes.heading}>Location Name:</Typography>
            <Typography variant='body1'>{data.locName}</Typography>
            <br/>

            <Typography className={classes.heading}>Plan Image:</Typography>
            <Grid container direction='row'>
                {data.images.map(item => (
                    <div>
                        <img src={item} className={classes.selectedImages} />
                    </div>
                ))}
            </Grid>
            <br/><br/>

            <Typography className={classes.heading}>Plan Name:</Typography>
            <Typography variant='body1'>{data.planName}</Typography>
            <br/>

            <Typography className={classes.heading}>Plan Info.:</Typography>
            <Typography variant='body1'>{data.planInfo}</Typography>
            <br/>
            
            <Typography className={classes.heading}>Best For:</Typography>
            <Typography variant='body1'>{data.bestFor}</Typography>
            <br/>

            
           

            <Button color='primary' style={{padding:'10px 20px', width:150}} onClick={onEdit} variant='contained'>Edit Course</Button>

        </Grid>
    )
}

export default PlanDetails;
