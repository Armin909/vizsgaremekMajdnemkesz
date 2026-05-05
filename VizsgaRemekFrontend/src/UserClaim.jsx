import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { createContext } from "react";

export const UserContext = createContext();

const token = localStorage.getItem("token");
const decoded = token ? jwtDecode(token) : null;
console.log(decoded);

const UserClaim = ({ children }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || "");
  const [userName, setUserName] = useState(decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "");
  const [userEmail, setUserEmail] = useState(decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "");
  const [userRole, setUserRole] = useState(decoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "");
  
  // If used as a provider (has children), provide context
  if (children) {
    return (
      <UserContext.Provider value={{ userId, userName, userEmail, userRole }}>
        {children}
      </UserContext.Provider>
    );
  }
  
  // If used as a page component (no children), show user claim page
  return (
    <div>
      <h2>User Claim</h2>
      <p>Name: {userName}</p>
      <p>Email: {userEmail}</p>
      <p>Role: {userRole}</p>
      <button onClick={() => navigate(-1)}>Vissza</button>
    </div>
  );
}   
export default UserClaim;