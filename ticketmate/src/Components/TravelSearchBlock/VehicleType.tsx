import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure you import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Make sure you import Bootstrap JavaScript

import "./VehicleType.css";

function VehicleType() {
  useEffect(() => {
    // Initialize the Bootstrap dropdown when the component mounts
    const dropdownElement = document.querySelector(".dropdown-toggle");
    if (dropdownElement) {
      new window.bootstrap.Dropdown(dropdownElement);
    }
  }, []);

  return (
    <div className="dropdown d-flex p-0 m-0   ">
      <button
        className="btn dropdown-toggle align-items-center "
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Vehicle Type
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="#">
            Bus
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Train
          </a>
        </li>
      </ul>
    </div>
  );
}

export default VehicleType;
