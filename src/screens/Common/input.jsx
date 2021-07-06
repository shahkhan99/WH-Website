import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    flexBasis: 200,
    backgroundColor:'#E0E0E0',
		width: 400,
		[theme.breakpoints.down("sm")]:{
			width:'100%'
		}
  },
}));

export default function Input({id, Icon, styles, onChange, placeholder, label, variant, iconH}) {
  const classes = useStyles();

  return (
    <div>
      <TextField
        id="TextField"
        className={clsx(classes.margin, classes.textField)}
        variant={variant||"outlined"}
        placeholder={placeholder}
        label={label}
        style={styles}
        InputProps={{
          id: id,
          onChange: onChange,
          endAdornment: <InputAdornment position="end">
            {<img src={Icon==null?"":require(`../../Assets/Icons/${Icon}`)} style={iconH==null? {height:20,width:'auto'}:{height:iconH,width:"auto"}}/>}
          </InputAdornment>,
        }}
      />
    </div>
  );
}