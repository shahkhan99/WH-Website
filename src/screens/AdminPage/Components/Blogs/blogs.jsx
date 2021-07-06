import React, { useState } from 'react';
import Addblog from './Addblog';
import ViewBlogs from './ViewBlogs';
import { AppBar, Tab, Tabs } from '@material-ui/core';



const Blogs = () => {
    const [state, setState] = useState(0);


    return ( 
        <div style={{width:"100%"}}>
            <AppBar position="static">
                <Tabs indicatorColor="secondary" value={state} onChange={(e,v) => setState(v)}>
                    <Tab label="View All Blogs" style={{width:200}} />
                    <Tab label="Add a new Blogs" style={{width:200}} />
                </Tabs>
            </AppBar>
            {state===0 && <ViewBlogs />}
            {state===1 && <Addblog />}
        </div>
    );
}
 
export default Blogs;