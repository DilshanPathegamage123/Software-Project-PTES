import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StartLocationSelector from "./StartLocationSelector";
import EndLocationSelector from "./EndLocationSelector";
import DatePicker from "./DatePicker";
import "./TotalBlock2.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import VehicleType from "./VehicleType";

interface TotalBlock2Props {
  selectedVehicleType: string;
  //setSelectedVehicleType: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (results: SearchResult[]) => Promise<void>;
}

interface SearchResult {
  // Define the properties of a search result
  vehicleType: string;
  startLocation: string;
  departureTime: string;
  endLocation: string;
  arrivalTime: string;
  travelDate: string;
  arrivalDate: string;
  regNo: string;
  comfortability: string;
  duration: string;
  ticketPrice: number;
  bookingClosingDate: string;
  bookingClosingTime: string;
}

const TotalBlock2: React.FC<TotalBlock2Props> = ({
  selectedVehicleType,
  onSearch,
}) => {
  // const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedStartLocation, setSelectedStartLocation] = useState("");
  const [selectedEndLocation, setSelectedEndLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  console.log(selectedVehicleType);
  console.log(selectedStartLocation);
  console.log(selectedEndLocation);
  console.log(selectedDate);

  const handleSearch = async () => {
    if (
      selectedVehicleType === "" ||
      selectedStartLocation === "" ||
      selectedEndLocation === "" ||
      selectedDate === ""
    ) {
      toast.warn("Please fill all required fields before searching");
      return;
    }

    if (selectedStartLocation == selectedEndLocation) {
      toast.warn("You Can't Travel Between Same Locations");
      return;
    }

    try {
      const Response = await axios.post(
        "https://localhost:7048/api/TravelSearch",
        {
          VehicleType: selectedVehicleType,
          StartLocation: selectedStartLocation,
          EndLocation: selectedEndLocation,
          TravelDate: selectedDate,
        }
      );
      //console.log(VehicleType);

      onSearch(Response.data);
      // const searchResults = Response.data;

      // navigate("/TravelOptionsPage", {
      //   state: { searchResults: searchResults },
      // });
      // Redirect to the TravelOptionsPage with the search results

      console.log("Search result:", Response.data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="TotalBlock2 text-black fs-5 fw-semibold font-family-Poppins h-auto   ">
      <div className="row col-12  m-auto ">
        <p className="m-0 px-4 py-3 text-white   ">
          {selectedVehicleType === "Bus" ? "Bus Schedule" : "Train Schedule"}{" "}
        </p>
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
};

export default TotalBlock2;
