import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";

import "./passenger_form.css";
import React, { useState } from "react";
import "../../vars.css";
import PassengerFormComponent from "./passengerFormComponent";
import OwnerFormComponent from "./ownerFormComponent";
import DriverFormComponent from "./driverFormComponent";
import Footer from "../../Components/Footer/Footer";


const  PassengerForm=()=> {
const [selectedOption, setSelectedOption] = useState("option1");


  return (
    <div>
    
      <PrimaryNavBar />
      <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#042F40"
          className="bi bi-arrow-left-circle col-1 my-3 mx-5"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
          />
        </svg>
      </a>


      <div className="row container shadow bg-white col-8  justify-center shadow p-3 rounded mb-5 bg-body rounded  mx-auto">
        <div className="row">
          <p
            className="text-teal fs-5 fw-semibold font-family-Inter  m-0 px-3 py-2 "
            style={{ color: "var(--color-secondary)" }}
          >
            What type of user are you?
          </p>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <label
              onClick={() => setSelectedOption("option1")}
              className="d-inline-flex align-items-center"
            >
              <input
                type="radio"
                name="option"
                value="option1"
                checked={selectedOption === "option1"}

                //  onChange={selectedOption}
              />
              Passenger
            </label>
          </div>
          <div className="col-lg-4 col-md-6">
            <label
              onClick={() => setSelectedOption("option2")}
              className="d-inline-flex align-items-center"
            >
              <input
                type="radio"
                name="option"
                value="option2"
                checked={selectedOption === "option2"}

                //  onChange={handleUserTypeChange}
              />
              Vehicle Owner
            </label>
          </div>
          <div className="col-lg-4 col-md-6">
            <label
              onClick={() => setSelectedOption("option3")}
              className="d-inline-flex align-items-center"
            >
              <input
                type="radio"
                name="option"
                value="option3"
                checked={selectedOption === "option3"}
                //  onChange={handleUserTypeChange}
              />
              Vehicle Driver
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        {selectedOption === "option1" && <PassengerFormComponent />}
        {selectedOption === "option2" && <OwnerFormComponent />}
        {selectedOption === "option3" && <DriverFormComponent />}
      </div>
      <div>
        <Footer />

      </div>
    </div>
  );
}

export default PassengerForm;

