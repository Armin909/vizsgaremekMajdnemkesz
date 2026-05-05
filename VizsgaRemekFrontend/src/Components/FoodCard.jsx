import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CartContext } from "../CartItems";
import { useContext } from "react";
import { UserContext } from "../UserClaim";

export const FoodCard = ({ food, restaurantId }) => {
  if (!food) {
    return null;
  }
  const { userRole } = useContext(UserContext) || {};
  const navigate = useNavigate();
  const {CartItems, setCartItems ,quantity, setQuantity, foodId, setFoodId} = useContext(CartContext);
  const addCart = async (e) => {
    e.preventDefault();
    const orderItem = await fetch("http://localhost:3000/api/Orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify([{ foodPublicId: food.publicId, quantity:1 }])
    }).then(res => res.json())
    .then(data => {
      setCartItems(prev => [...prev, { name: food.name, price: food.price }]);
      setFoodId(food.publicId);
      setQuantity(prev => prev + 1);
    })
  };
  console.log("food in FoodCard:", CartItems);
  console.log("foodId in FoodCard:", food.publicId);
  return (
    <div className="food-card" style={{ backgroundImage: `url(${food.imageUrl})` }}>
      <div className="food-info">
        <h2>{food.name}</h2>
        <p className="food-description">
          Leírás: {food.description}
        </p>
        <p className="food-category">
          Kategória: {food.category}
        </p>
        <p>
          Ár: {food.price} Ft
        </p>
        <button onClick={addCart}>Kosárba</button>
        <button style={{display: userRole !== "Admin" ? 'none' : 'flex'}} onClick={() => navigate(`/foodedit/${food.publicId}`)} id="#editres">Szerkesztés</button>
      </div>
    </div>
  );
};
export default FoodCard;