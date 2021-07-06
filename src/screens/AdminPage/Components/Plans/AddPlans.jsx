import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Chip} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Label from '../../Common/Label';
import Input from '../../Common/Input';
import Error from '../../Common/Error';
import ImageEditor from '../../Common/ImageEditor';
import Loader from '../../../Common/Loader';
import Joi from 'joi-browser';
import closeIcon from '../../assets/Icons/imgClose.png';
import { CreatePlan,GetAllLocation } from '../../../../Services/Admin-Service';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
    Heading: {
        textTransform: 'uppercase',
        fontSize: '17px',
        fontWeight: 700
    },
    wrapper: {
        padding: '20px 40px'
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
    },
    formControl:{
        width:"38%",
        [theme.breakpoints.down("sm")]: {
            width:'100%'
        },
    }
}));

const AddPlan = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [error, setError] = useState({});
    const [bestFor, setBestFor] = useState([]);
    const [bestForData, setBestForData] = useState(null);
    const [list, setList] = useState([]);
    
    
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
        locName:Joi.string().required(),
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
        console.log(data)
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

    const AddNewPlan = async () => {
        setLoading(true);

        const { locName,planName, planInfo, images } = data;
        const plan = { locName,planName, planInfo, images };
      

      
        if (bestFor.length > 0) plan.bestFor = bestFor;

        
        CreatePlan({ data:plan }).then(() => window.open('/@dm!n?NewLocation=true', '_self'))
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
    const [locName, setCategory] = React.useState('');

    const handleChange = event => {
        setCategory(event.target.value);
        let temp=data
        temp['locName']=event.target.value
        setData(temp)
        console.log(data)
    };

    const FetchLocation=()=>
    {
        GetAllLocation('all').then(docs => {
            setList(docs)
        })
    }

    useEffect(() => {
        if (data.locName && data.planName && !error) AddNewPlan();
        FetchLocation();

    }, [error])

    const classes = useStyles();
    return (
        <div>
            {loading
            ?
                <Loader />
            :
                <div className={classes.wrapper}>
                        <h1>Plans Info:</h1>
                    <br/>
                    
                    <Label title="Locations"/>
                    {/* <DropDown list={list} onChange={onChange1}/> */}
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="locName">Locations</InputLabel>
                        <Select
                        labelId="locName"
                        id="locName"
                        value={locName}
                        onChange={handleChange}
                        label="Location"
                        >
                        {
                            list && list.map(item=>{
                                return(
                                 <MenuItem value={item.locName}>{item.locName}</MenuItem>
                                )
                            })
                        }
                        </Select>
                    </FormControl>
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
                                    <img src={window.URL.createObjectURL(item)} className={classes.selectedImages} />
                                </div>
                            ))}
                        </Grid>
                    }
                    {error && error.images && <Error text={error.images}/>}
                    <br/>
                    <Label title="Plan Name" />
                    <Input id='planName' label='(X,air,.. etc.)' placeholder='(X,air,.. etc.)' handleChange={onChange}/>

                    {error && (error.planName) && <Error text={error.planName}/>}
                    <br/><br/>
                    
                    <Label title="Information"/>
                    <Input id='planInfo' label='Information' multiline placeholder='Information' handleChange={onChange}/>
                    {error && error.planInfo && <Error text={error.planInfo}/>}
                    <br/><br/>

                
                    <Label title="Best For:"/>
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
                    <Button color='primary' onClick={handleSubmit} variant='contained'>Add Plan</Button>
                </div>
            }
        </div>
    );
}
 
export default AddPlan;