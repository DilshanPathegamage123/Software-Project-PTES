import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./StartLocationSelector.css";
import { toast } from "react-toastify";

interface StartLocationSelectorProps {
  selectedVehicleType: string;
  setSelectedStartLocation: React.Dispatch<React.SetStateAction<string>>;
}

interface BusStand {
  standName: string;
}

interface TrainStation {
  trainStationName: string;
}

const StartLocationSelector: React.FC<StartLocationSelectorProps> = ({
  selectedVehicleType,
  setSelectedStartLocation,
}) => {
  const [startvalue, setStartValue] = useState("");
  const [startData, setStartData] = useState<{ stopName: string }[]>([]);
  const [filteredStartData, setFilteredStartData] = useState<
    { stopName: string }[]>([]);

  useEffect(() => {
    if (selectedVehicleType === "Bus") {
      getAllBusStands();
    } else if (selectedVehicleType === "Train") {
      getAllTrainStations();
    }
  }, [selectedVehicleType]);

  const getAllBusStands = async () => {
    try {
      // Api call for fetching bus stands
      const response = await axios.get(
        "https://localhost:7048/api/GetBusStands"
      );
      console.log("Start Locations from backend:", response.data); // for checking the response is correct or not

      if (Array.isArray(response.data.$values)) {
        setStartData(
          response.data.$values.map((item: BusStand) => ({
            stopName: item.standName,
          }))
        );
        setFilteredStartData(
          response.data.$values.map((item: BusStand) => ({
            stopName: item.standName,
          }))
        );
      } else {
        setStartData([]);
        setFilteredStartData([]);
      }
    } catch (error) {
      console.error("Error while sending start location to backend", error);
    }
  };

  const getAllTrainStations = async () => {
    try {
      // Api call for fetching train stations
      const response = await axios.get(
        "https://localhost:7048/api/GetTrainStations"
      );

      console.log("Start Locations from backend:", response.data); // for checking the response is correct or not

      if (Array.isArray(response.data.$values)) {
        setStartData(
          response.data.$values.map((item: TrainStation) => ({
            stopName: item.trainStationName,
          }))
        );
        setFilteredStartData(
          response.data.$values.map((item: TrainStation) => ({
            stopName: item.trainStationName,
          }))
        );
      } else {
        setStartData([]);
        setFilteredStartData([]);
      }
    } catch (error) {
      console.error("Error while sending start location to backend", error);
    }
  };

  const filterStartLocations = (input: string) => {
    const filteredLocations = startData.filter(
      (location: { stopName: string }) =>
        location.stopName &&
        location.stopName.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredStartData(filteredLocations);
  };

  return (
    <div
      className="selector  d-flex  w-100 "
      onClick={() => {
        if (!selectedVehicleType) {
          toast.error("Please select a vehicle type first.");
        }
      }}
    >
      <span className="icon-container me-2">
        {/* Bootstrap SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M24.077 14.4014C22.335 14.3999 19.93 14.8974 18.938 15.3149C17.9395 15.7269 17.276 16.1414 17.069 17.1734L16.3215 22.9249V30.8464H17.609V32.0819C17.608 33.5989 19.8235 33.5989 19.8205 32.0819V30.8464H28.178V32.0819C28.1795 33.5989 30.395 33.5989 30.3995 32.0819V30.8464H31.6765V22.9249L30.929 17.1734C30.727 16.1414 30.0635 15.7269 29.071 15.3149C28.073 14.8974 25.6685 14.3999 23.9315 14.4014"
            fill="#042F40"
          />
          <path
            d="M29.289 28.3648C29.8735 28.3598 30.3495 27.8838 30.348 27.2953C30.3495 26.7103 29.8735 26.2343 29.289 26.2363C28.6995 26.2343 28.2235 26.7103 28.2195 27.2953C28.2235 27.8838 28.6995 28.3598 29.289 28.3648Z"
            fill="white"
          />
          <path
            d="M18.7201 28.3648C18.1296 28.3598 17.6541 27.8838 17.6506 27.2953C17.6541 26.7103 18.1296 26.2343 18.7201 26.2363C19.3036 26.2343 19.7796 26.7103 19.7791 27.2953C19.7796 27.8838 19.3036 28.3598 18.7201 28.3648Z"
            fill="white"
          />
          <path
            d="M23.9214 16.7885H20.8379C20.2199 16.7835 20.2199 15.8505 20.8379 15.8545H27.1604C27.7829 15.8505 27.7829 16.7835 27.1604 16.7885H23.9214Z"
            fill="white"
          />
          <path
            d="M23.9216 17.7231H19.1666C18.5086 17.7256 18.3366 18.0596 18.2526 18.5641L17.6711 22.7376C17.6221 23.1336 17.7376 23.5301 18.2941 23.5266H29.7146C30.2656 23.5301 30.3811 23.1336 30.3271 22.7376L29.7456 18.5641C29.6666 18.0596 29.4946 17.7256 28.8426 17.7231H23.9216Z"
            fill="white"
          />
          <path
            d="M39.5398 20.0689C38.918 20.0595 38.4319 19.5259 38.4465 18.8766C38.4632 18.2275 38.9773 17.7135 39.5993 17.7206C40.214 17.7339 40.7043 18.2679 40.6855 18.9168C40.6735 19.5614 40.1589 20.0803 39.5398 20.0689Z"
            fill="#042F40"
          />
          <path
            d="M40.1418 20.5402C39.9388 20.3779 39.6833 20.2583 39.3864 20.2525C39.0051 20.2427 38.6737 20.4272 38.458 20.6712L37.1406 22.5915L35.5235 23.403C35.3852 23.4809 35.2889 23.6211 35.2897 23.7851C35.2861 24.0387 35.506 24.2504 35.7815 24.2561C35.8658 24.2605 35.9377 24.2355 36.0162 24.2114L37.7797 23.3269C37.8351 23.2945 37.8806 23.2512 37.9202 23.205L38.4114 22.485L38.7101 24.561L36.5375 26.4935C36.4856 26.5544 36.4478 26.6284 36.4231 26.7037L35.6368 29.2206C35.6353 29.2786 35.6232 29.3133 35.6229 29.3591C35.6146 29.7462 35.9484 30.0591 36.3619 30.0725C36.7065 30.0811 36.9814 29.8746 37.0897 29.5959L37.8294 27.2382L39.5837 25.795L39.7954 27.393C39.8011 27.4674 39.8909 27.6322 39.9152 27.6965L41.2073 30.2195C41.3362 30.4501 41.5784 30.6142 41.8712 30.6216C42.2889 30.6355 42.6298 30.3339 42.6335 29.9507C42.6353 29.8428 42.5974 29.725 42.5619 29.6437L41.3612 27.3116L40.659 22.3661L41.3757 23.0191L41.6145 24.7793C41.6483 25.0064 41.8477 25.2082 42.1054 25.216C42.385 25.224 42.6091 25.0247 42.613 24.7672C42.615 24.7475 42.6127 24.7273 42.6108 24.7032L42.3252 22.6504C42.3036 22.5625 42.2618 22.4802 42.1944 22.4137L40.1422 20.5399L40.1418 20.5402Z"
            fill="#042F40"
          />
        </svg>
      </span>
      <input
        className="p-sm-3 p-2 align-content-center w-100"
        list="startLocationList"
        onChange={(e) => {
          setStartValue(e.target.value);
          filterStartLocations(e.target.value);
          setSelectedStartLocation(e.target.value);
        }}
        placeholder="Start"
      />

      {/* datalist element to create a dropdown list of predefined options for an input field.  */}
      <datalist id="startLocationList">
        {filteredStartData.map((op: { stopName: string }, index: number) => (
          <option key={index}>{op.stopName}</option>
        ))}
      </datalist>
    </div>
  );
};

export default StartLocationSelector;
