import React, { Component } from 'react';
// import '../../../../Assets/css/smothScroller.css';
import { GetAllFaq, DeleteOneFaq } from '../../../../Services/Admin-Service';
import Table from './FaqsTable';
import Confirmation from './Confirmation';
import FaqDetails from './FaqDetails';
import EditFaq from './EditFaq';



class ViewFaqs extends Component {

    state = {
        loading: true,
        
    }

    componentDidMount() {
        this.FetchFaqs();
    }

    FetchFaqs = () => {
        GetAllFaq('all').then(docs => {
            this.setState({ faqs:docs, loading:false });
        })
    }

    onClickDelete = event => {
        const { id } = event.currentTarget;
        const { faqs } = this.state;
        const index = faqs.findIndex(x => x.id===id);
        
        this.setState({ confirmAlert:true, index });
    }

    onCloseAlert = event => {
        this.setState({ index:null, confirmAlert:false })
    }

    DeleteFaq = event => {
        const { faqs, index } = this.state;

        this.setState({ loading:true, confirmAlert:false }, () => {
            const id = faqs[index].id;
            let Temp = faqs.slice();
            Temp.splice(index, 1);
        
            DeleteOneFaq({ id }).then(() => {
                this.setState({ faqs:Temp, index:null, loading:false })
            })
        })
        
    }

    onClickDetails = event => {
        const { id } = event.currentTarget;
        const { faqs } = this.state;
        const index = faqs.findIndex(x => x.id===id);
        
        this.setState({ details:true, index }, () => {
            window.scrollTo(0, 710); 
        });
    }

    onClickEdit = event => {
        const { faqs, index } = this.state;
        let data = faqs[index];
        this.setState({ data, details:false, edit:true }, () => {
            window.scrollTo(0, 710);
        });
    }
    
    render () {
        const { faqs, edit, details, index, confirmAlert, loading } = this.state;

        return (
            <div style={{padding:'50px'}}>
                
                <Table data={faqs} onDetails={this.onClickDetails} onDelete={this.onClickDelete} loading={loading} />

                {confirmAlert && <Confirmation data={faqs[index]} open={confirmAlert} onDelete={this.DeleteFaq} onCLose={this.onCloseAlert}/>}

                {details && <FaqDetails data={faqs[index]} onEdit={this.onClickEdit} /> }
                {edit && <EditFaq editData={faqs[index]} /> }

            </div>
        )
    }
}

export default ViewFaqs;