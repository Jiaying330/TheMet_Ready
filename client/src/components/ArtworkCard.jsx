import React, { useState, useRef, useEffect } from 'react';
import "./ArtworkCard.css"

export default function ArtworkCard(props) {
    const image = props.artwork.image;
    const title = props.artwork.title;
    const artist = props.artwork.artist;
    // console.log(props)
    // console.log(image + " " + title + " " + artist) 
    return (
        <div class="artwork-card">
            <div class="image-container">
                <img class="artwork-image" src={image} rel={title}/>
            </div>
            <div class="description-container">
                <div class="description-title">
                    {title}
                </div>
                <div class="description-artist">
                    {artist}
                </div>
            </div>
        </div>
    )
}