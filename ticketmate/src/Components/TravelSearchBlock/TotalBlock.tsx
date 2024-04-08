import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StartLocationSelector from "./StartLocationSelector";
import EndLocationSelector from "./EndLocationSelector";
import "./TotalBlock.css";
import VehicleType from "./VehicleType";
import DatePicker from "./DatePicker";
import SearchButton from "./SearchButton";
import axios from "axios";

// interface TotalBlockProps {
//   setSelectedVehicleTypeProp: (value: string) => void;
//   onSearch: (results: SearchResult[]) => Promise<void>;
// }

interface TotalBlockProps {
  selectedVehicleType: string;
  setSelectedVehicleType: React.Dispatch<React.SetStateAction<string>>;
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

// export default function TotalBlock({
//   selectedVehicleType,
//   setSelectedVehicleType,
// }: {
//   selectedVehicleType: string;
//   setSelectedVehicleType: (value: string) => void;
// }) {
//   //const [selectedVehicleType, setSelectedVehicleType] = useState("");
//   const [selectedStartLocation, setSelectedStartLocation] = useState("");
//   const [selectedEndLocation, setSelectedEndLocation] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [searchResults, setSearchResults] = useState([]); // Use state to store search results

const TotalBlock: React.FC<TotalBlockProps> = ({
  selectedVehicleType,
  setSelectedVehicleType,
  onSearch,
}) => {
  //const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedStartLocation, setSelectedStartLocation] = useState("");
  const [selectedEndLocation, setSelectedEndLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // const handleVehicleTypeChange: React.Dispatch<
  //   React.SetStateAction<string>
  // > = (type) => {
  //   setSelectedVehicleType(type);
  // };
  console.log(selectedVehicleType);
  console.log(selectedStartLocation);
  console.log(selectedEndLocation);
  console.log(selectedDate);

  // React.useEffect(() => {
  //   console.log(selectedVehicleType);
  // }, [selectedVehicleType]);

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

    if (selectedStartLocation === selectedEndLocation) {
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
      onSearch(Response.data); // Store the search results in the state
      console.log("Search result:", Response.data); // Log the search results for debugging
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="TotalBlock container-fluid py-4  align-items-center col-lg-10 col-8   z-1  ">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-5 align-items-center justify-content-center  ">
        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4">
          <VehicleType
            selectedVehicleType={selectedVehicleType}
            setSelectedVehicleType={(value) => setSelectedVehicleType(value)}

            //setSelectedVehicleType={setSelectedVehicleType}
          />

          {/* Pass setSelected as a prop to VehicleType */}
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
};

export default TotalBlock;
