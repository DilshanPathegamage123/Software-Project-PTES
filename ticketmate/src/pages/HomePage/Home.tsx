import React from "react";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./Home.css";
import "../../vars.css";
import Background from "./assests/Home Background.jpg";
import TotalBlock from "../../Components/TravelSearchBlock/TotalBlock";
import HomeContent from "../../Components/HomePageContent/HomeContent";
import Footer from "../../Components/Footer/footer";
const Home = () => {
  return (
    <div className="Homebody">
      <PrimaryNavBar />
      <div className="HomeBackground container-fluid p-0   z-0   ">
        <img className="home-img" src={Background} alt="Background1" />
      </div>

      <TotalBlock />

      <HomeContent />

      <Footer />
    </div>
  );
};

export default Home;
