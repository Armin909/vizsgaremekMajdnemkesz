import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserClaim";

function AddFood() {
  const [food, setFood] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const navigate = useNavigate();
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

      setFood({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
      });
      navigate(`/restaurant/${restaurantPublicId}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
    <header>
        <button onClick={() => navigate(-1)}>Back</button>
    </header>
    <div>
      <h2>Étel létrehozása</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Név:
          <input type="text" name="name" value={food.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Leírás:
          <input type="text" name="description" value={food.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Ár:
          <input type="number" name="price" value={food.price} onChange={handleChange} />
        </label>
        <br />
        <label>
          Kategória:
          <input type="text" name="category" value={food.category} onChange={handleChange} />
        </label>
        <br />
        <label>
          Kép:
          <input type="text" name="imageUrl" value={food.imageUrl} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>Küldés</button>
      </form>
    </div>
    </>
  );
}

export default AddFood;