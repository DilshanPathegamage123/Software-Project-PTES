import React from "react";

import "./TravelLable.css";
import PassengerIcon from "./TravelLableAssests/PassengerIcon.png";
import Star from "./TravelLableAssests/RateStar.png";
import AirConditioner from "./TravelLableAssests/Air.png";

interface TravelLableProps {
  availableSeats: number;
  totalSeats: number;
  isAC: boolean;
  ticketPrice: number;
  rate: number | null;
  vehicleName: string;
}

const TravelLable: React.FC<TravelLableProps> = ({
  availableSeats,
  totalSeats,
  isAC,
  ticketPrice,
  rate,
  vehicleName,
}) => {
  return (
    <div className="travelLable col-12 rounded-3">
      <div className="row1 row align-items-center justify-content-center h-auto pt-5 pb-5">
        <div className="col col-lg-6 fs-5 fw-semibold ps-4 pt-1">
          {vehicleName || "GreenWay Travels"}
        </div>

        <div className="col col-lg-3 col-sm-8 justify-content-center fs-5 fw-semibold d-inline">
          Available Seats
        </div>
        <div className="SeatCount col col-lg-1 col-sm-3 justify-content-center fs-2 fw-bold d-inline">
          {availableSeats}
        </div>
      </div>
      <div className="row2 row h-auto">
        <hr className="HorizontalLine m-auto "></hr>
      </div>
      <div className="row3 row p-1  justify-content-center h-auto pt-4 pb-4">
        <div className="col col-lg-12 d-flex align-items-center justify-content-center p-0 m-0">
          <div className="col col-2 d-flex align-items-center justify-content-center">
            <img className=" d-inline icon pe-1 " src={Star} alt="Rate" />
            <div className=" d-inline ">{rate ? rate.toFixed(1) : "N/A"}</div>
          </div>
          <div className="col col-2 d-flex align-items-center justify-content-center ">
            <img
              className=" d-inline icon pe-1 "
              src={PassengerIcon}
              alt="Passenger"
            />
            <div className=" d-inline"> {totalSeats} Seats</div>
          </div>
          <div className="col col-2 d-flex align-items-center justify-content-center">
            <img
              className=" d-inline icon pe-1 "
              src={AirConditioner}
              alt="Passenger"
            />
            <div className=" d-inline"> {isAC ? "AC" : "Non AC"}</div>
          </div>
          <div className="col col-lg-5 d-flex align-items-center justify-content-end fs-4 fw-semibold">
            LKR {ticketPrice}.00
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelLable;
