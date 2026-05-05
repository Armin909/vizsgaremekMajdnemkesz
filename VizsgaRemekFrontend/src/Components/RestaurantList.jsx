import { jwtDecode } from "jwt-decode";
import { Card } from "./Card";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserClaim";


/*import userName from "../LogIn";*/

const token = localStorage.getItem("token");
const decoded = token ? jwtDecode(token) : null;

  function RestaurantList({ restaurants }) {
    const navigation = useNavigate();
    const { userRole } = useContext(UserContext) || {};

    const jumpToNewRestaurants = () => {
      navigation("/create");
    }

    const rows = [];
    const items = restaurants || [];
    for (let i = 0; i < items.length; i += 3) {
      rows.push(items.slice(i, i + 3));
    }
    return (
      <>
        <table>
          <thead>
            <tr>
              <th><button style={{display: userRole !== "Admin" ? 'none' : 'flex'}} id="CreateRes" onClick={jumpToNewRestaurants}>Új étterem</button></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td><Card data={row[0]} buttons={[{label:"Rendelés", path:`/rendel/${row[0]?.publicId}`}, ...(userRole === "Admin" ? [{label:"Szerkesztés", path:`/editRestaurant/${row[0]?.publicId}`} ] : [])]} /></td>
                <td><Card data={row[1]} buttons={[{label:"Rendelés", path:`/rendel/${row[1]?.publicId}`}, ...(userRole === "Admin" ? [{label:"Szerkesztés", path:`/editRestaurant/${row[1]?.publicId}`} ] : [])]} /></td>
                <td><Card data={row[2]} buttons={[{label:"Rendelés", path:`/rendel/${row[2]?.publicId}`}, ...(userRole === "Admin" ? [{label:"Szerkesztés", path:`/editRestaurant/${row[2]?.publicId}`} ] : [])]} /></td>
              </tr>
            ))}
          </tbody>
      </table>
      </>
    )
}
export default RestaurantList
