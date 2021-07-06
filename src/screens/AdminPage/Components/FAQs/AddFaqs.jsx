import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Chip} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Label from '../../Common/Label';
import Input from '../../Common/Input';
import Error from '../../Common/Error';
import ImageEditor from '../../Common/ImageEditor';
import MiniInput from '../../Common/MiniInput';
import Loader from '../../../Common/Loader';
import DropDown from '../../Common/DropDown'
import Joi from 'joi-browser';
import closeIcon from '../../assets/Icons/imgClose.png';
import {  CreateFaq } from '../../../../Services/Admin-Service';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
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
    Input:
    {
        display:'flex',
        flexDirection:'column'
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

const AddFaq = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [error, setError] = useState({});
    const [faq, setFaq] = useState([]);
    const [faqData, setFaqData] = useState(null);
  
    
    let Editor = useRef(null);

    const setEditorRef = canvas => {
		Editor = canvas;
    }
    
   

    const schema = {
        question:Joi.string().required(),
      
    
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
        if (faqData && faqData!=='') {
            const temp = faq.slice();
            temp.push(faqData);
            setFaq(temp);
            setFaqData(null);
            document.getElementById('faq').value = '';
        }
    }
const handleEditAnswer= index=>
{

    faq[index]=document.getElementById(`editFaq${index}`).value
    setFaq(faq);

}
    const handleRemoveCare = index => {
        const temp = faq.slice();
        temp.splice(index, 1);
        setFaq(temp);
    }


    const handleSubmit = event => {
   
        setError(validate());
    }

    const AddNewFaq = async () => {
        setLoading(true);

        const { question} = data;
        const product = {question};
      

        if (faq.length > 0) product.faq = faq;

     
        CreateFaq({ data:product }).then(() => window.open('/@dm!n?NewFaq=true', '_self'))
    }

    
    
    const [category, setCategory] = React.useState('');

    const handleChange = event => {
        setCategory(event.target.value);
        let temp=data
        temp['category']=event.target.value
        setData(temp)
        console.log(data)
    };


    useEffect(() => {
        if (data.question && !error) AddNewFaq();
    }, [error],
    console.log(error)
    )

    const classes = useStyles();
    return (
        <div>
            {loading
            ?
                <Loader />
            :
                <div className={classes.wrapper}>
                        <h1>FAQ Details:</h1>
                    <br/>
                    
                  
                    <Label title="Question" />
                    <Input id='question' label='Question' placeholder='Question' handleChange={onChange}/>

                    {error && (error.question) && <Error text={error.question}/>}
                   
                    <br/><br/>
   

                    <Label title="Answer:"/>
                    <Grid container direction='row'>
                        <Input id='faq' label='Answer' handleChange={e => setFaqData(e.target.value)}/>
                        <Button className={classes.addButton} onClick={handleCareAdd} variant='outlined' color='primary'>Add</Button>
                    </Grid>
                    {faq.length>0 &&
                      
                        <Grid container direction='column'>
                            {faq.map((item, index) => {
                                return (
                                <Grid container direction='row'>
                                    <Input
                                        type='text'
                                        id={`editFaq${index}`}
                                        multiline
                                        variant="outlined"
                                        defaultValue={item}
                                    />
                                    <div className={classes.Input}>
                                    <Button className={classes.addButton} onClick={()=>handleEditAnswer(index)} variant='outlined' color='primary'>Edit</Button>
                                    <Button className={classes.addButton} onClick={e => handleRemoveCare(index)}  variant='outlined' color='primary'>Delete</Button>
                                    </div>
                                    </Grid>
                                )
                            })}

                        </Grid>	

                        

                    }

                    <br/>
                  
                  <br></br>

                       

                    
                   
                      

                
                  

                    <Button color='primary' onClick={handleSubmit} variant='contained'>Add Faq</Button>
                </div>
            }
        </div>
    );
}
 
export default AddFaq;