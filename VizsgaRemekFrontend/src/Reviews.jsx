import React, { useEffect, useState } from 'react'
import FoodList from './Components/FoodList';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewList from './Components/ReviewList';

const Reviews = () => {
    const navigate = useNavigate();
    const { id: reviewId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                console.log('Review ID:', reviewId);
                
                const url =  `http://localhost:3000/api/Review/allReview?restaurantPubId=${reviewId}`;
                console.log('Fetching from:', url);
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`API error: ${response.status} ${response.statusText} - URL: ${url}`);
                }

                const text = await response.text();
                if (!text) {
                    console.warn('Empty response from API');
                    setReviews([]);
                    return;
                }

                const data = JSON.parse(text);
                setReviews(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [reviewId]);

  return (
    <div>
        <button onClick={() => navigate(-1)}>Vissza</button>
        {loading ? <p>Betöltés...</p> : <ReviewList reviews={reviews} reviewId={reviewId} />}
    </div>
  )
}

export default Reviews