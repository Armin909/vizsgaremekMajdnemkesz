import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RestaurantForm = () => {
  const editData = /*restaurantById()*/ null;
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
      const response = await fetch("http://localhost:3000/api/Restaurant/createRestaurant", {
        method: "POST",
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
      // optionally navigate or show success message
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
      <h2>Étterem Létrehozása</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Név:
          <input type="text" name="name" value={restaurant.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cím:
          <input type="text" name="address" value={restaurant.address} onChange={handleChange} />
        </label>
        <br />
        <label>
          Telefonszám:
          <input type="text" name="phone" value={restaurant.phone} onChange={handleChange} />
        </label>
        <br />
        <label>
          Nyitva tartás:
          <input type="text" name="openingHours" value={restaurant.openingHours} onChange={handleChange} />
        </label>
        <br />
        <label>
          Kategória:
          <input type="text" name="category" value={restaurant.category} onChange={handleChange} />
        </label>
        <br />
        <label>
          Kép:
          <input type="text" name="image" value={restaurant.image} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>Küldés</button>
      </form>
    </div>
    </>
  );
};

export default RestaurantForm;