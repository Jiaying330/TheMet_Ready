import React, { useEffect, useState } from 'react';
import './CartDetailPage.css'
import { useCart } from "../context/CartContext";
import DepartmentItem from '../components/DepartmentItem';
import axios from 'axios';

export default function CartDetailPage() {
    const { cartItems } = useCart();
    const [artworksByDepartment, setArtworksByDepartment] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function runEffect() {
            setLoading(true);
            try {
                const requests = cartItems.map(id =>
                    axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
                );
                const responses = await Promise.all(requests);

                let artworksDetails = responses.reduce((acc, response) => {
                    const artwork = response.data;
                    const detail = {
                        objectID: artwork.objectID,
                        // isHighlight: artwork.isHighlight,
                        image: artwork.primaryImage,
                        // imageSmall: artwork.primaryImageSmall,
                        gallery: artwork.GalleryNumber,
                        department: artwork.department,
                        artist: artwork.artistDisplayName,
                        title: artwork.title,
                    };

                    // Group artworks by department
                    if (acc[artwork.department]) {
                        acc[artwork.department].push(detail);
                    } else {
                        acc[artwork.department] = [detail];
                    }

                    return acc;
                }, {});
                const sorted = Object.entries(artworksDetails).sort((a, b) => b[1].length - a[1].length);
                setArtworksByDepartment(sorted);
                console.log(sorted);
            } catch (error) {
                console.error('Failed to fetch artwork details:', error);
            } finally {
                setLoading(false);
            }
        }
        runEffect();
    }, [cartItems]);

    if (loading) {
        return  (
        <div className="cart-details-page-container">
            <h1>Cart Detail</h1>
            <div>Loading...</div>
        </div>
        )
    }

    return (
        <div className="cart-details-page-container">
            <h1>Cart Detail</h1>
            <div className="cart-details-page-departments">
                {artworksByDepartment.map(([department, artworks]) => (
                <DepartmentItem 
                    key={department}
                    department={department} 
                    artworks={artworks} 
                />
            ))}
            </div>

        </div>
    )
}