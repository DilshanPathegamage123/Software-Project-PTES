import React, { useState } from "react";

type RatingProps = {
  initialRating: number;
};

const Rating: React.FC<RatingProps> = ({ initialRating }) => {
  const stars = [1, 2, 3, 4, 5];
  const rating = initialRating;

  return (
    <div>
      {stars.map((star, index) => (
        <span
          key={index}
          style={{ color: star <= rating ? "gold" : "gray" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default function UserReview() {
  // Replace 3 with the rating given by the customer
  return (
    <div className="App">
      <Rating initialRating={3} />
    </div>
  );
}