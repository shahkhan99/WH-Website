import React, { useState, useEffect } from 'react';
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Joi from 'joi-browser'
import Error from '../Common/Error';
import TextField from '@material-ui/core/TextField';
import { CurrentUser, Login } from '../../Services/Auth-Service';
import Loader from '../Common/Loader';


const useStyles = makeStyles(theme => ({
    log:{
        height:"100vh"
    },
    PT:{
        marginTop:theme.spacing(3)
    },
    bord:{
        border:"1px solid black",
        padding:theme.spacing(10,20)
    }
  }));

const AdminLogin = () => {
    const [loading, setLoading] = useState(true);
    const [checkUser, setCheckUser] = useState(false);
    const [values, setValues] = React.useState({});
    const [error, setError] = useState({});

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
    
    const validate = () => {
		const result = Joi.validate(values, schema, {abortEarly:false});
	
		if(!result.error) return null;
	
		const newError = {};
		result.error.details.map(err => {
			return newError[err.path[0]] = err.message;
        });

		return newError;   
    }

    const handleClick = event => {
		setError(validate());
    }

    const LoginRequest = () => {
        setLoading(true);
        
        const { email, password } = values;
        Login({ email, password })
            .then(() => window.open('/@dm!n', '_self'))
            .catch(err => {
                setError({ invalid:err });
                setLoading(false);
            })
        
    }

    const Initialize = () => {
        if (CurrentUser()) {
            window.open('/@dm!n', '_self')
        } else {
            setCheckUser(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        
        if (!checkUser) Initialize();
		if (values.email && values.password && !error) LoginRequest();
	  
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);


    
    const classes = useStyles();
    return ( 
        <div>
            {loading
            ?
                <Loader />
            :
                <Grid container className={classes.log}>
                    <Grid  container direction="column" alignItems="center" justify="center">
                        <div className={classes.bord}>
                            <TextField className={classes.PT} value={values.email}  placeholder="Email" onChange={handleChange('email')}/>
                            {error && error.email && <Error text={error.email} /> }
                            <br/>
                            <TextField className={classes.PT} value={values.password} placeholder="Password" type='password' onChange={handleChange('password')}/>
                            {error && error.password && <Error text={error.password} /> }
                            <br/>
                            <br/>
                            <Grid container direction='column' justify="center" style={{maxWidth:200}}>
                                {error && error.invalid && <Error text={error.invalid} />}
                                <Button variant="contained" className={classes.PT} color="primary" onClick={()=>{handleClick()}} >Login</Button> <br/>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            }
        </div>
     );
}
 
export default AdminLogin;