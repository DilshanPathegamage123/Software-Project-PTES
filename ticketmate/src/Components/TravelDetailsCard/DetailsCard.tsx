import React, { useContext } from "react";
import Bus1 from "./TravelDetailsCardAssests/bus1.png";
import train1 from "./TravelDetailsCardAssests/train1.png";
import "./DetailsCard.css";
import { SearchResult } from "../../SearchResult";
import SelectedVehicleTypeContext from "../../SelectedVehicleTypeContext";


const DetailsCard: React.FC<SearchResult> = ({
  busNo,
  routNo,
  startLocation,
  endLocation,
  departureTime,
  arrivalTime,
  comfortability,
  duration,
  ticketPrice,
  selectedBusStands,
  scheduledBusDatesList,

}) => {
  const { selectedVehicleType } = useContext(SelectedVehicleTypeContext);
  console.log(selectedVehicleType);
  // Check if there are any scheduled bus dates
  if (scheduledBusDatesList.$values.length > 0) {
    // Get the first scheduled bus date
    const firstScheduledBusDate = scheduledBusDatesList.$values[0];

    // Now you can access the departureDate and arrivalDate properties
    const departureDate = firstScheduledBusDate.departureDate;
    const arrivalDate = firstScheduledBusDate.arrivalDate;

    return (
      <div className=" DetailsCard row col-lg-11 col-11 rounded-3 justify-content-center font-family-Poppins mt-2 mb-2 h-auto w-100  ">
        {/* column 1 */}
        <div className="col col-lg-3 col-md-10 col-12  p-0 d-flex   ">
          <div className="col ms-xl-0 ms-5 mt-xl-5 mt-3    ps-0  ">
            <img
              src={selectedVehicleType === "Bus" ? Bus1 : train1}
              alt="VehicleIcon"
              className="VehicleImg align-content-center d-flex "
            />
          </div>
          <div className="col  ms-xxl-5 ps-0 m-auto d-lg-grid d-sm-flex d-flex  ">
            <div className=" d-grid mb-2  ">
              <p className="fw-normal m-auto px-3  align-content-center ">
                Reg No
              </p>

              <p className=" fw-bolder  m-auto px-3 align-content-center">
                {busNo}
              </p>
            </div>

            <div className=" d-grid mb-2 ">
              <p className="fw-normal m-auto px-3  align-content-center ">
                Root No
              </p>

              <p className=" fw-bolder  m-auto px-3 align-content-center">
                {routNo}
              </p>
            </div>

            <div className=" d-grid mb-2">
              <p className="fw-normal m-auto px-3 align-content-center">
                Type{" "}
              </p>

              <p className="fw-bolder m-auto px-3 align-content-center ">
                {comfortability}
              </p>
            </div>
          </div>
        </div>

        {/* column 2 */}

        <div className="col col-lg-4 col-md-10 col-12  p-0 d-flex  ">
          <div className=" col d-md-flex d-lg-block m-auto ">
            <div className=" d-grid mb-2 ">
              <p className="fw-normal m-auto  px-3 align-content-center  ">
                Depature
              </p>
              <p className="fw-bolder m-auto px-3 align-content-center">
                {/* Colombo */}
                {startLocation}
              </p>
            </div>
            <div className=" d-grid mb-2">
              <p className="fw-normal m-auto px-3 align-content-center ">
                Date
              </p>
              <p className="fw-bolder m-auto  px-3 align-content-center">
                {/* 2023-05-12 */}
                {departureDate}
              </p>
            </div>
            <div className=" d-grid mb-2">
              <p className="fw-normal m-auto px-3 align-content-center">Time</p>
              <p className="fw-bolder m-auto px-3 align-content-center">
                {departureTime}
              </p>
            </div>
          </div>
          <div className=" col col-2 m-auto ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="71"
              viewBox="0 0 25 71"
              fill="none"
              className="Arrow align-content-center m-auto d-flex "
            >
              <path d="M3 2L22 37.6301L3 69" stroke="Black" stroke-width="5" />
            </svg>
          </div>
          <div className="col d-md-flex d-lg-block m-auto ">
            <div className=" d-grid mb-2 ">
              <p className="fw-normal m-auto  px-3 ">Arrival</p>
              <p className="fw-bolder m-auto  px-3 ">
                {/* Jaffna */}
                {endLocation}
              </p>
            </div>
            <div className=" d-grid mb-2 ">
              <p className="fw-normal m-auto  px-3 ">Date</p>
              <p className="fw-bolder m-auto  px-3 ">{arrivalDate}</p>
            </div>
            <div className=" d-grid mb-2">
              <p className="fw-normal m-auto  px-3 ">Time</p>
              <p className="fw-bolder m-auto  px-3">
                {/* 02 : 45 am */}
                {arrivalTime}
              </p>
            </div>
          </div>
        </div>

        {/* column 3  */}
        <div className="col col-lg-4 col-md-10 col-12 p-0  mt-3 ">
          <div className="row mb-2">
            <div className="col d-grid  ">
              <p className="fw-normal m-auto   ">Ticket Price</p>
              <p className="fw-bolder m-auto ">LKR {ticketPrice}</p>
            </div>
          </div>
          <div className="row rounded-1  align-content-center col-6 m-auto mb-2    ">
            <button
              type="button"
              className="btn SignUpNow btn-sm fw-semibold  fs-5 text-dark  "
            >
              Book Now
            </button>
          </div>
        </div>

        {/* column 3 */}
        {/* <div className="col col-lg-4 col-md-10 col-12 p-0  mt-3 ">
        <div className="row mb-2">
          <div className="col d-grid  ">
            <p className="fw-normal m-auto   ">Booking Closing Date</p>
            <p className="fw-bolder m-auto ">
              2023-05-12
              {bookingClosingDate}
            </p>
          </div>
          <div className="col d-grid   ">
            <p className="fw-normal m-auto p-0  ">Booking Closing Time</p>
            <p className="fw-bolder m-auto ">
              04 : 45 pm
              {bookingClosingTime}
            </p>
          </div>
        </div>
        <div className="row rounded-1  align-content-center col-6 m-auto mb-2  ">
          <button
            type="button"
            className="btn SignUpNow btn-sm fw-bold fs-5  text-success "
          >
            LKR 2255.00
            {ticketPrice}
          </button>
        </div>
      </div> */}
      </div>
    );
  }
};

export default DetailsCard;
