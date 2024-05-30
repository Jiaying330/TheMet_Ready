import React, { useState } from 'react';
import './CartSummary.css';
import CartSummaryItem from './CartSummaryItem';

export default function CartSummary(props) {
    const sortedGalleries = mapAndSortGalleries(props.artworksByDepartment);
    console.log(sortedGalleries);
    return (
        <div className='cart-summary'>
            <span>Cart Summary</span> <br />
            {Object.entries(sortedGalleries).map(([department, galleries]) => (
                <CartSummaryItem key={crypto.randomUUID()} department={department} galleries={galleries} />
            ))}
        </div>
    )
}

function mapAndSortGalleries(artworksByDepartment) {
    const departmentToGalleries = {};
    if (!artworksByDepartment) return departmentToGalleries;

    artworksByDepartment.forEach(([department, artworks]) => {
        if (!departmentToGalleries[department]) {
            departmentToGalleries[department] = {};
        }
        artworks.forEach(artwork => {
            const gallery = artwork.gallery || "Unknown";  
            if (!departmentToGalleries[department][gallery]) {
                departmentToGalleries[department][gallery] = 0;
            }
            departmentToGalleries[department][gallery] += 1;
        });
    });

    const sortedDepartmentToGalleries = {};
    Object.keys(departmentToGalleries).forEach(department => {
        const galleries = departmentToGalleries[department];
        const sortedGalleries = Object.entries(galleries).sort((a, b) => b[1] - a[1]);
        sortedDepartmentToGalleries[department] = sortedGalleries;
    });

    return sortedDepartmentToGalleries;
}