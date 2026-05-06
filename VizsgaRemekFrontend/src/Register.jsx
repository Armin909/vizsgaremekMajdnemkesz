import React,{ useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

    
const Register = () => {
    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, username, email, phone, password })
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      alert("Registration successful");
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.message || "Hiba történt");
    }
  };
 


  return (
    <>
    <button onClick={() => navigate(-1)}>Vissza</button>
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>

        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>

        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
    </>
  )
}

export default Register