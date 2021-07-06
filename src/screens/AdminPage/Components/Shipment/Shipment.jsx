import React, { useState, useEffect } from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import EditPrices from './EditPrices';
import Prices from './Prices';
import Loader from '../../../Common/Loader';
import { GetShipmentPrices } from '../../../../Services/Admin-Service';


const Shipment = () => {
    const [prices, setPrices] = useState(false);
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(0);

    const FetchPrices = () => {
        GetShipmentPrices().then(doc => {
            setPrices(doc);
            setLoading(false);
        });
    }

    useEffect(() => {
        if (!prices) FetchPrices();
    }, [prices])

    return (
        <div style={{width:"100%"}}>
            {loading
            ?
                <Loader />
            :
                <div style={{width:"100%"}}>
                    <AppBar position="static">
                        <Tabs indicatorColor="secondary" value={state} onChange={(e,v) => setState(v)}>
                            <Tab label="Shipment Prices" style={{width:200}} />
                            <Tab label="Edit Prices" style={{width:200}} />
                        </Tabs>
                    </AppBar>
                    {state===0 && <Prices prices={prices} /> }
                    {state===1 && <EditPrices prices={prices} /> }
                </div>
            }
        </div>
    );
}

export default Shipment;