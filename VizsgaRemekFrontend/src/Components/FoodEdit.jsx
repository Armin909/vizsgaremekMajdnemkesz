import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserClaim";
import { useEffect } from "react";

const useFoodById = (id) => {
  const [food, setFood] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
        console.log("Fetching food with ID:", id);
      try {
        const response = await fetch(`http://localhost:3000/api/Foods/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (!response.ok) {
          throw new Error("Étel nem található");
        }
        const data = await response.json();
        setFood(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
        alert(err.message);
        
      }
    };

    fetchFood();
  }, [id, navigate]);

  return food;
};


function FoodEdit() {
    const { id } = useParams();
    console.log("Received ID in FoodEdit:", id);
    const editData = useFoodById(id);
      console.log("Fetched food data:", editData);
      const initial = {
        name: editData?.name || "",
        description: editData?.description || "",
        price: editData?.price || "",
        category: editData?.category || "",
        imageUrl: editData?.imageUrl || ""
      };
      const navigate = useNavigate();
    
      const [food, setFood] = useState(initial);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFood(prev => ({ ...prev, [name]: value }));
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/Foods/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
         },
        body: JSON.stringify(food)
      });
      if (!response.ok) {
        const error = await response.text();
        console.log("Fetch failed:", response.status);
        throw new Error(error);
      }
      setFood(initial);
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
    <h2>Étel Szerkesztése</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Név:
          <input type="text" name="name" placeholder={initial.name} value={food.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Leírás:
          <input type="text" name="description" placeholder={initial.description} value={food.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Ár:
          <input type="number" name="price" placeholder={initial.price} value={food.price} onChange={handleChange} />
        </label>
        <br />
        <label>
          Kategória:
          <input type="text" name="category" placeholder={initial.category} value={food.category} onChange={handleChange} />
        </label>
        <br />
        <label>
          Kép:
          <input type="text" name="imageUrl" placeholder={initial.imageUrl} value={food.imageUrl} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>Küldés</button>
      </form>
    </div>
    </>
  );
}

export default FoodEdit;