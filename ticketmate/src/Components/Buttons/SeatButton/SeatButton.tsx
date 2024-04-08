import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./SeatButton.css";
import SeatAvailable from "./SeatButtonAssests/SeatAvailable.png";
import SeatBooked from "./SeatButtonAssests/SeatBooked.png";
import SeatSelected from "./SeatButtonAssests/SeatSelected.png";

interface SeatButtonProps {
  status: "booked" | "available";
  onClick: () => void;
}

const SeatButton: React.FC<SeatButtonProps> = ({ status, onClick }) => {
  const [localStatus, setLocalStatus] = useState<
    "booked" | "available" | "selected"
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
    default:
      SeatImg = SeatAvailable;
      SeatId = "Available";
  }

  const handleButtonClick = () => {
    if (localStatus === "available") {
      setLocalStatus("selected");
    }

    if (localStatus === "selected") {
      setLocalStatus("available");
    }
    onClick();
  };

  return (
    <button
      className="seatButton"
      onClick={handleButtonClick}
      disabled={localStatus === "booked"}
    >
      <div className="seatImageContainer">
        <img
          src={SeatImg}
          alt={localStatus}
          className={`seatImage ${localStatus}`}
        ></img>
        {localStatus === "booked" && <div className="hoverEffect"></div>}
      </div>
    </button>
  );
};

export default SeatButton;
