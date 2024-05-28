import React from 'react';
import './Cart.css';
import ClearIcon from '@mui/icons-material/Clear';
import CartItem from "./CartItem";
import { useCart } from "../context/CartContext"

export default function Cart(props) {
    const { cartItems, closeCart, isOpen } = useCart();
    return (
        // <div id="myCart" className="cart-page">
            <div id="myCart"  className="cart-container">
                <div className="cart-header">
                    Your Cart
                    <a onClick={closeCart}><ClearIcon /></a>
                </div>
                {/* {isOpen &&  */}
                <div className="cart-items-container">
                    {cartItems.map(item => (
                        <CartItem key={item} objectID={item} />
                    ))}
                </div>
                {/* } */}
                <div className="cart-footer">
                    <a onClick={() => {

                    }}>View Detail</a>
                </div>
                {/* </div> */}
            </div>
        // </div>

    )
}