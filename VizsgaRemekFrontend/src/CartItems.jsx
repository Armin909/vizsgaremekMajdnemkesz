import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    
    const [quantity, setQuantity] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const[foodId, setFoodId] = useState([]);
    const value = { cartItems, setCartItems, quantity, setQuantity, foodId, setFoodId };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};