import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StartLocationSelector from "./StartLocationSelector";
import EndLocationSelector from "./EndLocationSelector";
import DatePicker from "./DatePicker";
import "./TotalBlock2.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchResult } from "../../SearchResult";

interface TotalBlock2Props {
  selectedVehicleType: string;
  onSearch: (results: SearchResult[]) => Promise<void>;
}

const TotalBlock2: React.FC<TotalBlock2Props> = ({
  selectedVehicleType,
  onSearch,
}) => {
  const [selectedStartLocation, setSelectedStartLocation] = useState("");
  const [selectedEndLocation, setSelectedEndLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

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

      if (Array.isArray(Response.data.$values)) {
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

        onSearch(unifiedSearchResults);

        console.log("Search result:", unifiedSearchResults);

        await onSearch(unifiedSearchResults);

        navigate("/travel-options", {
          state: {
            searchResults: unifiedSearchResults,
            selectedVehicleType: selectedVehicleType,
          },
        });
      } else {
        console.error("Search results are not in the expected format");
      }
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
              selectedVehicleType={selectedVehicleType}
              setSelectedStartLocation={setSelectedStartLocation}
            />
          </div>
          <div className="col pb-1 ">
            <EndLocationSelector
              selectedVehicleType={selectedVehicleType}
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
              onClick={() => handleSearch()}
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
