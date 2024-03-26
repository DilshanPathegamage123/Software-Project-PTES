import React, { useState } from "react";
import StartLocationSelector from "./StartLocationSelector";
import EndLocationSelector from "./EndLocationSelector";
import DatePicker from "./DatePicker";
import "./TotalBlock2.css";
import axios from "axios";
export default function TotalBlock2({
  selectedVehicleType,
  setSelectedVehicleType,
}: {
  selectedVehicleType: string;
  setSelectedVehicleType: (value: string) => void;
}) {
  // const [selectedVehicleType, setSelectedVehicleType] = useState("");
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
    <div className="TotalBlock2 text-black fs-5 fw-semibold font-family-Poppins h-auto   ">
      <div className="row col-12  m-auto ">
        <p className="m-0 px-4 py-3 text-white   ">Bus Schedule </p>
      </div>

      <div className="row row   col-12  m-auto pb-3 pt-2  d-sm-flex ">
        <div className=" class col col-12  m-auto d-md-flex">
          <div className="col  pb-1  ">
            <StartLocationSelector
              setSelectedStartLocation={setSelectedStartLocation}
            />
          </div>
          <div className="col pb-1 ">
            <EndLocationSelector
              setSelectedEndLocation={setSelectedEndLocation}
            />
          </div>
          <div className="col pb-1 ">
            <DatePicker setSelectedDate={setSelectedDate} />
          </div>

          <div className=" class col pb-1 ">
            <button
              type="button"
              className=" Modify-Button btn btn-lg text-white fs-5 fw-normal col  m-auto align-content-center justify-content-center"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
