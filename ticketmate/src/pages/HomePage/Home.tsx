import React, { useState } from "react";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./Home.css";
import Background from "./assests/Home Background.jpg";
import TotalBlock from "../../Components/TravelSearchBlock/TotalBlock";
import HomeContent from "../../Components/HomePageContent/HomeContent";
import Footer from "../../Components/Footer/footer";
const Home = () => {
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  return (
    <div className=" HomeBody">
      <PrimaryNavBar />
      <div className="HomeBackground container-fluid p-0   z-0   ">
        <img className="img" src={Background} alt="Background1" />
      </div>

      <TotalBlock
        selectedVehicleType={selectedVehicleType}
        setSelectedVehicleType={setSelectedVehicleType}
      />

      

      <HomeContent />

      <Footer />
    </div>
  );
};

export default Home;
