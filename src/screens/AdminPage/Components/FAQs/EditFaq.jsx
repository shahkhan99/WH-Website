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
import { UpdateFaq } from '../../../../Services/Admin-Service';



const useStyles = makeStyles(theme => ({
    heading: {
        fontWeight: 700,
        textTransform: 'uppercase'
    },
    Input:
    {
        display:'flex',
        flexDirection:'column'
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

const EditFaq = ({ editData }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(editData ? { question:editData.question} : {});
    const [error, setError] = useState({});
    const [faq, setFaq] = useState(editData && editData.faq ? editData.faq :[]);
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
        let temp = {...data};
        temp[id] = value;
        setData(temp);
    }
    const handleEditAnswer= index=>
{

    faq[index]=document.getElementById(`editFaq${index}`).value
    setFaq(faq);

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

    const handleRemoveCare = index => {
        const temp = faq.slice();
        temp.splice(index, 1);
        setFaq(temp);
    }
   
    const handleSubmit = event => {
        
       
        console.log(data)
        setError(validate());
    }

    const AddNewFaq = async () => {
        setLoading(true);

        const { question} = data;
        const product = {question};
        if (faq.length > 0) product.faq = faq;
        UpdateFaq({ id:editData.id, data:product }).then(() => window.open('/@dm!n?NewFaq=true', '_self'))
    }


 
    useEffect(() => {
        if (data.question && !error) AddNewFaq();
    }, [error])

    const classes = useStyles();
    return (
        <div>
            {loading
            ?
                <div className={classes.wrapper}>
                    <Typography className={classes.heading}>Edit FAQ:</Typography>
                    <br/>
                    <Typography variant='body1' style={{textAlign:'center', margin:'40px 0px 40px 10px'}}>Please Wait ..</Typography>
                    <Loader />
                </div>
            :
                <div className={classes.wrapper}>

                    <Typography className={classes.heading}>Edit FAQ:</Typography>
                    <br/>

                    <Label title="Question" />
                    <Input id='question' label="Question" value={data.question} placeholder= 'Question' handleChange={onChange}/>

                    {error && (error.question) && <Error text={error.question}/>}
                    <br/><br/>

                    <Label title="Answer:"/>
                    <Grid container direction='row'>
                        <Input id='faq' label='Answer' handleChange={e => setFaqData(e.target.value)}/>
                        <Button className={classes.addButton} onClick={handleCareAdd} variant='outlined' color='primary'>Add</Button>
                    </Grid>
                    {faq.length>0 &&
                        <Grid container direction='row'>
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
                  
                    
                  
                
                   

            
                
                  

                

                

                        
                
                   
                    <Button color='primary' onClick={handleSubmit} variant='contained'>Save Changes</Button>
                </div>
            }
        </div>
    );
}
 
export default EditFaq;