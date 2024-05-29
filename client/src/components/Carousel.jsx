import React, {useState} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Carousel.css'

export default function Carousel(props) {
    // const [index, setIndex] = useState(0);
    // function leftOnClick() {
    //     if (index === 0) {
    //         props.setIndex(props.length - 1);
    //     }
    //     else {
    //         props.setIndex(prev => prev-1);
    //     }
    // }
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