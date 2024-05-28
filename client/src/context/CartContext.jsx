import React, {useContext, createContext, ReactNode, useState} from 'react';
import Cart from '../components/Cart';
import { useLocalStorage } from "../hooks/UseLocalStorage"

const CartContext = createContext({});

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage("cart", [])
    function openCart() {
        document.getElementById("myCart").style.display="flex";
        setIsOpen(true);
    }
    function closeCart() {
        document.getElementById("myCart").style.display="none";
        setIsOpen(false);
    }

    function addToCart(id) {
        setCartItems(currItems => {
            if (! currItems.includes(id)) {
                return [...currItems, id];
            }
            else {return currItems;}
        });
    }
    function removeFromCart(id) {
        setCartItems(currItems => {
            return currItems.filter(item => item !== id);
        });
    }

    return (
        <CartContext.Provider
          value={{
            addToCart,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
          }}
        >
          {children}
          <Cart isOpen={isOpen}/>
        </CartContext.Provider>
      );
}