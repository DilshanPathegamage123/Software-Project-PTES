import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./VehicleType.css";

interface VehicleTypeProps {
  selectedVehicleType: string;
  setSelectedVehicleType: React.Dispatch<React.SetStateAction<string>>;
}

//function VehicleType() {

const VehicleType: React.FC<VehicleTypeProps> = ({
  selectedVehicleType,
  setSelectedVehicleType,
}) => {
  return (
    <div>
      <select
        className="form-select"
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
