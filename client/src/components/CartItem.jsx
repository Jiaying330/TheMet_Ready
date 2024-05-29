import React, { useState, useEffect } from 'react';
import './CartItem.css';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartItem(props) {
    const { removeFromCart } = useCart();
    const [artworkData, setArtworkData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtwork = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);
                const artwork = response.data;
                if (artwork && artwork.objectID) {
                    setArtworkData({
                        objectID: artwork.objectID,
                        image: artwork.primaryImage,
                        artist: artwork.artistDisplayName,
                        title: artwork.title,
                    });
                }
                // console.log(artwork);
            } catch (error) {
                console.error(`Failed to fetch artwork with ID ${props.objectID}: ${error}`);
            } finally {
                setLoading(false);
            }
        }
        fetchArtwork();
    }, []);

    function handleOnClick() {
        removeFromCart(props.objectID);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="cart-item">
            <div className="cart-item-image-container">
                <img className="cart-item-image" src={artworkData.image} alt={artworkData.title} rel={artworkData.title}></img>
            </div>

            <div className="cart-item-description-container">
                <div className="cart-item-description-title">
                <strong>{artworkData.title}</strong>
                </div>
                <div className="cart-item-description-artist">
                {artworkData.artist}
                </div>
                <a onClick={handleOnClick}>
                <DeleteIcon />
                </a>
            </div>
        </div>
    )
}