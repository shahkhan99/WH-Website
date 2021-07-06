import React, { useState, useRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Slider, Typography, Button } from '@material-ui/core';
import AvatarEditor from 'react-avatar-editor';
import addImage from '../assets/Icons/addImage.png';

const useStyles = makeStyles(theme => ({
    editorWrapper: {
        transform: 'matrix(0.35,0,0,0.35,-145,-190)',
        width: 450,
        height: 600
    },
    sliderWrapper: {
        margin: '0px 0px 0px 15px',
        width: 250
    },
    heading: {
        fontSize: 20,
        fontWeight: 600
    },
    addImageWrapper: {
        marginTop:5,
        cursor:'pointer',
        border: '1px solid #c4c4c4',
        borderRadius: '5px',
        padding: 30,
        textAlign:'center',
        width: 'max-content'
    },
    text: {
        fontSize:15
    }
}));

const PrettoSlider = withStyles({
    root: {
        color: '#702fa3',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


const ImageEditor = ({src, AddImageToProduct, setEditorRef}) => {
    const [image, setImage] = useState(src || null);
    const openFile = useRef(null);
    const [zoom, setZoom] = useState(50);


    let canvas = { width:1080, height:1080, border:100 };

    const setRef = editor => {
        setEditorRef(editor);
    }

    const classes = useStyles();
    return (
        <div>
            {image 
            ?
                <Grid container direction='row' xs={12} style={{height:470, overflow:'hidden'}}>
                    <Grid item className={classes.editorWrapper}>
                        <AvatarEditor
                            ref={setRef}
                            image={image}
                            width={canvas.width}
                            height={canvas.height}
                            border={canvas.border}
                            color={[0, 0, 0, 0.6]}
                            scale={zoom/50}
                            rotate={0}
                        />
                    </Grid>
                    <Grid container direction='column' className={classes.sliderWrapper}>
                        <Typography className={classes.heading}>Zoom</Typography>
                        <PrettoSlider valueLabelDisplay="off" defaultValue={zoom} getAriaValueText={(v,i) => { return `${v-49}` }} onChange={(e,v) => setZoom(v)} />
                        <br/>
                        <Button variant='contained' onClick={AddImageToProduct} color='primary'>Add Image to Product</Button>
                        <div style={{height:10}}/>
                        <Button variant='outlined' onClick={e => openFile.current.click()} color='primary'>Choose different Image</Button>
                        <input type='file' style={{display:'none'}} onChange={e => setImage(e.target.files[0])} ref={openFile}/>
                    </Grid>
                </Grid>
            :
                <div onClick={e => openFile.current.click()} className={classes.addImageWrapper}>
                    <img src={addImage} width={50} />
                    <Typography className={classes.text}>Select Image</Typography>
                    <input type='file' style={{display:'none'}} onChange={e => setImage(e.target.files[0])} ref={openFile}/>
                </div>
            }
        </div>
    )
}

export default ImageEditor;