import React from "react";
import RedSquare from "./SeatMenuAssests/RedSquare.png";
import GreenSquare from "./SeatMenuAssests/GreenSquare.png";
import YellowSquare from "./SeatMenuAssests/YellowSquare.png";

const SeatMenu = () => {
  return (
    <div className="Menu row col-12 pt-3 pb-4 ">
      <div className="col col-8 col-md-3 col-4 booked">
        <div className="col col-1 d-inline">
          <img className="m-0 " src={RedSquare} alt="Booked" />
        </div>
        <div className="col col-2 d-inline">Booked Seats</div>
      </div>
      <div className="col col-8 col-md-3 col-4 Available">
        <div className="col d-inline">
          <img src={GreenSquare} alt="Availabe" />
        </div>
        <div className="col  d-inline">Available Seats</div>
      </div>
      <div className="col col-8 col-md-4 col-4 Selected">
        <div className="col  d-inline">
          <img src={YellowSquare} alt="Selected" />
        </div>
        <div className="col  d-inline">Selected Seats</div>
      </div>
    </div>
  );
};

export default SeatMenu;
