import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Typography, Grid } from '@material-ui/core';
import Label from '../../Common/Label';
import Input from '../../Common/Input';
import Error from '../../Common/Error';
import Loader from '../../../Common/Loader';
import Joi from 'joi-browser';
import { CreateShipmentPrices, ModifyShipmentPrices } from '../../../../Services/Admin-Service';


const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: '50px 40px'
    },
    heading: {
        fontSize: 18,
        fontWeight: 500
    }
}));


const EditPrices = ({ prices }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [error, setError] = useState({});

    const schema = {
        othersSmall: Joi.number().required(),
        othersMedium: Joi.number().required(),
        othersLarge: Joi.number().required(),
        karachiSmall: Joi.number().required(),
        karachiMedium: Joi.number().required(),
        karachiLarge: Joi.number().required(),
    }
    
    const validate = () => {
		const result = Joi.validate(data, schema, {abortEarly:false});
	
		if(!result.error) return null;
	
		const newError = {};
		result.error.details.map(err => {
			return newError[err.path[0]] = err.message;
        });

		return newError;   
    }

    const onChange = event => {
        const { id, value } = event.target;
        let temp = data;
        temp[id] = value;
        setData(temp);
    }

    const onSubmit = event => {
        setError(validate());
    }

    const EditPrices = event => {
        setLoading(true);

        const { othersSmall, othersMedium, othersLarge, karachiSmall, karachiMedium, karachiLarge } = data;
        let temp = { 
            karachi: {
                small: parseInt(karachiSmall),
                medium: parseInt(karachiMedium),
                large: parseInt(karachiLarge)
            },
            others: {
                small: parseInt(othersSmall),
                medium: parseInt(othersMedium),
                large: parseInt(othersLarge)
            }
        }

        ModifyShipmentPrices({ id:prices.id, data:temp }).then(x => window.open('/admin?ShipmentPriceModified=true', '_self'));

    }

    useEffect(() => {
        if (data.othersSmall && data.othersMedium && data.othersLarge && data.karachiSmall && data.karachiMedium && data.karachiLarge && !error) EditPrices();
    }, [error]);

    const classes = useStyles();
    return (
        <div>
            {loading
            ?
                <Loader />
            :
                <div className={classes.wrapper}>

                    <Grid container>
                        <Grid container direction='column' xs={6} style={{paddingRight:100}}>

                            <Typography className={classes.heading}>Shipment in Karachi</Typography>
                            <br/>

                            <Label title="Small"/>
                            <Input id='karachiSmall' label='Small' placeholder='Price' handleChange={onChange} />
                            {error && error.karachiSmall && <Error text='Small Prices is Required.' />}
                            <br/>

                            <Label title="Medium"/>
                            <Input id='karachiMedium' label='Medium' placeholder='Price' handleChange={onChange} />
                            {error && error.karachiMedium && <Error text='Medium Prices is Required.'/>}
                            <br/>

                            <Label title="Large"/>
                            <Input id='karachiLarge' label='Large' placeholder='Price' handleChange={onChange} />
                            {error && error.karachiLarge && <Error text='Large Prices is Required.'/>}
                            <br/>

                        </Grid>

                        <Grid container direction='column' xs={6} style={{paddingRight:100}}>

                            <Typography className={classes.heading}>Shipment in Other Cities</Typography>
                            <br/>

                            <Label title="Small"/>
                            <Input id='othersSmall' label='Small' placeholder='Price' handleChange={onChange} />
                            {error && error.othersSmall && <Error text='Small Prices is Required.'/>}
                            <br/>

                            <Label title="Medium"/>
                            <Input id='othersMedium' label='Medium' placeholder='Price' handleChange={onChange} />
                            {error && error.othersMedium && <Error text='Medium Prices is Required.'/>}
                            <br/>

                            <Label title="Large"/>
                            <Input id='othersLarge' label='Large' placeholder='Price' handleChange={onChange} />
                            {error && error.othersLarge && <Error text='Large Prices is Required.'/>}
                            <br/>
                            
                        </Grid>
                    </Grid>

                    <Button color='primary' onClick={onSubmit} variant='contained'>Save Changes</Button>
                </div>
            }
        </div>
    )
}

export default EditPrices
