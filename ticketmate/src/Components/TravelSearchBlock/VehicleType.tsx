// <div className="dropdown d-flex p-0 m-0">
//   <button
//     className="btn dropdown-toggle align-items-center"
//     type="button"
//     data-bs-toggle="dropdown"
//     aria-expanded="false"
//   >
//     {selectedVehicleType !== null
//       ? `Selected Type: ${selectedVehicleType}`
//       : "Vehicle Type"}
//   </button>
//   <ul className="dropdown-menu">
//     <li>
//       <a
//         className="dropdown-item"
//         href="#"
//         onClick={() => handleVehicleTypeSelection("Bus")}
//       >
//         Bus
//       </a>
//     </li>
//     <li>
//       <a
//         className="dropdown-item"
//         href="#"
//         onClick={() => handleVehicleTypeSelection("Train")}
//       >
//         Train
//       </a>
//     </li>
//   </ul>
// </div>

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import "./VehicleType.css";

interface VehicleTypeProps {
  setSelectedVehicleType: React.Dispatch<React.SetStateAction<string>>;
}

//function VehicleType() {

const VehicleType: React.FC<VehicleTypeProps> = ({
  setSelectedVehicleType,
}) => {
  // const [selectedVehicleType, _setSelectedVehicleType] =
  //   useState();
  //   null as string | null

  // useEffect(() => {
  //   console.log("Set selected vehicle type", setSelectedVehicleType);
  // }, [setSelectedVehicleType]);

  // const handleVehicleTypeSelection = async (setSelectedVehicleType: string) => {
  //  if (setSelectedVehicleType === "vehicleType") {
  //    console.log("Vehicle type is not selected");
  //     alert("Please select a vehicle type you wish to travel with.");
  //    return;
  //   }
  //   try {
  //     await axios.put("https://localhost:7028/api/vehicletype", {
  //       vehicleType: vehicleType,
  //     });
  //     console.log("Vehicle type sent successfully");
  //     setSelectedVehicleType(vehicleType); // Update the state with the selected type
  //     //setSelectedVehicleType(vehicleType);
  //     //console.log("Selected vehicle type:", selectedVehicleType); // for checking the response is correct or not
  //     //console.log("Set selected vehicle type", setSelectedVehicleType); // for checking the response is correct or not
  //   } catch (error) {
  //     console.error("Error while sending vehicle type to backend", error);
  //   }
  // };

  // useEffect(() => {
  //   console.log("Selected vehicle type:", selectedVehicleType);
  //   console.log("Set selected vehicle type", _setSelectedVehicleType);
  // }, [selectedVehicleType]); // Run this effect whenever selectedVehicleType changes

  // useEffect(() => {
  //   const dropdownElement = document.querySelector(".dropdown-toggle");
  //   if (dropdownElement) {
  //     new window.bootstrap.Dropdown(dropdownElement);
  //   }
  // }, []);

  return (
    <div className="dropdown d-flex p-0 m-0">
      <select
        className="form-select btn dropdown-toggle align-items-center  "
        onChange={(e) => {
          //handleVehicleTypeSelection(e.target.value);
          setSelectedVehicleType(e.target.value);
          //_setSelectedVehicleType(e.target.value);
        }}
        // value={selectedVehicleType || "vehicleType"}
      >
        {/* {selectedVehicleType !== null
          ? `Selected Type: ${selectedVehicleType}`
          : "Vehicle Type"} */}
        <option value="vehicleType">Vehicle Type</option>
        <option value="Bus">Bus</option>
        <option value="Train">Train</option>
      </select>
    </div>
  );
};

export default VehicleType;
