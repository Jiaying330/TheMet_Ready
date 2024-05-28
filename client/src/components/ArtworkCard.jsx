import React, { useState, useRef, useEffect } from 'react';
import "./ArtworkCard.css"
import {useCart} from '../context/CartContext';

export default function ArtworkCard(props) {
    const {objectID, image, title, artist } = props.artwork;

    const {addToCart} = useCart();

    return (
        <div className="artwork-card">
            <div className="image-container">
                <img className="artwork-image" src={image} alt={title} rel={title}/>
            </div>
            <div className="description-container">
                <div className="description-title">
                    {title}
                </div>
                <div className="description-artist">
                    {artist}
                </div>
            </div>
            <button onClick={() => addToCart(objectID)}>Add to cart</button>
        </div>
    )
}