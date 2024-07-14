import React, { useState, useEffect } from "react";
import "./SeatButton.css";
import SeatAvailable from "./SeatButtonAssests/SeatAvailable.png";
import SeatBooked from "./SeatButtonAssests/SeatBooked.png";
import SeatSelected from "./SeatButtonAssests/SeatSelected.png";
import SeatNotAvailable from "./SeatButtonAssests/WhiteRectangle.png";

interface SeatButtonProps {
  status: "booked" | "available" | "not-available" | "selected";
  onClick: (isSelected: boolean, seatNumber: number | null) => void;
  seatNumber: number | null;
  isSelected: boolean;
}

const SeatButton: React.FC<SeatButtonProps> = ({
  seatNumber,
  status,
  onClick,
  isSelected,
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    setCurrentStatus(isSelected ? "selected" : status);
  }, [isSelected, status]);

  console.log(seatNumber);
  console.log("Seat number and Current Status", seatNumber, currentStatus);

  let SeatImg;
  let SeatId;

  switch (currentStatus) {
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
    if (currentStatus === "available") {
      setCurrentStatus("selected");
      onClick(true, seatNumber); // Pass isSelected as true
    } else if (currentStatus === "selected") {
      setCurrentStatus("available");
      onClick(false, seatNumber); // Pass isSelected as false
    }
  };

  return (
    <button
      className="seatButton p-0 m-0 mt-3 border-0 bg-transparent"
      onClick={handleButtonClick}
      disabled={currentStatus === "booked" || currentStatus === "not-available"}
    >
      <div className="seatImageContainer d-flex justify-content-center align-items-center">
        {SeatImg ? (
          <img
            src={SeatImg}
            alt={currentStatus}
            className={`seatImage ${currentStatus}`}
          ></img>
        ) : (
          <div className="not-available-seat"></div>
        )}
        <span className="seatNo">{seatNumber}</span>
        {currentStatus === "booked" && <div className="hoverEffect"></div>}
      </div>
    </button>
  );
};

export default SeatButton;
