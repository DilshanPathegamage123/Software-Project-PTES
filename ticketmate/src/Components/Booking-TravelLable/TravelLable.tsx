import React from "react";

import "./TravelLable.css";
import PassengerIcon from "./TravelLableAssests/PassengerIcon.png";
import Star from "./TravelLableAssests/RateStar.png";
import AirConditioner from "./TravelLableAssests/Air.png";

interface TravelLableProps {
  availableSeats: number;
  isAC: boolean;
  ticketPrice: number;
}

const TravelLable: React.FC<TravelLableProps> = ({
  availableSeats,
  isAC,
  ticketPrice,
}) => {
  return (
    <div className="travelLable col-12 rounded-3">
      <div className="row1 row align-items-center justify-content-center ">
        <div className="col col-6 fs-5 ps-4 pt-1 ">GreenWay Travels</div>
        {/* <div className="col col-4 m-auto pt-2 "> */}
        <div className="col col-3 justify-content-center fs-5 fw-semibold  ">
          Available Seats
        </div>
        <div className="SeatCount col col-1 justify-content-center fs-2 fw-bold">
          {availableSeats}
        </div>
        {/* </div> */}
      </div>
      <div className="row2 row ">
        <hr className="HorizontalLine m-auto "></hr>
      </div>
      <div className="row3 row p-1  justify-content-center  ">
        <div className="col col-2 d-flex align-items-center justify-content-center">
          <img className=" d-inline icon pe-1 " src={Star} alt="Rate" />
          <div className=" d-inline ">4.5</div>
        </div>
        <div className="col col-2 d-flex align-items-center justify-content-center ">
          <img
            className=" d-inline icon pe-1 "
            src={PassengerIcon}
            alt="Passenger"
          />
          <div className=" d-inline"> {availableSeats} Seats</div>
        </div>
        <div className="col col-2 d-flex align-items-center justify-content-center">
          <img
            className=" d-inline icon pe-1 "
            src={AirConditioner}
            alt="Passenger"
          />
          <div className=" d-inline"> {isAC ? "AC" : "Non AC"}</div>
        </div>
        <div className="col col-4 d-flex align-items-center justify-content-end fs-4 fw-semibold">
          LKR {ticketPrice}.00
        </div>
      </div>
    </div>
  );
};

export default TravelLable;
