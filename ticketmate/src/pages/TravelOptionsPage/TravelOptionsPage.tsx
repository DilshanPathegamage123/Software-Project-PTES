import React from "react";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./TravelOptionsPage.css";

import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import TotalBlock2 from "../../Components/TravelSearchBlock/TotalBlock2";
import Footer from "../../Components/Footer/Footer";

const TravelOptionsPage = () => {
  const selectedVehicleType = ""; // Declare the variable selectedVehicleType

  const setSelectedVehicleType = (type: string) => {
    // logic for setting the selected vehicle type
  };

  return (
    <>
      <PrimaryNavBar />
      <TotalBlock2
        selectedVehicleType={selectedVehicleType}
        setSelectedVehicleType={setSelectedVehicleType}
      />
      <DetailsCard/>
      <DetailsCard/>
      <DetailsCard/>
      <DetailsCard/>
      <DetailsCard/>
      <Footer />
    </>
  );
};

export default TravelOptionsPage;
