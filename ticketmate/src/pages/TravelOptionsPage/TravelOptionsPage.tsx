import React , {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./TravelOptionsPage.css";

import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import TotalBlock2 from "../../Components/TravelSearchBlock/TotalBlock2";
import Footer from "../../Components/Footer/Footer";
import { SearchResult } from "../../SearchResult";

interface TravelOptionsPageProps {
  selectedVehicleType: string;
}

// Define the TravelOptionsPage component
const TravelOptionsPage: React.FC<TravelOptionsPageProps> = () => {
  const location = useLocation();
  let searchResults: SearchResult[] = location.state?.searchResults || [];
  let selectedVehicleType: string = location.state?.selectedVehicleType || "";
  
  // location.state is used to pass state data from one route to another 
  // If location.state is un defined, try to retrieve the data from the session storage
  if (!location.state) {
    const storedSearchResults = sessionStorage.getItem("searchResults");
    const storedSelectedVehicleType = sessionStorage.getItem(
      "selectedVehicleType"
    );

    searchResults = storedSearchResults ? JSON.parse(storedSearchResults) : [];
    selectedVehicleType = storedSelectedVehicleType || "";
  }

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
 
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);

  const handleBookNow = (VehicleId: number) => {
    setSelectedVehicleId(VehicleId);
  };



  return (
    <>
      <PrimaryNavBar />
      <TotalBlock2
        selectedVehicleType={selectedVehicleType}
        //setSelectedVehicleType={setSelectedVehicleType}
        onSearch={onSearch}
        //setSelectedVehicleType={() => {}}
      />
      <div className="Travel-Option-Page-body d-flex ">
        <div className=" details-card-container d-flex flex-wrap justify-content-center  ">
          {/* Render DetailsCard components for each search result */}
          {searchResults.length > 0 ? (
            searchResults.map((result: SearchResult, index: number) => (

              
              
              <DetailsCard
                key={index}
                onBookNow={handleBookNow}
                VehicleId={result.VehicleId}
                scheduleId={result.scheduleId}
                vehicleNo={result.vehicleNo}
                routNo={result.routNo}
                startLocation={result.startLocation}
                endLocation={result.endLocation}
                departureTime={result.departureTime}
                arrivalTime={result.arrivalTime}
                comfortability={result.comfortability}
                duration={result.duration}
                ticketPrice={result.ticketPrice}
                selectedStands={result.selectedStands}
                scheduledDatesList={result.scheduledDatesList}
                firstClassTicketPrice={result.firstClassTicketPrice}
                secondClassTicketPrice={result.secondClassTicketPrice}

                
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
