import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import './CartDetailItem.css';
import CartItemCount from './CartItemCount';
 
export default function CartDetailItem(props) {
    const {department, artworks} = props;
    const [isOpen, setIsOpen] = useState(false);

    function departmentOnClick() {
        setIsOpen(prev => !prev);
    }

    return (
        <div className='cart-detail-item'>
            <div className='cart-detail-item-department'>
                <div onClick={departmentOnClick}>
                   {department}
                <CartItemCount count={artworks.length}/> 
                </div>
                
            </div>
            {isOpen && (<div className='cart-detail-item-artworks'>
                {artworks.map((artwork) => (
                    <CartItem key={artwork.objectID} artwork={artwork}/>
                ))}
            </div>)}
        </div>
    )
}