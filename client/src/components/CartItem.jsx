import React, { useState, useEffect } from 'react';
import './CartItem.css';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartItem(props) {
    const { removeFromCart } = useCart();

    function handleOnClick() {
        removeFromCart(props.artwork.objectID);
    }

    return (
        <div className="cart-item">
            <div className="cart-item-image-container">
                <img className="cart-item-image" src={props.artwork.image} alt={props.artwork.title} rel={props.artwork.title}></img>
            </div>

            <div className="cart-item-description-container">
                <div className="cart-item-description-title">
                    <a href={props.artwork.objectURL} target="_blank"><strong>{props.artwork.title}</strong></a>
                </div>
                <div className="cart-item-description-artist">
                    Artist: {' ' + props.artwork.artist} <br/>
                    Gallery Number: {' ' + props.artwork.gallery}
                </div>
                <a onClick={handleOnClick}>
                <DeleteIcon />
                </a>
            </div>
        </div>
    )
}