import React, { useState } from 'react';
import AddFaqs from './AddFaqs';
import ViewFaqs from './ViewFaqs';
import { AppBar, Tab, Tabs } from '@material-ui/core';



const Faqs = () => {
    const [state, setState] = useState(0);


    return ( 
        <div style={{width:"100%"}}>
            <AppBar position="static">
                <Tabs indicatorColor="secondary" value={state} onChange={(e,v) => setState(v)}>
                    <Tab label="View All Faqs" style={{width:200}} />
                    <Tab label="Add a new Faq" style={{width:200}} />
                </Tabs>
            </AppBar>
            {state===0 && <ViewFaqs />}
            {state===1 && <AddFaqs />}
        </div>
    );
}
 
export default Faqs;