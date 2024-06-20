import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./TravelOptionsPage.css";

import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import TotalBlock2 from "../../Components/TravelSearchBlock/TotalBlock2";
import Footer from "../../Components/Footer/footer";

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
const TravelOptionsPage: React.FC<TravelOptionsPageProps> = () => {
  const location = useLocation();
  const searchResults: SearchResult[] = location.state?.searchResults || [];
  const selectedVehicleType: string = location.state?.selectedVehicleType || "";

  const navigate = useNavigate();

  const onSearch = async (results: SearchResult[]) => {};
  const handleSearch = async (results: SearchResult[]) => {
    // Wait for the search operation to complete
    await onSearch(results);

    // Then navigate to the TravelOptionsPage
    navigate("/travel-options", {
      state: {
        searchResults: results,
        selectedVehicleType: selectedVehicleType,
      },
    });
  };
  // Output searchResults for debugging
  console.log(searchResults);

  return (
    <>
      <PrimaryNavBar />
      <TotalBlock2
        selectedVehicleType={selectedVehicleType}
        //setSelectedVehicleType={setSelectedVehicleType}
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
            <div className=" h-auto mt-5 mb-5 p-4  ">
              No matching travel options found! Search another destination...
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TravelOptionsPage;
