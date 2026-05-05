import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FoodCard } from './FoodCard';
import { useContext } from 'react';
import { UserContext } from '../UserClaim';

  

function FoodList({ foods, restaurant }) {
  const { userRole } = useContext(UserContext) || {};
    const navigation = useNavigate();
    const [rows, setRows] = useState([]);

    const ÚjÉtelek = () => {
      navigation("/foodcreate/" + restaurant);
    }
    const Vélyemények = () => {
      const reviewId = restaurant;
      navigation(`/reviews/${reviewId}`);
    }

    useEffect(() => {
      fetch(`http://localhost:3000/api/Restaurant/getRestaurant/${restaurant}`)
      .then(res => res.json())
      .then(data => {
        setRows(data.foods);
        console.log("rows:", data.foods);
        console.log("data:", data.foods);
      });
    }, [restaurant]);
    console.log("restaurant in FoodList:", restaurant);

    
    return (
      <>
      
        <table>
          <thead>
            <tr>
              <th><button disabled={userRole!=="ADMIN"} id="CreateRes" onClick={ÚjÉtelek}>Új étel  </button></th>
              <th><><button onClick={Vélyemények}>Vélyemények</button></></th>
              <th><button onClick={() => navigation(`/reviewcreate/${restaurant}`)}>Vélemény írása</button></th>
            </tr>
          </thead>
          <tbody>
            {rows && rows.map((food, index) => (
              <tr key={index}>
                <td><FoodCard food={rows[index]} restaurantId={restaurant} /></td>
                <td><FoodCard food={rows[index + 1]} restaurantId={restaurant} /></td>
                <td><FoodCard food={rows[index + 2]} restaurantId={restaurant} /></td>
              </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default FoodList
