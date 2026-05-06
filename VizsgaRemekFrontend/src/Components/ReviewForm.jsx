import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ReviewForm = (restaurant) => {
  const [review, setReview] = useState({
    restaurantPublicId:window.location.pathname.split("/").pop(),
    rating: '',
    comment: '',
    
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!review.comment.trim()) {
      alert("Please enter a comment");
      return;
    }
    if (!review.rating) {
      alert("Please select a rating");
      return;
    }
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token not found. Please login first.");
      return;
    }
    
    // Decode token to see user info
    try {
      const decoded = jwtDecode(token);
      console.log('Token user info:', decoded);
    } catch (e) {
      console.error('Failed to decode token:', e);
    }
    
    try {
      // Convert rating to number and prepare request body
      const requestBody = {
        restaurantPublicId: review.restaurantPublicId,
        rating: parseInt(review.rating),
        comment: review.comment
      };
      
      console.log('Submitting review:', requestBody);
      console.log('Token:', token);
      
      const response = await fetch(`https://localhost:4000/api/Review/createReview`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });
      
      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response body:', response);
      
      if (!response.ok) {
        throw new Error(responseText || `HTTP error! status: ${response.status}`);
      }
      
      setReview({
        restaurantPublicId: window.location.pathname.split("/").pop(),
        rating: '',
        comment: '',
      });
    } catch (err) {
      console.error('Error:', err);
      alert(err?.message || "Hiba történt");
    }
  };
  
  return (
    <>
    <header>
        <button onClick={() => navigate(-1)}>Back</button>
    </header>
    <div>
      <h2>ReviewForm</h2>
      <form onSubmit={handleSubmit}>
        
        <label>
          Leírás:
          <input type="text" name="comment" value={review.comment} onChange={handleChange} />
        </label>
        <br />
        <label>
          Értékelés(1-5):
          <input type="number" name="rating" min="1" max="5" value={review.rating} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>Küldés</button>
      </form>
    </div>
    </>
  );
};

export default ReviewForm;