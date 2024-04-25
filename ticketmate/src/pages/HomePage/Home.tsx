import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./Home.css";
import Background from "./assests/Home Background.jpg";
import TotalBlock from "../../Components/TravelSearchBlock/TotalBlock";
import HomeContent from "../../Components/HomePageContent/HomeContent";
import Footer from "../../Components/Footer/Footer";
import SelectedVehicleTypeContext from "../../SelectedVehicleTypeContext";
import { SearchResult } from "../../SearchResult";
interface HomeProps {
  onSearch: React.Dispatch<React.SetStateAction<SearchResult[] | null>>;
}

const Home: React.FC<HomeProps> = ({ onSearch }) => {
  const { selectedVehicleType, setSelectedVehicleType } = useContext(
    SelectedVehicleTypeContext
  );

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
