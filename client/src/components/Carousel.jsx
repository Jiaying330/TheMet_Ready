import React, {useState} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Carousel.css'

export default function Carousel(props) {
    return (
        <div className="carousel-container">
            {/* <img src={props.artworks[index].image}/> */}
            {/* <div> */}
               <a className="left" onClick={props.toLeft}><ArrowBackIosNewIcon/></a>
                <a className="right" onClick={props.toRight}><ArrowForwardIosIcon/></a> 
            {/* </div> */}
            
        </div>
    )
}