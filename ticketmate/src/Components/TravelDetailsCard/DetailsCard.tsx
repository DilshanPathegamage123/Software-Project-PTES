import React from "react";
import Bus1 from "./TravelDetailsCardAssests/bus1.png";
import "./DetailsCard.css";

const DetailsCard = () => {
  return (
    <div className=" DetailsCard row col-lg-10 col-11 m-auto rounded-3 justify-content-center font-family-Poppins mt-2 mb-2">
      {/* column 1 */}
      <div className="col col-lg-4 col-md-10 col-12 p-lg-2 p-0 d-flex  m-auto  ">
        <div className="col ms-xxl-5  ps-0  ">
          <img
            src={Bus1}
            alt="VehicleIcon"
            className="VehicleImg align-content-center m-auto d-flex "
          />
        </div>
        <div className="col  ms-xxl-5 ps-0 m-auto d-lg-grid d-sm-flex d-flex  ">
          <div className=" d-grid ">
            <p className="fw-normal m-auto px-3  align-content-center ">
              Reg No
            </p>

            <p className=" fw-bolder  m-auto px-3 align-content-center">
              ND - 7851
            </p>
          </div>

          <div className=" d-grid">
            <p className="fw-normal m-auto px-3 align-content-center">Type </p>

            <p className="fw-bolder m-auto px-3 align-content-center ">
              Luxury
            </p>
          </div>
        </div>
      </div>

      {/* column 2 */}

      <div className="col col-lg-4 col-md-10 col-12 p-lg-2 p-0 d-flex  ">
        <div className=" col d-md-flex d-lg-block m-auto ">
          <div className=" d-grid  ">
            <p className="fw-normal m-auto  px-3 align-content-center  ">
              Depature
            </p>
            <p className="fw-bolder m-auto px-3 align-content-center">
              Colombo
            </p>
          </div>
          <div className=" d-grid ">
            <p className="fw-normal m-auto px-3 align-content-center ">Date</p>
            <p className="fw-bolder m-auto  px-3 align-content-center">
              2023-05-12
            </p>
          </div>
          <div className=" d-grid ">
            <p className="fw-normal m-auto px-3 align-content-center">Time</p>
            <p className="fw-bolder m-auto px-3 align-content-center">
              06 : 45 pm{" "}
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
          <div className=" d-grid ">
            <p className="fw-normal m-auto  px-3 ">Depature</p>
            <p className="fw-bolder m-auto  px-3 ">Jaffna</p>
          </div>
          <div className=" d-grid ">
            <p className="fw-normal m-auto  px-3 ">Date</p>
            <p className="fw-bolder m-auto  px-3 ">2023-05-13</p>
          </div>
          <div className=" d-grid ">
            <p className="fw-normal m-auto  px-3 ">Time</p>
            <p className="fw-bolder m-auto  px-3">02 : 45 am </p>
          </div>
        </div>
      </div>

      {/* column 3 */}
      <div className="col col-lg-4 col-md-10 col-12  m-auto  p-lg-2 p-0  mt-3 ">
        <div className="row mb-2">
          <div className="col d-grid  ">
            <p className="fw-normal m-auto   ">Booking Closing Date</p>
            <p className="fw-bolder m-auto ">2023-05-12</p>
          </div>
          <div className="col d-grid   ">
            <p className="fw-normal m-auto ">Booking Closing Time</p>
            <p className="fw-bolder m-auto "> 04 : 45 pm</p>
          </div>
        </div>
        <div className="row rounded-1  align-content-center col-6 m-auto mb-2  ">
          <button
            type="button"
            className="btn SignUpNow btn-sm fw-bold fs-5  text-success "
          >
            LKR 2255.00
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
