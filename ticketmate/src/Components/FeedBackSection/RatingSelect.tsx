import React from "react";
import "./Style.css";

type Props = {
  selected: number;
  select: (rating: number) => void;
};

const RatingSelect: React.FC<Props> = ({ select, selected }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Handle change called with value:", e.currentTarget.value);
    select(+e.currentTarget.value);
  };

  return (
    <ul className="rating">
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            type="radio"
            id={`num${i + 1}`}
            name="rating"
            value={(i + 1).toString()}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  );
};

export default RatingSelect;
