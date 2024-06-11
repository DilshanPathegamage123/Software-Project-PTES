import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./VehicleType.css";

interface VehicleTypeProps {
  selectedVehicleType: string;
  setSelectedVehicleType: React.Dispatch<React.SetStateAction<string>>;
}

const VehicleType: React.FC<VehicleTypeProps> = ({
  selectedVehicleType,
  setSelectedVehicleType,
}) => {
  return (
    <div>
      <select
        className="form-select d-flex"
        onChange={(e) => {
          setSelectedVehicleType(e.target.value);
        }}
        value={selectedVehicleType}
      >
        <option value="">Vehicle Type</option>
        <option value="Bus">Bus</option>
        <option value="Train">Train</option>
      </select>
    </div>
  );
};

export default VehicleType;
