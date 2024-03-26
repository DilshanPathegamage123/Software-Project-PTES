import React, { useState } from "react";
import StartLocationSelector from "./StartLocationSelector";
import EndLocationSelector from "./EndLocationSelector";
import "./TotalBlock.css";
import VehicleType from "./VehicleType";
import DatePicker from "./DatePicker";
import SearchButton from "./SearchButton";
import axios from "axios";

export default function TotalBlock({
  selectedVehicleType,
  setSelectedVehicleType,
}: {
  selectedVehicleType: string;
  setSelectedVehicleType: (value: string) => void;
}) {
  //const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedStartLocation, setSelectedStartLocation] = useState("");
  const [selectedEndLocation, setSelectedEndLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleSearch = async () => {
    if (
      selectedVehicleType === "vehicleType" ||
      selectedVehicleType === "" ||
      selectedStartLocation === "" ||
      selectedEndLocation === "" ||
      selectedDate === ""
    ) {
      alert("Please fill in all required fields before searching.");
      //console.log("Please fill in all required fields before searching.");
      return;
    }

    // if (selectedStartLocation == selectedStartLocation) {
    //   alert("You Can't Travel Between Same Locations");
    //   return;
    // }

    try {
      const Response = await axios.post(
        "https://localhost:7124/api/TravelSearch",
        {
          VehicleType: selectedVehicleType,
          StartLocation: selectedStartLocation,
          EndLocation: selectedEndLocation,
          TravelDate: selectedDate,
        }
      );

      console.log("Search result:", Response.data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="TotalBlock container-fluid py-4  align-items-center col-lg-10 col-8   z-1  ">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-5 align-items-center justify-content-center  ">
        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4">
          <VehicleType setSelectedVehicleType={setSelectedVehicleType} />
        </div>
        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4">
          <StartLocationSelector
            setSelectedStartLocation={setSelectedStartLocation}
          />
        </div>
        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4">
          <EndLocationSelector
            setSelectedEndLocation={setSelectedEndLocation}
          />
        </div>

        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4">
          <DatePicker setSelectedDate={setSelectedDate} />
        </div>

        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4">
          <SearchButton onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
}
