import React from 'react'
import FoodList from './Components/FoodList';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'


const Restaurant = (restaurant) => {
  const navigate = useNavigate();
  const params = useParams();
  const restaurantId = params.id;
  const [foods, setFoods] = useState([])
  
  console.log("useParams result:", params);
  console.log("restaurantId from params:", restaurantId);
  
  useEffect(() => {
    const loadFoods = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("Nincs token - légy bejelentkezve!");
        navigate("/home");
        return;
      }

      console.log("restaurantId in useEffect:", restaurantId);

      try {
        const response = await fetch(`http://localhost:3000/api/Foods?restaurantId=${restaurantId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`);
        }
        const data = await response.json();
        console.log("Betöltött ételek:", data);
        setFoods(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Étel betöltési hiba:", err);
        setFoods([]);
      }
    };

    loadFoods();
  }, [restaurantId, navigate]);
  restaurantId.toString();  
  return (
    <div>
      <div>
      <button onClick={() => navigate(-1)}>Vissza</button>
      <button onClick={() => navigate(`/cart`)}>Kosár</button>
      </div>
      <FoodList foods={foods} restaurant={restaurantId} />
    </div>
  )
}

export default Restaurant
