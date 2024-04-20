import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./Home.css";
import Background from "./assests/Home Background.jpg";
import TotalBlock from "../../Components/TravelSearchBlock/TotalBlock";
import HomeContent from "../../Components/HomePageContent/HomeContent";
import Footer from "../../Components/Footer/Footer";
const Home = () => {

interface HomeProps {
  onSearch: React.Dispatch<React.SetStateAction<SearchResult[] | null>>;
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

const Home: React.FC<HomeProps> = ({ onSearch }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState("");

  const navigate = useNavigate();

  // Function to handle search button click
  const handleSearch = async (results: SearchResult[]) => {
    // Navigate to the '/travel-options' route and pass search results as state
    navigate("/travel-options", {
      state: {
        searchResults: results,
        selectedVehicleType: selectedVehicleType,
      },
    });

    onSearch(results);
  };

  return (
    <div className=" HomeBody">
      <PrimaryNavBar />
      <div className="HomeBackground container-fluid p-0   z-0   ">
        <img className="img" src={Background} alt="Background1" />
      </div>

      <TotalBlock
        selectedVehicleType={selectedVehicleType}
        setSelectedVehicleType={setSelectedVehicleType}
        onSearch={handleSearch}
      />

      <HomeContent />

      <Footer />
    </div>
  );
};

export default Home;
