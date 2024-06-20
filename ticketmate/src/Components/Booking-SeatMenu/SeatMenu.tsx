import React from "react";
import RedSquare from "./SeatMenuAssests/RedSquare.png";
import GreenSquare from "./SeatMenuAssests/GreenSquare.png";
import YellowSquare from "./SeatMenuAssests/YellowSquare.png";

const SeatMenu = () => {
  return (
    <div className="Menu row col-lg-11 pt-3 pb-4 d-flex m-auto  ">
      <div className="col col-md-2 col-4 booked">
        <div className="col col-1 d-inline">
          <img src={RedSquare} alt="Booked" />
        </div>
        <div className="col col-2 d-inline">Booked Seats</div>
      </div>
      <div className="col col-md-2 col-4 Available">
        <div className="col d-inline">
          <img src={GreenSquare} alt="Availabe" />
        </div>
        <div className="col  d-inline">Available Seats</div>
      </div>
      <div className="col col-md-2 col-4 Selected">
        <div className="col  d-inline">
          <img src={YellowSquare} alt="Selected" />
        </div>
        <div className="col  d-inline">Selected Seats</div>
      </div>
    </div>
  );
};

export default SeatMenu;
