/*import React from "react";
import { Location } from "react-router-dom";

import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./TravelOptionsPage.css";

import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import TotalBlock2 from "../../Components/TravelSearchBlock/TotalBlock2";
import Footer from "../../Components/Footer/Footer";
//import { SearchResult } from "../../types"; // Import the 'SearchResult' type from the appropriate module

interface TravelOptionsPageProps {
  location: Location<{ searchResults: SearchResult[] }>; // Explicitly define the type of 'location' prop
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

const TravelOptionsPage: React.FC<TravelOptionsPageProps> = ({ location }) => {
  const searchResults: SearchResult[] = location.state?.searchResults || [];
  const selectedVehicleType = ""; // Declare the variable selectedVehicleType

  const setSelectedVehicleType = (type: string) => {
    // logic for setting the selected vehicle type
  };

  console.log(searchResults);

  // const TravelOptionsPage = ({ location }: { location: Location }) => {
  //   const searchResults: SearchResult[] = location.state?.searchResults || []; // Initialize searchResults with an empty array if it's undefined
  //   const selectedVehicleType = ""; // Declare the variable selectedVehicleType

  //   const setSelectedVehicleType = (type: string) => {
  //     // logic for setting the selected vehicle type
  //   };

  // Use searchResults in the TravelOptionsPage component
  // Render the search results or perform other actions
  // const location = useLocation();
  // const searchResults = location.state?.searchResults || [];
  // console.log(searchResults);
  return (
    <>
      <PrimaryNavBar />
      <TotalBlock2
        selectedVehicleType={selectedVehicleType}
        setSelectedVehicleType={setSelectedVehicleType}
      />
      {/*  Details cards should render in here } */
/* {searchResults.length > 0 ? (
        searchResults.map((result: SearchResult, index: number) => (
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
        ))
      ) : (
        <div>No search results found</div>
      )}
      <Footer />
    </>
  );
};

export default TravelOptionsPage; */

import React from "react";
import { useLocation } from "react-router-dom";

import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./TravelOptionsPage.css";

import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import TotalBlock2 from "../../Components/TravelSearchBlock/TotalBlock2";
import Footer from "../../Components/Footer/Footer";

// Define the SearchResult interface
interface SearchResult {
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

interface TravelOptionsPageProps {
  selectedVehicleType: string;
}

// Define the TravelOptionsPage component
const TravelOptionsPage: React.FC<TravelOptionsPageProps> = ({
  selectedVehicleType,
}) => {
  const location = useLocation();
  const searchResults: SearchResult[] = location.state?.searchResults || [];

  // Placeholder for selectedVehicleType and setSelectedVehicleType
  //const selectedVehicleType = "";
  const setSelectedVehicleType = () => {
    // logic for setting the selected vehicle type
  };

  const handleSearch = () => {
    // Add your search logic here
  };
  // Output searchResults for debugging
  console.log(searchResults);

  return (
    <>
      <PrimaryNavBar />
      <TotalBlock2
        selectedVehicleType={selectedVehicleType}
        setSelectedVehicleType={setSelectedVehicleType}
        onSearch={handleSearch}
        //setSelectedVehicleType={() => {}}
      />
      <div className="Travel-Option-Page-body d-flex ">
        <div className=" details-card-container d-flex flex-wrap justify-content-center  ">
          {/* Render DetailsCard components for each search result */}
          {searchResults.length > 0 ? (
            searchResults.map((result: SearchResult, index: number) => (
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
            ))
          ) : (
            <div>No search results found</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TravelOptionsPage;
