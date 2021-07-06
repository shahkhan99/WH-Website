import React, { useState, useEffect, useRef,Component } from 'react';

// ------ Material UI --------
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Chip} from '@material-ui/core';
import Joi from 'joi-browser';
import { CreateProduct } from '../../../../Services/Admin-Service';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import TableLoader from '../../Common/TableLoader';
// -----Common------
import Label from '../../Common/Label';
import Input from '../../Common/Input';
import Error from '../../Common/Error';
import Confirmation from './Confirmation';
import Loader from '../../../Common/Loader';


// Database
import {GetAllLocation,CreateLocation,DeleteOneLocation,UpdateLocation} from '../../../../Services/Admin-Service'


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

const AddLocation = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [error, setError] = useState({});


    

    const schema = {
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

    const handleSubmit = event => {
   
        setError(validate());
    }

    const AddNewLocation = async () => {
        setLoading(true);

        const { locName} = data;
        const product = { locName};
        
        CreateLocation({ data:product }).then(() => window.open('/@dm!n?NewLocation=true', '_self'))
    }

  


    useEffect(() => {
        if (data.locName && !error) AddNewLocation();
    }, [error])

    const classes = useStyles();
    return (
        <div>
            {loading
            ?
                <Loader />
            :
                <div className={classes.wrapper}>
                        <h1>Add New Location:</h1>
                    <br/>
                    <Label title="Location Name" />
                    <Input id='locName' label='Location Name' placeholder='Location Name' handleChange={onChange}/>
                    {error && (error.locName) && <Error text={error.locName}/>}
                    <br/><br/>

                    <Button color='primary' onClick={handleSubmit} variant='contained'>Add Location</Button>
                </div>
            }
                    <ViewLocations/>
        </div>

    );
}
 
export default AddLocation;


class ViewLocations extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        this.FetchProducts();
    }

    FetchProducts = () => {
        GetAllLocation('all').then(docs => {
            this.setState({ products:docs, loading:false });
        })
    }

    onClickDelete = event => {
        const { id } = event.currentTarget;
        const { products } = this.state;
        const index = products.findIndex(x => x.id===id);
        
        this.setState({ confirmAlert:true, index });
    }

    onCloseAlert = event => {
        this.setState({ index:null, confirmAlert:false })
    }

    DeleteProduct = event => {
        const { products, index } = this.state;

        this.setState({ loading:true, confirmAlert:false }, () => {
            const id = products[index].id;
            let Temp = products.slice();
            Temp.splice(index, 1);
        
            DeleteOneLocation({ id }).then(() => {
                this.setState({ products:Temp, index:null, loading:false })
            })
        })
        
    }

    onClickDetails = event => {
        const { id } = event.currentTarget;
        const { products } = this.state;
        const index = products.findIndex(x => x.id===id);
        
        this.setState({ details:true, index }, () => {
            window.scrollTo(0, 710); 
        });
    }

    onClickEdit = event => {
        const { products, index } = this.state;
        let data = products[index];
        this.setState({ data, details:false, edit:true }, () => {
            window.scrollTo(0, 710);
        });
    }
    
    render () {
        const { products, edit, index, confirmAlert, loading } = this.state;

        return (
            <div style={{padding:'50px'}}>
                
                <Table data={products} onDelete={this.onClickDelete} loading={loading} />

                {confirmAlert && <Confirmation data={products[index]} open={confirmAlert} onDelete={this.DeleteProduct} onCLose={this.onCloseAlert}/>}
               

            </div>
        )
    }
}

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const options = {
    headerStyle: {
        cursor: 'pointer',
        fontWeight: 650,
        zIndex: 2,
        fontFamily:"'Roboto Mono', monospace"
    },
    showTitle: false
}


function Table({ data, loading, onDelete }) {
    
    const columns = [
        { title: 'Name', field: 'locName', render: rowData => <Typography variant='subtitle2'>{rowData.locName}</Typography> },
        { title: 'Delete', field: 'delete', render: rowData => <Button style={{fontSize:12}} variant='contained' color='primary' id={rowData.id} onClick={onDelete}>Delete</Button> },
    ]

    return (
        <MaterialTable
        options={options}
        icons={tableIcons}
        isLoading={loading}
        components={{OverlayLoading: TableLoader}}
        columns={columns}
        data={data}
        />
    );
}

