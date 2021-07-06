import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Chip } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Label from '../../Common/Label';
import Input from '../../Common/Input';
import Error from '../../Common/Error';
import ImageEditor from '../../Common/ImageEditor';
import MiniInput from '../../Common/MiniInput';
import Loader from '../../Common/TableLoader';
import Joi from 'joi-browser';
import closeIcon from '../../assets/Icons/imgClose.png';
import { UpdatePlan } from '../../../../Services/Admin-Service';



const useStyles = makeStyles(theme => ({
    heading: {
        fontWeight: 700,
        textTransform: 'uppercase'
    },
    wrapper: {
        padding: '30px 0px'
    },
    addButton: {
        margin: '5px 0px 0px 10px',
        height: '55px'
    },
    Chip: {
        margin: '5px 10px 5px 0px' 
    },
    variantWrapper: {
        paddingTop: 10,
        margin: '5px 10px 5px 0px', 
        width: 400,
        borderRadius: 16,
        border: '1px solid #c4c4c4'
    },
    sizesWrapper: {
        padding: '10px 0px',
        margin: '5px 10px 20px 0px', 
        width: 400,
        borderRadius: 16,
        border: '1px solid #c4c4c4'
    },
    text: {
        fontSize: 15
    },
    content: {
        fontSize: 15,
        padding: '7px 0px'
    },
    selectedImages: {
        width:170,
        height: 170,
        borderRadius: '4px',
        marginRight:20
    },
    closeIcon: {
        cursor: 'pointer',
        width: 20,
        position: 'absolute',
        margin: '5px 0px 0px 145px'
    }
}));

const EditPlan = ({ editData }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(editData ? { locName:editData.locName,planName:editData.planName,planInfo:editData.planInfo,images:editData.images } : {});
    const [error, setError] = useState({});
    const [bestFor, setBestFor] = useState(editData && editData.bestFor ? editData.bestFor : []);
    const [bestForData, setBestForData] = useState(null);


    let Editor = useRef(null);

    const setEditorRef = canvas => {
		Editor = canvas;
    }
    
    const getImage = () => {
        return new Promise((resolve, reject) => {
            const canvas = Editor.getImageScaledToCanvas().toDataURL()
            fetch(canvas)
                .then(res => res.blob())
                .then(blob => resolve(blob))
        })
    }

    const schema = {
        planName:Joi.string().required(),
        planInfo:Joi.string().required(),
        images: Joi.array().max(1).required(),
        locName:Joi.string().required()
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
        let temp = {...data};
        temp[id] = value;
        setData(temp);
    }

    const handleCareAdd = event => {
        if (bestForData && bestForData!=='') {
            const temp = bestFor.slice();
            temp.push(bestForData);
            setBestFor(temp);
            setBestForData(null);
            document.getElementById('bestFor').value = '';
        }
    }

    const handleRemoveCare = index => {
        const temp = bestFor.slice();
        temp.splice(index, 1);
        setBestFor(temp);
    }
 

    const handleSubmit = event => {
        
        setError(validate());
    }

    const UpdatePlans = async () => {
        setLoading(true);

        const { locName,planName, planInfo, images } = data;
        const plan = { locName,planName, planInfo, images };
      

      
        if (bestFor.length > 0) plan.bestFor = bestFor;

        UpdatePlan({ id:editData.id, data:plan }).then(() => window.open('/@dm!n?NewLocation=true', '_self'))
    }

    const AddImageToPlan = async () => {
        const temp = {...data};
        if (temp.images) {
            temp.images.push(await getImage())
        } else {
            temp.images = [await getImage()]
        }
        setData(temp);
    }

    const onClickRemoveImage = index => {
        const temp = {...data};
        temp.images.splice(index, 1);
        setData(temp);
    }

    useEffect(() => {
        if (data.locName && data.planName && !error) UpdatePlans();
    }, [error])

    const classes = useStyles();
    return (
        <div>
            {loading
            ?
                <div className={classes.wrapper}>
                    <Typography className={classes.heading}>Edit Plan:</Typography>
                    <br/>
                    <Typography variant='body1' style={{textAlign:'center', margin:'40px 0px 40px 10px'}}>Please Wait ..</Typography>
                    <Loader />
                </div>
            :
                <div className={classes.wrapper}>

                    <Typography className={classes.heading}>Edit Plan:</Typography>
                    <br/>
                    <Label title="Location:" />
                    <Input id='locName' label='ex: (faWordpress, faMicrophoneAlt etc.)' value={data.locName} placeholder='ex: (faWordpress, faMicrophoneAlt etc.)' handleChange={onChange}/>

                    {error && (error.locName) && <Error text={error.locName}/>}
                    <br/>

                    <Label title="Image"/>
                    <ImageEditor AddImageToProduct={AddImageToPlan} setEditorRef={setEditorRef} />
                    <br/>
                    {data.images && data.images.length>0 && 
                        <Grid container direction='row'>
                            {data.images.map((item, index) => (
                                <div>
                                    <img src={closeIcon} onClick={e => onClickRemoveImage(index)} className={classes.closeIcon} />
                                    <img src={typeof(item)==='string' ? item : window.URL.createObjectURL(item)} className={classes.selectedImages} />
                                </div>
                            ))}
                        </Grid>
                    }
                    {error && error.images && <Error text={error.images}/>}
                    <br/><br/>
              

                    <Label title="Plan Name:"/>
                    <Input id='planName' label='Plan Name' value={data.planName} placeholder='Plan Name' handleChange={onChange}/>
                    {error && error.planName && <Error text={error.planName}/>}
                    <br/>
                    <Label title="Plan Info:"/>
                    <Input id='planInfo' label='Plan Info' value={data.planInfo} placeholder='Plan Info' handleChange={onChange}/>
                    {error && error.planInfo && <Error text={error.planInfo}/>}
                    <br/>
                    <Label title="Best For"/>
                    <Grid container direction='row'>
                        <Input id='bestFor' label='Best For' handleChange={e => setBestForData(e.target.value)}/>
                        <Button className={classes.addButton} onClick={handleCareAdd} variant='outlined' color='primary'>Add</Button>
                    </Grid>
                    {bestFor.length>0 &&
                        <Grid container direction='row'>
                            {bestFor.map((item, index) => {
                                return (
                                    <Chip
                                        className={classes.Chip}
                                        avatar={<DoneIcon />}
                                        label={item}
                                        onDelete={e => handleRemoveCare(index)}
                                        variant="outlined"
                                    />
                                )
                            })}
                        </Grid>	
                    }
                    <br/>

                    <Button color='primary' onClick={handleSubmit} variant='contained'>Save Changes</Button>
                </div>
            }
        </div>
    );
}
 
export default EditPlan;