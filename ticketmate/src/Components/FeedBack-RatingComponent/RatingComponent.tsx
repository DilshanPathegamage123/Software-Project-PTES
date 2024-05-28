import React, { useState } from "react";

type RatingProps = {
  onRate: (rate: number) => void;
};

const Rating: React.FC<RatingProps> = ({ onRate }) => {
  const [rating, setRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  const handleRating = (rate: number) => {
    setRating(rate);
    onRate(rate);
  };

  return (
    <div>
      {stars.map((star, index) => (
        <span
          key={index}
          onClick={() => handleRating(star)}
          style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default function RatingComponent() {
  const handleRating = (rate: number) => {
    console.log("Rated with", rate);
  };

  return (
    <div className="App">
      <Rating onRate={handleRating} />
    </div>
  );
}
