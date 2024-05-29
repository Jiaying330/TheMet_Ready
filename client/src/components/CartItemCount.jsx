import React from 'react';
import './CartItemCount.css';

export default function CartItemCount(props) {
    return (
        <div className="cart-item-count-container">
            {props.count}
        </div>
    )
}