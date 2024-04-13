import React from "react";

import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Footer from "../../Components/Footer/Footer";
import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import SeatMenu from "../../Components/Booking-SeatMenu/SeatMenu";
import TravelLable from "../../Components/Booking-TravelLable/TravelLable";
import TotalPriceLable from "../../Components/Booking-TotalPriceLable/TotalPriceLable";
import SeatStructure from "../../Components/Booking-SeatStructure/SeatStructure";

const BusBookingPage = () => {
  return (
    <div className="BusBooking">
      <PrimaryNavBar />
      <DetailsCard />
      <SeatMenu/>
      

      <div className="BusBookingBody row col-12 align-items-center justify-content-center   ">
        <div className="BusBookingBodyLeft col col-lg-6 col-12  align-items-center justify-content-center  ">
         <SeatStructure/> 
        </div>
        <div className="BusBookingBodyRight col col-lg-6 col-12  align-items-center justify-content-center ">
          <TravelLable />
          <TotalPriceLable />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusBookingPage;
