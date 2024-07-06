import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./TravelOptionsPage.css";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import TotalBlock2 from "../../Components/TravelSearchBlock/TotalBlock2";
import Footer from "../../Components/Footer/footer";
import { SearchResult } from "../../SearchResult";
import PrimaryNavBar_logout from "../../Components/NavBar/PrimaryNavBar-logout";


const getToken = () => {
  return sessionStorage.getItem("token");
};


const TravelOptionsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState<SearchResult[]>(
    location.state?.searchResults || []
  );
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>(
    location.state?.selectedVehicleType || ""
  );
  const [selectedStartLocation, setSelectedStartLocation] = useState<string>(
    location.state?.selectedStartLocation || ""
  );
  const [selectedEndLocation, setSelectedEndLocation] = useState<string>(
    location.state?.selectedEndLocation || ""
  );

  useEffect(() => {
    if (!location.state) {
      const storedSearchResults = sessionStorage.getItem("searchResults");
      const storedSelectedVehicleType = sessionStorage.getItem(
        "selectedVehicleType"
      );
      const storedSelectedStartLocation = sessionStorage.getItem(
        "selectedStartLocation"
      );
      const storedSelectedEndLocation = sessionStorage.getItem(
        "selectedEndLocation"
      );

      setSearchResults(
        storedSearchResults ? JSON.parse(storedSearchResults) : []
      );
      setSelectedVehicleType(storedSelectedVehicleType || "");
      setSelectedStartLocation(storedSelectedStartLocation || "");
      setSelectedEndLocation(storedSelectedEndLocation || "");
    }
  }, [location.state]);

  const onSearch = async (results: SearchResult[]) => {
    setSearchResults(results);
  };

  const handleSearch = async (results: SearchResult[]) => {
    await onSearch(results);
    sessionStorage.setItem("selectedVehicleType", selectedVehicleType);
    navigate("/travel-options", {
      state: {
        searchResults: results,
        selectedVehicleType: selectedVehicleType,
      },
    });
  };

  console.log;(searchResults);

  useEffect(() => {
    sessionStorage.setItem("selectedVehicleType", selectedVehicleType);
  }, [selectedVehicleType]);

  const handleBookNow = (VehicleId: number) => {
    const selectedVehicle = searchResults.find(
      (result) => result.VehicleId === VehicleId
    );
    if (selectedVehicle) {
      const startStand = selectedVehicle.selectedStands.$values.find(
        (stand) => {
          if ("busStation" in stand) {
            return stand.busStation === selectedStartLocation;
          } else {
            return stand.trainStationName === selectedStartLocation;
          }
        }
      );
      const endStand = selectedVehicle.selectedStands.$values.find((stand) => {
        if ("busStation" in stand) {
          return stand.busStation === selectedEndLocation;
        } else {
          return stand.trainStationName === selectedEndLocation;
        }
      });
      if (startStand && endStand) {
        const startStandTime =
          "busStation" in startStand
            ? startStand.standArrivalTime
            : startStand.trainDepartureTime;
        const endStandTime =
          "busStation" in endStand
            ? endStand.standArrivalTime
            : endStand.trainDepartureTime;

        sessionStorage.setItem("startStandTime", startStandTime);
        sessionStorage.setItem("endStandTime", endStandTime);
        sessionStorage.setItem("selectedStartLocation", selectedStartLocation);
        sessionStorage.setItem("selectedEndLocation", selectedEndLocation);
        sessionStorage.setItem(
          "scheduleId",
          selectedVehicle.scheduleId.toString()
        );

        console.log(selectedStartLocation);
        console.log(selectedEndLocation);

        console.log("Start Stand Arrival Time", startStandTime);
        console.log("End Stand Arrival Time", endStandTime);
        console.log(selectedVehicle);
        console.log(selectedVehicleType);
        console.log(selectedVehicle.scheduleId);

        const pageToNavigate =
          selectedVehicleType === "Train" ? "/train-booking" : "/bus-booking";

        navigate(pageToNavigate, {
          state: {
            ...selectedVehicle,
          },
        });
      } else {
        console.error("Start or end stand details not found.");
      }
    } else {
      console.error("Selected vehicle details not found.");
    }
  };

  return (
    <div className="wrapper">
      {(getToken() !== null)?  <span data-testid="navbar"><PrimaryNavBar_logout /></span>:<span data-testid="navbar"><PrimaryNavBar /></span>}
      <TotalBlock2
        selectedVehicleType={selectedVehicleType}
        selectedStartLocation={selectedStartLocation}
        setSelectedStartLocation={setSelectedStartLocation}
        selectedEndLocation={selectedEndLocation}
        setSelectedEndLocation={setSelectedEndLocation}
        onSearch={handleSearch}
      />
      <div className="Travel-Option-Page-body d-flex h-100">
        <div className="details-card-container d-flex flex-wrap justify-content-center">
          {searchResults.length > 0 ? (
            searchResults.map((result: SearchResult, index: number) => (
              <DetailsCard
                key={index}
                onBookNow={handleBookNow}
                //selectedVehicleType={selectedVehicleType}
                {...result}
              />
            ))
          ) : (
            <div className="h-auto mt-5 mb-5 p-4">
              No matching travel options found! Search another destination...
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TravelOptionsPage;
