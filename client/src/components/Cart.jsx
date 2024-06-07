import React, { useEffect, useState } from "react";
import "./Cart.css";
import ClearIcon from "@mui/icons-material/Clear";
import CartItem from "./CartItem";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import DepartmentItem from "../components/DepartmentItem";
import useFetchArtworkDetails from "../hooks/useFetchArtworkDetails";

export default function Cart(props) {
  const { cartItems, closeCart, isOpen } = useCart();

  const { artworksByDepartment, loading, error } =
    useFetchArtworkDetails(cartItems);

  if (loading) {
    return (
      <div className="cart-details-page-container">
        <h1>Cart Detail</h1>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-details-page-container">
        <h1>Cart Detail</h1>
        <div>{error}</div>
      </div>
    );
  }

  return (
    // <div id="myCart" className="cart-page">
    <div id="myCart" className="cart-container">
      <div className="cart-items-container">
        {artworksByDepartment.map(([department, artworks]) => (
          <DepartmentItem
            key={department}
            department={department}
            artworks={artworks}
          />
        ))}
        {/* {cartItems.map(item => (
                        <CartItem key={item} objectID={item} />
                    ))} */}
      </div>
      {/* } */}
      <div className="cart-header">
        Your Cart
        <a onClick={closeCart}>
          <ClearIcon />
        </a>
      </div>
      <div className="cart-footer">
        <Link to="/cart-detail" onClick={closeCart}>
          View Detail
        </Link>
        {/* <a onClick={() => {

                    }}>View Detail</a> */}
      </div>
      {/* </div> */}
    </div>
    // </div>
  );
}
