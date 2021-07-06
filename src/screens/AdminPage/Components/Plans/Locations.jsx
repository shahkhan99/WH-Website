import React, { useState,useEffect } from 'react';
import AddPlan from './AddPlans';
import ViewPlan from './ViewPlans';
import AddLocation from './LocationOperations'
import { AppBar, Tab, Tabs } from '@material-ui/core';





const Plans = () => {
    const [state, setState] = useState(0);
  
  

    return ( 
        <div style={{width:"100%"}}>
            <AppBar position="static">
                <Tabs indicatorColor="secondary" value={state} onChange={(e,v) => setState(v)}>
                    <Tab label="Locations" style={{width:200}} />
                    <Tab label="View All Plans" style={{width:200}} />
                    <Tab label="Add a new Plan" style={{width:200}} />
                </Tabs>
            </AppBar>
            {state===0 && <AddLocation />}
            {state===1 && <ViewPlan />}
            {state===2 && <AddPlan/>}
        </div>
    );
}
 
export default Plans;