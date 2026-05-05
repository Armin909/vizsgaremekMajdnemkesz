import React from 'react'

const ReviewList = ({ reviews = [], reviewId }) => {
  return (
    <div>
      {reviews.map(review => (
        <div key={review.id}>
          <h3>{review.userName}</h3>
          <p>Rating: {review.rating} / 5</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  )
}

export default ReviewList