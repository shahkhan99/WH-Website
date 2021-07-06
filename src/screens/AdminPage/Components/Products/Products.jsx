import React, { useState } from 'react';
import AddProduct from './AddProduct';
import ViewProducts from './ViewProducts';
import { AppBar, Tab, Tabs } from '@material-ui/core';



const Products = () => {
    const [state, setState] = useState(0);


    return ( 
        <div style={{width:"100%"}}>
            <AppBar position="static">
                <Tabs indicatorColor="secondary" value={state} onChange={(e,v) => setState(v)}>
                    <Tab label="View All Courses" style={{width:200}} />
                    <Tab label="Add a new Course" style={{width:200}} />
                </Tabs>
            </AppBar>
            {state===0 && <ViewProducts />}
            {state===1 && <AddProduct />}
        </div>
    );
}
 
export default Products;