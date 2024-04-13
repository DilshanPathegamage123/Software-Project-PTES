import React from "react";

import "./TravelLable.css";
import PassengerIcon from "./TravelLableAssests/PassengerIcon.png";
import Star from "./TravelLableAssests/RateStar.png";

const TravelLable = () => {
  return (
    <div className="travelLable col-12 rounded-3">
      <div className="row1 row">
        <div className="col col-8 fs-5 ps-4 pt-1 ">GreenWay Travels</div>
        <div className="col col-4 m-auto pt-2 ">
          <div className="row   justify-content-center ">Available Seats</div>
          <div className="SeatCount row  justify-content-center fs-3 fw-semibold">
            25
          </div>
        </div>
      </div>
      <div className="row2 row ">
        <hr className="HorizontalLine m-auto "></hr>
      </div>
      <div className="row3 row p-1 ">
        <div className="col col-4 d-flex align-items-center justify-content-center">
          <img className=" d-inline icon pe-1 " src={Star} alt="Rate" />
          <div className=" d-inline ">4.5</div>
        </div>
        <div className="col col-4 d-flex align-items-center justify-content-center ">
          <img
            className=" d-inline icon pe-1 "
            src={PassengerIcon}
            alt="Passenger"
          />
          <div className=" d-inline"> 54 Seats</div>
        </div>
        <div className="col col-4 d-flex align-items-center justify-content-center fs-5 fw-semibold">
          {" "}
          LKR 2255.00{" "}
        </div>
      </div>
    </div>
  );
};

export default TravelLable;
