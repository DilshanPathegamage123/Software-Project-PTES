import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Footer from "../../Components/Footer/Footer";
import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import SeatMenu from "../../Components/Booking-SeatMenu/SeatMenu";
import TravelLable from "../../Components/Booking-TravelLable/TravelLable";
import TotalPriceLable from "../../Components/Booking-TotalPriceLable/TotalPriceLable";
import SeatStructure from "../../Components/Booking-SeatStructure/SeatStructure";
import { SearchResult } from "../../SearchResult";

const BusBookingPage: React.FC = () => {
  const location = useLocation();
  const busDetails = location.state as SearchResult;
  console.log(busDetails.VehicleId);

  const [busDetailsWithSeats, setBusDetailsWithSeats] = useState<any>(null);

  const [selectedSeats, setSelectedSeats] = useState<number>(0);

  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<number[]>([]);

  useEffect(() => {
    const fetchBusDetails = async () => {
      if (!busDetails || !busDetails.VehicleId) {
        console.error("Bus details or VehicleId is undefined");
        return;
      }

      try {
        const response = await axios.get(
          `https://localhost:7048/api/GetBusDetails/${busDetails.VehicleId}`
        );
        setBusDetailsWithSeats(response.data);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };

    fetchBusDetails();
  }, [busDetails]);

  console.log(busDetailsWithSeats);

  const handleSeatSelected = (isSelected: boolean, seatNumber: number) => {
    if (isSelected) {
      setSelectedSeatNumbers((prevSelectedSeatNumbers) => [
        ...prevSelectedSeatNumbers,
        seatNumber,
      ]);
    } else {
      setSelectedSeatNumbers((prevSelectedSeatNumbers) =>
        prevSelectedSeatNumbers.filter((num) => num !== seatNumber)
      );
    }
  };

  return (
    <div className="BusBooking">
      <PrimaryNavBar />
      <div className=" d-flex justify-content-center align-items-center pt-3">
        <DetailsCard
          isBookingPage
          onBookNow={() => {}} //empty function because Book now button is disabled in this page.
          VehicleId={busDetails.VehicleId}
          scheduleId={busDetails.scheduleId}
          vehicleNo={busDetails.vehicleNo}
          routNo={busDetails.routNo}
          startLocation={busDetails.startLocation}
          endLocation={busDetails.endLocation}
          departureTime={busDetails.departureTime}
          arrivalTime={busDetails.arrivalTime}
          comfortability={busDetails.comfortability}
          duration={busDetails.duration}
          ticketPrice={busDetails.ticketPrice}
          selectedStands={busDetails.selectedStands}
          scheduledDatesList={busDetails.scheduledDatesList}
          firstClassTicketPrice={busDetails.firstClassTicketPrice}
          secondClassTicketPrice={busDetails.secondClassTicketPrice}
        />
      </div>
      <SeatMenu />

      <div className="BusBooking d-flex m-auto justify-content-center align-content-center ">
        <div className="BusBookingBodyLeft col col-lg-4 col-md-12 col-10  m-auto  ">
          {/* Pass the seat structure to the SeatStructure component */}
          {busDetailsWithSeats && (
            <SeatStructure
              seatStructure={busDetailsWithSeats.selectedSeatStructures.$values}
              onSeatSelected={handleSeatSelected}
              // onSeatSelected={(isSelected) => {
              //   setSelectedSeats((prev) => prev + (isSelected ? 1 : -1));
              // }}
            />
          )}
        </div>
        <div className="BusBookingBodyRight  col col-lg-6 col-md-12 col-10  align-items-center justify-content-center m-auto  mt-0  ">
          <div className=" mb-4 ">
            <TravelLable
              availableSeats={
                busDetailsWithSeats
                  ? busDetailsWithSeats.registeredBus.setsCount
                  : 0
              }
              isAC={
                busDetailsWithSeats
                  ? busDetailsWithSeats.registeredBus.aCorNONAC
                  : false
              }
              ticketPrice={busDetails.ticketPrice}
            />
          </div>
          <div className=" mt-4 ">
            <TotalPriceLable
              passengers={selectedSeatNumbers.length}
              totalPrice={selectedSeatNumbers.length * busDetails.ticketPrice}
            />
            {/* Display selected seat numbers */}
            <div>
              Selected Seats:{" "}
              {selectedSeatNumbers.length > 0
                ? selectedSeatNumbers.join(", ")
                : "None"}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusBookingPage;
