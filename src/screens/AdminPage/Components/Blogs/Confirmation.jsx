import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Confirmation ({data, open, onDelete, onCLose}) {
    
    return (
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={onCLose}>

            <DialogTitle>Confirmation</DialogTitle>
            
            <DialogContent>
                <DialogContentText style={{textAlign:'center'}}>
                    Are you sure you want to delete this Blog ?
                    <br/>
                    <b>{data.memberName}</b>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onCLose} variant='outlined' color="primary">Close</Button>
                <Button onClick={onDelete} variant='contained' color="primary" autoFocus>Delete</Button>
            </DialogActions>

        </Dialog>
    );
}