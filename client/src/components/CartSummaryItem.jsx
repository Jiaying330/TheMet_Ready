import React, { useState } from 'react';
import './CartSummaryItem.css';

export default function CartSummaryItem(props) {
    return (
        <div className='cart-summary-item'>
            <span>{props.department}</span>
            <ul>
                {props.galleries.map(gallery => (
                    <li>Gallery {' ' + gallery[0] + ' x ' + gallery[1]}</li>
                ))}
            </ul>
        </div>
    )
}