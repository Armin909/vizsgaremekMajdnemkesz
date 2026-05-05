import { useState } from "react";


function AddFood() {
  const [food, setFood] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const addFood = async (restaurantPublicId, foodData) => {
    
  const token = localStorage.getItem("token");

  const response = await fetch(
   `http://localhost:3000/api/Foods/restaurants/${restaurantPublicId}/foods`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: foodData.name,
        description: foodData.description,
        price: parseFloat(foodData.price),
        category: foodData.category,
        imageUrl: foodData.imageUrl, 
        
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`response.status: ${response.status}`);

  }

  const data = await response.json();

  return data;
};

  const restaurantPublicId = window.location.pathname.split("/").pop();

  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
    console.log("Current food state:", food);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await addFood(restaurantPublicId, food);
      alert(result.message || "Étel sikeresen hozzáadva!");

      setFood({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Étel neve"
        value={food.name}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="text"
        name="description"
        placeholder="Leírás"
        value={food.description}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="number"
        name="price"
        placeholder="Ár"
        value={food.price}
        onChange={handleChange}
        required
      />
<br />
      <input
        type="text"
        name="category"
        placeholder="Kategória"
        value={food.category}
        onChange={handleChange}
        required
      />
<br />
      <input
        type="text"
        name="imageUrl"
        placeholder="Kép URL"
        value={food.imageUrl}
        onChange={handleChange}
        required
      />
<br />
      <button type="submit">Étel hozzáadása</button>
    </form>
  );
}

export default AddFood;