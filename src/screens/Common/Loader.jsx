import React from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
}

const Spinner = ({height, width}) => {
    return (
        <div style={style}>
            <Loader
                visible={true}
                type="TailSpin"
                color="#de9631"
                height={height || 100}
                width={width || 100}
            />
        </div>
    )
}

export default Spinner;
