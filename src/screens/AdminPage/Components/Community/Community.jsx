import React, { useState } from 'react';
import AddCommunity from './AddCommunity';
import ViewCommunity from './ViewCommunity';
import { AppBar, Tab, Tabs } from '@material-ui/core';



const Community = () => {
    const [state, setState] = useState(0);


    return ( 
        <div style={{width:"100%"}}>
            <AppBar position="static">
                <Tabs indicatorColor="secondary" value={state} onChange={(e,v) => setState(v)}>
                    <Tab label="View All Community" style={{width:200}} />
                    <Tab label="Add a new Community" style={{width:200}} />
                </Tabs>
            </AppBar>
            {state===0 && <ViewCommunity />}
            {state===1 && <AddCommunity />}
        </div>
    );
}
 
export default Community;