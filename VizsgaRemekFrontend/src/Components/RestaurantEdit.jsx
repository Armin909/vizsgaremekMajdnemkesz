import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const restaurantById = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const id = window.location.pathname.split("/").pop();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`https://localhost:4000/api/Restaurant/GetRestaurant/${id}`);
        if (!response.ok) {
          throw new Error("Étterem nem található");
          console.error("Fetch failed:", response.status);
        }
        const data = await response.json();
        setRestaurant(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
        alert(err.message);
        
      }
    };

    fetchRestaurant();
  }, [id, navigate]);

  return restaurant;
};

const RestaurantEdit = (restaurantId) => {
  const editData = restaurantById();
  console.log("Fetched restaurant data:", editData);
  const initial = {
    name: editData?.name || "",
    address: editData?.address || "",
    phone: editData?.phone || "",
    openingHours: editData?.openingHours || "",
    category: editData?.category || "",
    restaurantImageUrl: editData?.image || ""
  };
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:4000/api/Restaurant/updateRestaurant/${restaurantId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
         },
        body: JSON.stringify(restaurant)
      });
      if (!response.ok) {
        const error = await response.text();
        console.log("Fetch failed:", response.status);
        throw new Error(error);
      }
      setRestaurant(initial);
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert(err.message || "Hiba történt");
    }
  };
  
  return (
    <>
    <header>
        <button onClick={() => navigate(-1)}>Back</button>
    </header>
    <div>
      <h2>Étterem Szerkesztése</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Név:
          <input type="text" name="name" placeholder={initial.name} value={restaurant.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cím:
          <input type="text" name="address" placeholder={initial.address} value={restaurant.address} onChange={handleChange} />
        </label>
        <br />
        <label>
          Telefonszám:
          <input type="text" name="phone" placeholder={initial.phone} value={restaurant.phone} onChange={handleChange} />
        </label>
        <br />
        <label>
          Nyitva tartás:
          <input type="text" name="openingHours" placeholder={initial.openingHours} value={restaurant.openingHours} onChange={handleChange} />
        </label>
        <br />
        <label>
          Kategória:
          <input type="text" name="category" placeholder={initial.category} value={restaurant.category} onChange={handleChange} />
        </label>
        <br />
        <label>
          Kép:
          <input type="text" name="image" placeholder={initial.image} value={restaurant.image} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>Küldés</button>
      </form>
    </div>
    </>
  );
};

export default RestaurantEdit;