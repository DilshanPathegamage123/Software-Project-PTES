import React, { useState } from "react";

import "./SeatButton.css";
import SeatAvailable from "./SeatButtonAssests/SeatAvailable.png";
import SeatBooked from "./SeatButtonAssests/SeatBooked.png";
import SeatSelected from "./SeatButtonAssests/SeatSelected.png";
import SeatNotAvailable from "./SeatButtonAssests/WhiteRectangle.png";

interface SeatButtonProps {
  status: "booked" | "available" | "not-available";
  onClick: (isSelected: boolean) => void;
  seatNumber: number | null;
}
const SeatButton: React.FC<SeatButtonProps> = ({
  seatNumber,
  status,
  onClick,
}) => {
  const [localStatus, setLocalStatus] = useState<
    "booked" | "available" | "selected" | "not-available"
  >(status);

  let SeatImg;
  let SeatId;

  switch (localStatus) {
    case "booked":
      SeatImg = SeatBooked;
      SeatId = "Booked";
      break;
    case "available":
      SeatImg = SeatAvailable;
      SeatId = "Available";
      break;
    case "selected":
      SeatImg = SeatSelected;
      SeatId = "Selected";
      break;
    case "not-available":
      SeatImg = SeatNotAvailable;
      SeatId = "Not Available";
      break;
    default:
      SeatImg = SeatAvailable;
      SeatId = "Available";
  }

  const handleButtonClick = () => {
    if (localStatus === "available") {
      setLocalStatus("selected");
      onClick(true); // Pass isSelected as true
    } else if (localStatus === "selected") {
      setLocalStatus("available");
      onClick(false); // Pass isSelected as false
    }
  };

  return (
    <button
      className="seatButton p-0 m-0 border-0"
      onClick={handleButtonClick}
      disabled={localStatus === "booked" || localStatus === "not-available"}
    >
      <div className="seatImageContainer d-flex justify-content-center align-items-center">
        {SeatImg ? (
          <img
            src={SeatImg}
            alt={localStatus}
            className={`seatImage ${localStatus}`}
          ></img>
        ) : (
          <div className="not-available-seat"></div>
        )}
        <span className="seatNo">{seatNumber}</span>
        {localStatus === "booked" && <div className="hoverEffect"></div>}
      </div>
    </button>
  );
};

export default SeatButton;
