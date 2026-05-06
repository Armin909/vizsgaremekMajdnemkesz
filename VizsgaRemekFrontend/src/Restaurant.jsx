import React from 'react'
import FoodList from './Components/FoodList';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'


const Restaurant = (restaurant) => {
  const navigate = useNavigate();
  const params = useParams();
  const restaurantId = params.id;
  const [foods, setFoods] = useState([])
  const [restaurantData, setRestaurantData] = useState(null);
  const [restaurantImage, setRestaurantImage] = useState(null);
  
  console.log("useParams result:", params);
  console.log("restaurantId from params:", restaurantId);
  
  // Étterem adatainak lekérése
  useEffect(() => {
    const loadRestaurantData = async () => {
      try {
        const response = await fetch(`https://localhost:4000/api/Restaurant/allRestaurants`);
        const restaurants = await response.json();
        
        console.log("Összes étterem:", restaurants);
        console.log("Keresett étterem ID:", restaurantId);
        
        // Az étterem keresése az ID alapján
        const foundRestaurant = restaurants.find(r => r.publicId === restaurantId || r.id === restaurantId);
        
        if (foundRestaurant) {
          console.log("Talált étterem:", foundRestaurant);
          setRestaurantData(foundRestaurant);
          // Próbáljuk ki az összes lehetséges képmező-nevet
          const image = foundRestaurant.imageUrl || foundRestaurant.image || foundRestaurant.pictureUrl || foundRestaurant.photo || foundRestaurant.photoUrl;
          setRestaurantImage(image);
        } else {
          console.log("Étterem nem található");
        }
      } catch (err) {
        console.error("Hiba az étterem adatainak lekéréséhez:", err);
      }
    };

    loadRestaurantData();
  }, [restaurantId]);
  
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
        const response = await fetch(`https://localhost:4000/api/Foods?restaurantId=${restaurantId}`, {
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
      <button onClick={() => navigate(`/cart`)}>🛒</button>
      </div>
      {restaurantData && (
        <div style={{ marginBottom: '2em', textAlign: 'center' }}>
          {restaurantImage && (
            <img 
              src={restaurantImage} 
              alt={restaurantData.name}
              style={{ 
                maxWidth: '100%', 
                height: 'auto', 
                maxHeight: '300px',
                borderRadius: '8px',
                marginBottom: '1em'
              }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1504674900600-f032a568e944?auto=format&fit=crop&w=600&q=60';
              }}
            />
          )}
          <h1>{restaurantData.name}</h1>
          <p><strong>Cím:</strong> {restaurantData.address}</p>
          <p><strong>Kategória:</strong> {restaurantData.category}</p>
        </div>
      )}
      <FoodList foods={foods} restaurant={restaurantId} />
    </div>
  )
}

export default Restaurant
