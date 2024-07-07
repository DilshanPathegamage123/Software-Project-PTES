import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import StartLocationSelector from "./StartLocationSelector";
import EndLocationSelector from "./EndLocationSelector";
import "./TotalBlock.css";
import VehicleType from "./VehicleType";
import DatePicker from "./DatePicker";
import SearchButton from "./SearchButton";
import axios from "axios";
import { SearchResult } from "../../SearchResult";

interface TotalBlockProps {
  selectedVehicleType: string;
  setSelectedVehicleType: React.Dispatch<React.SetStateAction<string>>;
  selectedStartLocation: string;
  setSelectedStartLocation: React.Dispatch<React.SetStateAction<string>>;
  selectedEndLocation: string;
  setSelectedEndLocation: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (results: SearchResult[]) => Promise<void>;
}

const TotalBlock: React.FC<TotalBlockProps> = ({
  selectedVehicleType,
  setSelectedVehicleType,
  selectedStartLocation,
  setSelectedStartLocation,
  selectedEndLocation,
  setSelectedEndLocation,
  onSearch,
}) => {
  
  const [selectedDate, setSelectedDate] = useState("");

  const handleSearch = async () => {
    if (
      selectedVehicleType === "" ||
      selectedStartLocation === "" ||
      selectedEndLocation === "" ||
      selectedDate === ""
    ) {
      Swal.fire("Oops", "Please fill all required fields before searching", "error");
      return;
    }

    if (selectedStartLocation === selectedEndLocation) {
      Swal.fire("Warning", "You Can't Travel Between Same Locations", "warning");
      return;
    }

    Swal.fire({
      title: "Searching",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

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

      if (Array.isArray(Response.data.$values)) {
        // Map the response data to the UnifiedSearchResult interface
        const unifiedSearchResults: SearchResult[] = Response.data.$values.map(
          (result: any) => {
            const unifiedResult: SearchResult = {
              ...result,
              VehicleId: result.registeredBusBusId,
              scheduleId: result.scheduleId || result.schedulId,
              vehicleNo: result.busNo || result.trainRoutNo,
              routNo: result.routNo || result.trainRoutNo,
              startLocation: result.startLocation || result.startStation,
              endLocation: result.endLocation || result.endStation,
              departureTime: result.departureTime || result.trainDepartureTime,
              arrivalTime: result.arrivalTime || result.trainArrivalTime,
              comfortability: result.comfortability || result.trainType,
              duration: result.duration,
              ticketPrice: result.ticketPrice,
              selectedStands: result.selectedBusStands || result.stopStations,
              scheduledDatesList: result.scheduledBusDatesList || [
                result.trainDates,
              ],
              firstClassTicketPrice: result.firstClassTicketPrice,
              secondClassTicketPrice: result.secondClassTicketPrice,
            };
            // If the vehicle type is "Train", include the two types of ticket prices
            unifiedResult.firstClassTicketPrice =
              selectedVehicleType === "Train"
                ? result.firstClassTicketPrice
                : 0;
            unifiedResult.secondClassTicketPrice =
              selectedVehicleType === "Train"
                ? result.secondClassTicketPrice
                : 0;

            return unifiedResult;
          }
        );

        // Store the search results and selected vehicle type in the session storage
        sessionStorage.setItem(
          "searchResults",
          JSON.stringify(unifiedSearchResults)
        );
        sessionStorage.setItem("selectedVehicleType", selectedVehicleType);
Swal.close();
     onSearch(unifiedSearchResults); // Store the search results in the state
        console.log("Search result:", unifiedSearchResults); 
      } else {
        console.error("Search results are not in the expected format");
      }
    } catch (error) {
      Swal.close();
      Swal.fire("Error", "Error during search! Please try again.", "error");
      console.error("Error during search:", error);
    }
  };

  console.log(selectedDate);
  sessionStorage.setItem("selectedDate", selectedDate);


  return (
    <div className="TotalBlock container-fluid py-4  align-items-center col-lg-10 col-8 z-1  ">
      <div className=" row1 row row-cols-1 row-cols-sm-2 row-cols-lg-5 align-items-center justify-content-center d-flex  m-0 p-0">
        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4 column-gap-auto p-lg-0">
          <VehicleType
            selectedVehicleType={selectedVehicleType}
            setSelectedVehicleType={(value) => setSelectedVehicleType(value)}
          />
        </div>
        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4 column-gap-auto p-lg-0">
          <StartLocationSelector
            selectedVehicleType={selectedVehicleType}
            setSelectedStartLocation={setSelectedStartLocation}
          />
        </div>
        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4 column-gap-auto p-lg-0">
          <EndLocationSelector
            selectedVehicleType={selectedVehicleType}
            setSelectedEndLocation={setSelectedEndLocation}
          />
        </div>

        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4 column-gap-auto p-lg-0">
          <DatePicker setSelectedDate={setSelectedDate} />
        </div>

        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4 column-gap-auto p-lg-0">
          <SearchButton onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default TotalBlock;