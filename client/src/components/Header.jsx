import React from 'react';
import "./Header.css";
import { NavLink } from 'react-router-dom';

export default function Header () {
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
                    <NavLink to="/cart">Cart</NavLink>
                    <NavLink to="/LogIn">Log in</NavLink>
                </div>
            </div>
        </header>
    )
}