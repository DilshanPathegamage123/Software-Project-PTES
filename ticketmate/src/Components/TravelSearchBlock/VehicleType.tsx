import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import "./VehicleType.css";

function VehicleType() {
  const [selectedVehicleType, setSelectedVehicleType] = useState(
    null as string | null
  );

  const handleVehicleTypeSelection = async (vehicleType: string) => {
    try {
      await axios.post("API Url", {
        selectedVehicleType: vehicleType,
      });
      setSelectedVehicleType(vehicleType); // Update the state with the selected type
    } catch (error) {
      console.error("Error while sending vehicle type to backend", error);
    }
  };

  useEffect(() => {
    const dropdownElement = document.querySelector(".dropdown-toggle");
    if (dropdownElement) {
      new window.bootstrap.Dropdown(dropdownElement);
    }
  }, []);

  return (
    <div className="dropdown d-flex p-0 m-0">
      <button
        className="btn dropdown-toggle align-items-center"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedVehicleType !== null
          ? `Selected Type: ${selectedVehicleType}`
          : "Vehicle Type"}
      </button>
      <ul className="dropdown-menu">
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleVehicleTypeSelection("Bus")}
          >
            Bus
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleVehicleTypeSelection("Train")}
          >
            Train
          </a>
        </li>
      </ul>
    </div>
  );
}

export default VehicleType;
