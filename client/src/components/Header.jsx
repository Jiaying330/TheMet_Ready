import React from 'react';
import "./Header.css";
import { NavLink } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import CartItemCount from './CartItemCount';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

export default function Header() {
    const { openCart, cartItems } = useCart();
    return (
        <header>
            <div className="nav-container">
                <div className="title">
                    THE <br />
                    MET_READY
                </div>
                <div className="right-nav-container">
                    {/* <NavLink to="/about">About</NavLink> */}
                    <NavLink to="/">Search</NavLink>
                    <div className="cart">
                        <NavLink onClick={openCart}>
                            <div>
                               <ShoppingBasketOutlinedIcon/> 
                            </div>
                            
                            </NavLink>
                        {(cartItems && cartItems.length > 0) && <CartItemCount count={cartItems.length} />}
                    </div>

                    <NavLink to="/cart-detail">Cart Details</NavLink>
                </div>
            </div>
        </header>
    )
}