import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserClaim";


export const Card = ({ data, buttons = [] }) => {
  const navigate = useNavigate();
  const { userRole } = useContext(UserContext) || {};
  const [imageUrl, setImageUrl] = useState(null);

  if (!data) {
    return null;
  }

  useEffect(() => {
    const fetchRestaurantImage = async () => {
      try {
        const response = await fetch(`https://localhost:4000/api/Restaurant/allRestaurants`);
        const restaurants = await response.json();
        
        console.log("Összes étterem:", restaurants);
        console.log("Keresett étterem ID:", data.publicId);
        
        // Az étterem keresése az ID alapján
        const foundRestaurant = restaurants.find(r => r.publicId === data.publicId || r.id === data.publicId);
        
        if (foundRestaurant) {
          console.log("Talált étterem:", foundRestaurant);
          // Próbáljuk ki az összes lehetséges képmező-nevet
          const image = foundRestaurant.imageUrl || foundRestaurant.image || foundRestaurant.pictureUrl || foundRestaurant.photo || foundRestaurant.photoUrl || data.imageUrl;
          setImageUrl(image);
        } else {
          console.log("Étterem nem található, az eredeti adatokat használjuk");
          setImageUrl(data.imageUrl);
        }
      } catch (err) {
        console.error("Hiba az étterem képének lekéréséhez:", err);
        setImageUrl(data.imageUrl);
      }
    };

    fetchRestaurantImage();
  }, [data.publicId]);

  console.log("RestaurantCard restaurant object:", data);
  console.log("RestaurantCard restaurantId:", data.publicId);
  
  const restaurantId = data.Id || data.id;
  console.log("Using restaurantId:", restaurantId);

  // Placeholder kép ha nincs imageUrl
  const finalImageUrl = imageUrl || data.imageUrl || 'https://images.unsplash.com/photo-1504674900600-f032a568e944?auto=format&fit=crop&w=400&q=60';

  return (
    <div className="restaurant-card">
      <img 
        src={finalImageUrl} 
        alt={data.name} 
        className="restaurant-card-image"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1504674900600-f032a568e944?auto=format&fit=crop&w=400&q=60';
        }}
      />
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

