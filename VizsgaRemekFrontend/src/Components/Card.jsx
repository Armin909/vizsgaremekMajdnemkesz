import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserClaim";


export const Card = ({ data, buttons = [] }) => {
  const navigate = useNavigate();
  const { userRole } = useContext(UserContext) || {};

  if (!data) {
    return null;
  }

  const response= fetch(`http://localhost:3000/api/Restaurant/allRestaurants`);

  console.log("RestaurantCard restaurant object:", data);
  console.log("RestaurantCard restaurantId:", data.publicId);
  
  const restaurantId = data.Id || data.id;
  console.log("Using restaurantId:", restaurantId);

  return (
    <div className="restaurant-card" style={{"backgroundImage": `url(${data.imageUrl})`}}>
      <div className="restaurant-info">
        <h2>{data.name}</h2>
        <p className="restaurant-address">Cím: {data.address}</p>
        <p className="restaurant-category">Kategória: {data.category}</p>
        {buttons.map((button, index) => (
          <button /*style={{display: userRole !== "ADMIN" ? 'none' : 'flex'}}*/ key={index} onClick={() => navigate(button.path)}>
            {button.label}
          </button>
        ))}
        {/* <button onClick={() => navigate(`/rendel/${data.publicId}`)}>Rendelés</button>
        <button onClick={() => navigate(`/edit/${restaurantId}`)} id="#editres">Szerkesztés</button> */}
      </div>
    </div>
  )
}
