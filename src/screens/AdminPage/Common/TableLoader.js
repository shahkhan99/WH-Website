import React from 'react'
import { ClipLoader } from 'react-spinners';


export default function Loader() {
    return (
        <div style={{height:'100%', backgroundColor: 'rgba(255,255,255, 0.7)'}}>
            <div style={{position:'relative', top:'50%', textAlign:'center', transform:'translate(0, -50%)'}}>
                <ClipLoader
                    sizeUnit={"px"}
                    size={50}
                    color='#2e3344'
                    loading={true}
                    />
            </div>
        </div>
    )
}
