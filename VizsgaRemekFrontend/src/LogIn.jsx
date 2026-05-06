import React, { use, useState } from 'react'
import { useNavigate } from 'react-router-dom';

/*const userName=() => {
  const nev=JSON.stringify(LogIn.username);
  return nev;
}*/
const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:4000/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, username })
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || `Login failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem("token", data.token);
        /*
           a contextbe rakj be egy user objektumot
           {
           name, email, publicId, role
         }
          
         */
        console.log("Token mentve:", data.token);
      } else {
        throw new Error("Nincs token a válaszban");
      }
      
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert(err.message || "Hiba történt");
    }
  };

  return (
    <div>
      <h2>KajaHaza</h2>
      <h3>Üdvozöljük!</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>

        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
      <button onClick={() => navigate('/register')}>Register</button>
    </div>
  )
}
export default LogIn;