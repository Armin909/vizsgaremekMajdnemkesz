import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [imageUrl, setImageUrl] = useState(null);

  const addCart = async (e) => {
    e.preventDefault();
    const orderItem = await fetch("https://localhost:4000/api/Orders", {
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

  useEffect(() => {
    const fetchFoodImage = async () => {
      try {
        const response = await fetch(`https://localhost:4000/api/Foods?restaurantId=${restaurantId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const foods = await response.json();
        
        console.log("Lekért ételek:", foods);
        console.log("Keresett étel ID:", food.publicId);
        
        // Az étel keresése az ID alapján
        const foundFood = foods.find(f => f.publicId === food.publicId || f.id === food.publicId);
        
        if (foundFood) {
          console.log("Talált étel:", foundFood);
          // Próbáljuk ki az összes lehetséges képmező-nevet
          const image = foundFood.imageUrl || foundFood.image || foundFood.pictureUrl || foundFood.photo || foundFood.photoUrl || food.imageUrl;
          setImageUrl(image);
        } else {
          console.log("Étel nem található, az eredeti adatokat használjuk");
          setImageUrl(food.imageUrl);
        }
      } catch (err) {
        console.error("Hiba az étel képének lekéréséhez:", err);
        setImageUrl(food.imageUrl);
      }
    };

    fetchFoodImage();
  }, [food.publicId, restaurantId]);

  console.log("food in FoodCard:", CartItems);
  console.log("foodId in FoodCard:", food.publicId);
  console.log("food.imageUrl:", food.imageUrl);
  
  // Placeholder kép ha nincs imageUrl
  const finalImageUrl = imageUrl || food.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=60';
  
  return (
    <div className="food-card">
      <img 
        src={finalImageUrl} 
        alt={food.name} 
        className="food-card-image"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=60';
        }}
      />
      <div className="food-card-content">
        <h4>{food.name}</h4>
        <p className="food-description">
          {food.description}
        </p>
        <div className="food-category">
          {food.category}
        </div>
        <p className="food-price">
          {food.price} Ft
        </p>
        <button onClick={addCart}>Kosárba</button>
        <button style={{display: userRole !== "Admin" ? 'none' : 'flex'}} onClick={() => navigate(`/foodedit/${food.publicId}`)} id="#editres">Szerkesztés</button>
      </div>
    </div>
  );
};
export default FoodCard;