import React from "react";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./TravelOptionsPage.css";

import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import TotalBlock2 from "../../Components/TravelSearchBlock/TotalBlock2";
import Footer from "../../Components/Footer/Footer";

const TravelOptionsPage = () => {
  return (
    <>
      <PrimaryNavBar />
      <TotalBlock2 />
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
