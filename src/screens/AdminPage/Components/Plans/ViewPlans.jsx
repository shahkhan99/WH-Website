import React, { Component } from 'react';
// import '../../../../Assets/css/smothScroller.css';
import { GetAllPlan, DeleteOnePlan } from '../../../../Services/Admin-Service';
import Table from './PlansTable';
import Confirmation from './planConfirmation';
import PlanDetails from './PlanDetails';
import EditPlan from './EditPlans';



class ViewPlan extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        this.FetchPlan();
    }

    FetchPlan = () => {
        GetAllPlan('all').then(docs => {
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

    DeletePlan = event => {
        const { products, index } = this.state;

        this.setState({ loading:true, confirmAlert:false }, () => {
            const id = products[index].id;
            let Temp = products.slice();
            Temp.splice(index, 1);
        
            DeleteOnePlan({ id }).then(() => {
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
        const { products, edit, details, index, confirmAlert, loading } = this.state;

        return (
            <div style={{padding:'50px'}}>
                
                <Table data={products} onDetails={this.onClickDetails} onDelete={this.onClickDelete} loading={loading} />

                {confirmAlert && <Confirmation data={products[index]} open={confirmAlert} onDelete={this.DeletePlan} onCLose={this.onCloseAlert}/>}

                {details && <PlanDetails data={products[index]} onEdit={this.onClickEdit} /> }
                {edit && <EditPlan editData={products[index]} /> }

            </div>
        )
    }
}

export default ViewPlan;