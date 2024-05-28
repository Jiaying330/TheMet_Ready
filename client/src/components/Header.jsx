import React from 'react';
import "./Header.css";
import { NavLink } from 'react-router-dom';
import { useCart } from "../context/CartContext"

export default function Header () {
    const {openCart} = useCart();
    return (
        <header>
            <div class="nav-container">
                <div class="title">
                    THE <br/>
                    MET_READY
                </div>
                <div class="right-nav-container">
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/">Search</NavLink>
                    <NavLink onClick={openCart}>Cart</NavLink>
                    <NavLink to="/LogIn">Log in</NavLink>
                </div>
            </div>
        </header>
    )
}