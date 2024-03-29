import React from "react";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./TravelOptionsPage.css";

import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import TotalBlock2 from "../../Components/TravelSearchBlock/TotalBlock2";
import Footer from "../../Components/Footer/Footer";

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

import { Location } from "react-router-dom";

const TravelOptionsPage = ({ location }: { location: Location }) => {
  const searchResults = location.state.searchResults; //props.location is a special prop, which contains information about the current location of the router, including the pathname
  const selectedVehicleType = ""; // Declare the variable selectedVehicleType

  const setSelectedVehicleType = (type: string) => {
    // logic for setting the selected vehicle type
  };

  // Use searchResults in the TravelOptionsPage component
  // Render the search results or perform other actions
  // const location = useLocation();
  // const searchResults = location.state?.searchResults || [];

  return (
    <>
      <PrimaryNavBar />
      <TotalBlock2
        selectedVehicleType={selectedVehicleType}
        setSelectedVehicleType={setSelectedVehicleType}
      />
      {/*  Details cards should render in here */}
      {searchResults.map((result: SearchResult, index: number) => (
        <DetailsCard
          key={index}
          vehicleType={result.vehicleType}
          startLocation={result.startLocation}
          departureTime={result.departureTime}
          endLocation={result.endLocation}
          arrivalTime={result.arrivalTime}
          travelDate={result.travelDate}
          arrivalDate={result.arrivalDate}
          regNo={result.regNo}
          comfortability={result.comfortability}
          duration={result.duration}
          ticketPrice={result.ticketPrice}
          bookingClosingDate={result.bookingClosingDate}
          bookingClosingTime={result.bookingClosingTime}
        />
      ))}
      <Footer />
    </>
  );
};

export default TravelOptionsPage;
