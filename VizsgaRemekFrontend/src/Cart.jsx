import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "./CartItems";
import { useContext } from "react";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
    const { quantity } = useContext(CartContext);
    const {foodId} = useContext(CartContext);
  const navigate = useNavigate();

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  const orderCreate=()=>{
    try {
            const response = fetch("http://localhost:3000/api/Orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify([{ "foodpublicId": `${foodId}`, "quantity": quantity }])
            });
        } catch (error) {
            console.error("Order creation error:", error);
        }


    navigate('/payment');
  }


  return (
    <div>
      <h2>Kosár</h2>
      <button disabled={cartItems.length === 0} onClick={orderCreate}>Fizetés</button>
      <button onClick={() => navigate(-1)}>Vissza</button>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.name} - {item.price.toFixed(2)}Ft <button onClick={() => removeFromCart(index)}>Remove</button></li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Cart;