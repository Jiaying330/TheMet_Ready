import React, {useState} from 'react';
import './DepartmentItem.css';
import CartItemCount from './CartItemCount';
import Carousel from './Carousel';

export default function DepartmentItem(props) {
    const [index, setIndex] = useState(0);
    const length = props.artworks.length;
    function toLeft() {
        if (index === 0) {
            setIndex(length - 1);
        }
        else {
            setIndex(prev => prev-1);
        }
    }

    function toRight() {
        if (index === length - 1) {
            setIndex(0);
        }
        else {
            setIndex(prev => prev+1);
        }
    }
    return (
        <div className='department-item-container'>
            <img src={props.artworks[index].image}/>
            <a>{props.department}</a>
            <CartItemCount count={props.artworks.length}/>
            <Carousel toLeft={toLeft} toRight={toRight}/>
        </div>
    )
}