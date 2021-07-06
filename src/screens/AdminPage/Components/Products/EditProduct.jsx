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
import { UpdateProduct } from '../../../../Services/Admin-Service';



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

const EditProduct = ({ editData }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(editData ? { icons:editData.icons, short_name:editData.short_name, long_name:editData.long_name, short_description:editData.short_description,long_description:editData.long_description,price:editData.price, forWho:editData.forWho, no_students:editData.no_students,no_sessions:editData.no_sessions, duration:editData.duration,s_date:editData.s_date,r_deadline:editData.r_deadline,intro_link:editData.intro_link,tutorname:editData.tutorname,t_qualification:editData.t_qualification,t_details:editData.t_details,t_linkedin:editData.t_linkedin, images:editData.images } : {});
    const [error, setError] = useState({});
    const [productVariant, setProductVariant] = useState(editData && editData.productVariant ? editData.productVariant : []);
    const [productVariantData, setProductVariantData] = useState(null);
    const [productVariantOptionData, setProductVariantOptionData] = useState([]);

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
        icons:Joi.string().required(),
        short_name:Joi.string().required(),
        long_name: Joi.string().required(),
        short_description: Joi.string().required(),
        long_description: Joi.string().required(),
        price: Joi.number().required(),
        images: Joi.array().min(1).required(),
        no_students:Joi.number().required(),
        no_sessions:Joi.number().required(),
        duration:Joi.number().required(),
        intro_link:Joi.string().required(),
        forWho:Joi.string().required(),
        s_date:Joi.string().required(),
        r_deadline:Joi.string().required(),
        tutorname:Joi.string().required(),
        t_qualification:Joi.string().required(),
        t_details:Joi.string().required(),
        t_linkedin:Joi.string().required(),
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



    const handleVariantAdd = event => {
        const value = productVariantData;
        if (value && value!=='') {
            const temp = productVariant.slice();
            temp.push({ name: value, Options:[] });
            setProductVariant(temp);
            document.getElementById('productVariant').value = '';
        }
    }

    const handleVariantOptionChange = (event, index) => {
        const { id, value } = event.target;
        if(index<=9)
        {
        const idFixed = id.slice(0,-1);
        const Temp = productVariantOptionData.slice();
        const data = {...Temp[index] || {}}
        data[idFixed] = value;
        Temp[index] = data;
        setProductVariantOptionData(Temp);
    }
        else if(index => 10)
        {
            const idFixed = id.slice(0,-2);
            const Temp = productVariantOptionData.slice();
            const data = {...Temp[index] || {}}
            data[idFixed] = value;
            Temp[index] = data;
            setProductVariantOptionData(Temp);
        }
      
    }

    const handleAddVariantOption = index => {
        const temp = productVariant.slice();
        const OptArray = temp[index].Options;
        OptArray.push(productVariantOptionData[index]);
        temp[index].Options = OptArray;
        setProductVariant(temp);
        document.getElementById(`content${index}`).value = '';
    }

    const onRemoveVariantOption = (index, subIndex) => {
        let temp = productVariant.slice();
        let OptArray = temp[index].Options.slice();
        OptArray.splice(subIndex, 1);
        temp[index].Options = OptArray;
        setProductVariant(temp);
    }

    const handleSubmit = event => {
        
       
        console.log(data)
        setError(validate());
    }

    const AddNewProduct = async () => {
        setLoading(true);

        const { icons, short_name, long_name, short_description,long_description,price, forWho, no_students,no_sessions, duration,s_date,r_deadline,intro_link,tutorname,t_qualification,t_details,t_linkedin, images } = data;
        const product = { icons, short_name, long_name, short_description,long_description,price, forWho, no_students,no_sessions, duration,s_date,r_deadline,intro_link,tutorname,t_qualification,t_details,t_linkedin, images };


        const tempVariant = [];
        if (productVariant.length > 0) {
            for (let x = 0; x < productVariant.length; x++) {
                if (productVariant[x].Options.length > 0) tempVariant.push(productVariant[x]);
            }
            if (tempVariant.length > 0) product.productVariant = tempVariant;
        }
        
        UpdateProduct({ id:editData.id, data:product }).then(() => window.open('/@dm!n?NewProduct=true', '_self'))
    }
const onRemoveVariant=index=>
{
    let temp = productVariant.slice();
    temp.splice(index, 1);
   
    setProductVariant(temp);
}
    const AddImageToProduct = async () => {
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
        if (data.short_name && data.price && !error) AddNewProduct();
    }, [error])

    const classes = useStyles();
    return (
        <div>
            {loading
            ?
                <div className={classes.wrapper}>
                    <Typography className={classes.heading}>Edit Course:</Typography>
                    <br/>
                    <Typography variant='body1' style={{textAlign:'center', margin:'40px 0px 40px 10px'}}>Please Wait ..</Typography>
                    <Loader />
                </div>
            :
                <div className={classes.wrapper}>

                    <Typography className={classes.heading}>Edit Course:</Typography>
                    <br/>

                    <Label title="Icon Name" />
                    <Input id='icons' label='ex: (faWordpress, faMicrophoneAlt etc.)' value={data.icons} placeholder='ex: (faWordpress, faMicrophoneAlt etc.)' handleChange={onChange}/>

                    {error && (error.icons) && <Error text={error.icons}/>}
                    <br/><br/>

                    <Label title="Short Name"/>
                    <Input id='short_name' label='Short Name' value={data.short_name} placeholder='Short Name' handleChange={onChange}/>
                    {error && error.short_name && <Error text={error.short_name}/>}
                    <br/><br/>
                    <Label title="Long Name"/>
                    <Input id='long_name' label='Long Name' value={data.long_name} placeholder='Long Name' handleChange={onChange}/>
                    {error && error.long_name && <Error text={error.long_name}/>}
                    <br/><br/>
                    
                    <Label title="Short Description"/>
                    <Input id='short_description' label='Short Description' value={data.short_description} multiline placeholder='Short Description' handleChange={onChange}/>
                    {error && error.short_description && <Error text={error.short_description}/>}
                    <br/><br/>

                    <Label title="Long Description"/>
                    <Input id='long_description' label='Long Description' value={data.long_description} multiline placeholder='Long Description' handleChange={onChange}/>
                    {error && error.long_description && <Error text={error.long_description}/>}
                    <br/><br/>

                    <Label title="Price"/>
                    <Input id='price' label='Course Price' value={data.price} placeholder='Course Price' handleChange={onChange}/>
                    {error && error.price && <Error text={error.price}/>}
                    <br/><br/>
                
                    <Label title="Who is for?"/>
                    <Input id='forWho' label='Who is for?' value={data.forWho} multiline placeholder='Who is for?' handleChange={onChange}/>
                    {error && error.forWho && <Error text={error.forWho}/>}
                    <br/><br/>

                    <Label title="Course Intro Link"/>
                    <Input id='intro_link' label='Intro Link' value={data.intro_link} placeholder='Youtube Link' handleChange={onChange}/>
                    {error && error.intro_link && <Error text={error.intro_link}/>}
                    <br/><br/>

                    <Label title="Numbers of sessions"/>
                    <Input id='no_sessions' label='Number of Sessions' value={data.no_sessions} placeholder='' handleChange={onChange}/>
                    {error && error.no_sessions && <Error text={error.no_sessions}/>}
                    <br/><br/>


                    <Label title="Numbers of Students Enroll"/>
                    <Input id='no_students' label='Number of Students' value={data.no_students} placeholder='' handleChange={onChange}/>
                    {error && error.no_students && <Error text={error.no_students}/>}
                    <br/><br/>

                    <Label title="Course Duration"/>
                    <Input id='duration' label='Course Duration' value={data.duration} placeholder='Number of weeks' handleChange={onChange}/>
                    {error && error.duration && <Error text={error.duration}/>}
                    <br/><br/>

                    <Label title="Start Date"/>
                    <Input id='s_date' label='' type='date' value={data.s_date} placeholder='Start Date' handleChange={onChange}/>
                    {error && error.s_date && <Error text={error.s_date}/>}
                    <br/><br/>

                    <Label title="Registration Deadline"/>
                    <Input id='r_deadline' label='' type='date' value={data.r_deadline} placeholder='Registration Date' handleChange={onChange}/>
                    {error && error.r_deadline && <Error text={error.r_deadline}/>}
                    <br/><br/>
                    <h1>Tutor Details:</h1>
                        <Label title="Tutor Name"/>
                        <Input id='tutorname' label='Tutor name' value={data.tutorname} placeholder='Tutor name' handleChange={onChange}/>
                        {error && error.tutorname && <Error text={error.tutorname}/>}
                        <br/><br/>

                        <Label title="Tutor Qualification"/>
                        <Input id='t_qualification' value={data.t_qualification} label='Tutor Qualification' placeholder='Tutor Qualification' handleChange={onChange}/>
                        {error && error.t_qualification && <Error text={error.t_qualification}/>}
                        <br/><br/>

                        <Label title="Tutor Details"/>
                        <Input id='t_details' value={data.t_details} label='Tutor details' multiline placeholder='Tutor details' handleChange={onChange}/>
                        {error && error.t_details && <Error text={error.t_details}/>}
                        <br/><br/>

                        <Label title="Tutor's Linked"/>
                        <Input id='t_linkedin' value={data.t_linkedin} label="Profile Link" placeholder='Profile Link' handleChange={onChange}/>
                        {error && error.t_linkedin && <Error text={error.t_linkedin}/>}
                        <br/><br/>

                    <Label title="Product Variant"/>
                    <Grid container direction='row'>
                        <Input id='productVariant' label='Product Variant' handleChange={e => setProductVariantData(e.target.value)}/>
                        <Button className={classes.addButton} onClick={handleVariantAdd} variant='outlined' color='primary'>Add</Button>
                    </Grid>
                    
                    {productVariant.length>0 &&
                        <Grid container direction='row'>
                            {productVariant.map((item, index) => (
                                <Grid className={classes.variantWrapper} container direction='row'>
                                    <Grid container justify='center' alignItems='center' style={{margin:'20px 0px', borderRight:'1px solid #c4c4c4'}} xs={3}>
                                        <Typography className={classes.text}>{item.name}</Typography>
                                        
                                    </Grid>
                                    <Grid container direction='column' justify='center' alignItems='center' xs={4}>
                                                    <Typography onClick={e => onRemoveVariant(index)} className={classes.content} style={{cursor:'pointer'}}>x</Typography>
                                                </Grid>

                                    <Grid container direction='column' justify='center' alignItems='center' xs={9}>
                                        <Grid container direction='row'>
                                            <Grid container direction='column' justify='center' alignItems='center' xs={8}>
                                                <MiniInput id={`content${index}`} placeholder='Option' handleChange={e => handleVariantOptionChange(e,index)} />
                                            </Grid>
                                            <Grid container direction='column' justify='center' alignItems='center' xs={4}>
                                                <Button onClick={e => handleAddVariantOption(index)} color='primary' variant='outlined'>Add</Button>
                                            </Grid>
                                        </Grid>
                                        {item.Options.map((subItem, subIndex) => (
                                            <Grid container direction='row'>
                                                <Grid container direction='column' justify='center' alignItems='center' xs={8}>
                                                    <Typography className={classes.content}>{subItem.content}</Typography>
                                                </Grid>
                                                <Grid container direction='column' justify='center' alignItems='center' xs={4}>
                                                    <Typography onClick={e => onRemoveVariantOption(index, subIndex)} className={classes.content} style={{cursor:'pointer'}}>x</Typography>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>	
                    }
                    <br/>

                        
                    <Label title="Image"/>
                    <ImageEditor AddImageToProduct={AddImageToProduct} setEditorRef={setEditorRef} />
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

                    <Button color='primary' onClick={handleSubmit} variant='contained'>Save Changes</Button>
                </div>
            }
        </div>
    );
}
 
export default EditProduct;