import React from 'react';
import "./Header.css";

export default function Header () {
    return (
        <header>
            <div class="nav-container">
                <div class="title">
                    THE <br/>
                    MET_READY
                </div>
                <div class="right-nav-container">
                    <a>About</a>
                    <a>Search</a>
                    <a>Cart</a>
                    <a>Log in</a>
                </div>
            </div>
        </header>
    )
}