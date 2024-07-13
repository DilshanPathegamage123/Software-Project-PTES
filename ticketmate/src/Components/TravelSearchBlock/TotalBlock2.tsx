import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import StartLocationSelector from "./StartLocationSelector";
import EndLocationSelector from "./EndLocationSelector";
import DatePicker from "./DatePicker";
import "./TotalBlock2.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchResult } from "../../SearchResult";

interface TotalBlock2Props {
  selectedVehicleType: string;
  selectedStartLocation: string;
  setSelectedStartLocation: React.Dispatch<React.SetStateAction<string>>;
  selectedEndLocation: string;
  setSelectedEndLocation: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (results: SearchResult[]) => Promise<void>;
}

const TotalBlock2: React.FC<TotalBlock2Props> = ({
  selectedVehicleType,
  selectedStartLocation,
  setSelectedStartLocation,
  selectedEndLocation,
  setSelectedEndLocation,
  onSearch,
}) => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<string>(
    sessionStorage.getItem("selectedDate") || ""
  );

  console.log(selectedVehicleType, selectedStartLocation, selectedEndLocation, selectedDate);
  const handleSearch = async () => {
    if (
      selectedVehicleType === '' ||
      selectedStartLocation === '' ||
      selectedEndLocation === '' ||
      selectedDate === ''
    ) {
      Swal.fire("Oops", "Please fill all required fields before searching", "error");
      return;
    }

    if (selectedStartLocation == selectedEndLocation) {
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
      Swal.close();
      Swal.fire("Error", "Error during search! Please try again.", "error");
      console.error("Error during search:", error);
    }
  };

  console.log(selectedDate);
  sessionStorage.setItem("selectedDate", selectedDate);

  return (
    <div className="TotalBlock2 text-black fs-5 fw-semibold font-family-Poppins ms-auto me-auto w-100 col-12 ">
      <div className="row col-12  m-auto h-auto">
        <p className="m-0 px-4 py-3 text-white   ">
          {selectedVehicleType === "Bus" ? "Bus Schedule" : "Train Schedule"}{" "}
        </p>
      </div>

      <div className="row col-12  m-auto pb-3 pt-2  d-sm-flex ">
        <div className=" class col col-12  m-auto d-md-flex">
          <div className="col  pb-1  ">
            <StartLocationSelector
              selectedVehicleType={selectedVehicleType}
              setSelectedStartLocation={setSelectedStartLocation}
              defaultStartLocation = {selectedStartLocation}
            />
          </div>
          <div className="col pb-1 ">
            <EndLocationSelector
              selectedVehicleType={selectedVehicleType}
              setSelectedEndLocation={setSelectedEndLocation}
              defaultEndLocation = {selectedEndLocation}
            />
          </div>
          <div className="col pb-1 ">
            <DatePicker setSelectedDate={setSelectedDate} defaultDate={selectedDate} />
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
