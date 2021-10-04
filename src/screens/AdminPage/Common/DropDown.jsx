
import React,{useState} from 'react';
import { Grid, Typography,Hidden,Divider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
    formControl:{
        width:"38%"
    }
}));
  


const DropDown = ({list,onChange}) => {
    const classes=useStyles(); 
    const inputLabel = React.useRef(null)


    return ( 
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="category">
            Select Category
        </InputLabel>
        <Select
        labelId="category"
        name="category"
        // value={}
        //onChange={(event)=>handleChange(event,setAxles)}
        onChange={onChange}
        id="category" 
        // labelWidth={labelWidth}
        >   
            {
                list.map(item=>{
                    return(
                    <MenuItem value={item.value}>{item.category}</MenuItem>
        
                    )
                })
            }   
        </Select>
        </FormControl>
     );
}
 
export default DropDown;
