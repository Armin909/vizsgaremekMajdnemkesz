import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantList from "./Components/RestaurantList";
import { loadData } from "./loadData";


function App() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  addEventListener("storage", (onload) => {
    windiw.location.reload();
  }) 

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await loadData(
          "http://localhost:3000/api/Restaurant/allRestaurant",
        );
        setRestaurants(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  const LogOut=() => {
    localStorage.removeItem("token");
    navigate(`/`);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const data = loadData(`http://localhost:3000/api/Auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
  }, []);

  if (loading) {
    return <div>Loading restaurants...</div>;
  }

  return (
    <>
      <header>
        <h1>🍽️ FoodOrder</h1>
        <div>
          <button onClick={() => navigate(`/userclaim`)}>User Claim</button>
          <button onClick={() => navigate(`/cart`)}>Kosár</button>
          <button onClick={LogOut}>Kijelentkezés</button>
        </div>
      </header>
      <main>
        <RestaurantList restaurants={restaurants} />
      </main>
    </>
  );
}

export default App;
