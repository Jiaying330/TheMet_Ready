import React, { useState } from 'react';
import './CartDetailPage.css'
import { useCart } from "../context/CartContext";
import useFetchArtworkDetails from '../hooks/useFetchArtworkDetails';
import CartDetailItem from '../components/CartDetailItem';
import CartSummary from '../components/CartSummary';

export default function CartDetailPage() {
    const { cartItems } = useCart();

    const { artworksByDepartment, loading, error } = useFetchArtworkDetails(cartItems);

    if (loading) {
        return (
            <div className="cart-details-page-container">
                <h1>Cart Detail</h1>
                <div>Loading...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="cart-details-page-container">
                <h1>Cart Detail</h1>
                <div>{error}</div>
            </div>
        )
    }

    return (
        <div className="cart-details-page-container">
            <h1>Cart Detail</h1>
            <div className="cart-details-page">
                <div className="cart-details-page-departments">
                    {artworksByDepartment.map(([department, artworks]) => (
                        <CartDetailItem
                            key={department}
                            department={department}
                            artworks={artworks}
                        />
                    ))}
                </div>
                <CartSummary artworksByDepartment={artworksByDepartment} />
            </div>




        </div>
    )
}