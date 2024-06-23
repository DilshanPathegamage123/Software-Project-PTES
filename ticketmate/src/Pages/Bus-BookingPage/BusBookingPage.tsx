import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import BoardinPoint from "./BusBookingPageAssests/BoardingPoint.png";
import DroppingPoint from "./BusBookingPageAssests/DroppingPoint.png";
import ProgresLine from "./BusBookingPageAssests/ProgressLine.png";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Footer from "../../Components/Footer/footer";
import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import SeatMenu from "../../Components/Booking-SeatMenu/SeatMenu";
import TravelLable from "../../Components/Booking-TravelLable/TravelLable";
import TotalPriceLable from "../../Components/Booking-TotalPriceLable/TotalPriceLable";
import SeatStructure from "../../Components/Booking-SeatStructure/SeatStructure";
import { SearchResult } from "../../SearchResult";
import "./BusBookingPage.css";

const BusBookingPage: React.FC = () => {
  const location = useLocation();

  const [busDetailsWithSeats, setBusDetailsWithSeats] = useState<any>(null);

  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<number[]>([]);

  const [selectedSeatLocations, setSelectedSeatLocations] = useState<number[]>(
    []
  );

  //const [selectedClass, setSelectedClass] = useState<string>("1st"); //To keep tracking which class is selected in the trains

  const [busDetails, setBusDetails] = useState<SearchResult>(
    location.state as SearchResult
  );
  const [startStandTime, setStartStandTime] = useState<string>(
    sessionStorage.getItem("startStandTime") || ""
  );
  const [endStandTime, setEndStandTime] = useState<string>(
    sessionStorage.getItem("endStandTime") || ""
  );
  const [selectedStartLocation, setSelectedStartLocation] = useState<string>(
    sessionStorage.getItem("selectedStartLocation") || ""
  );
  const [selectedEndLocation, setSelectedEndLocation] = useState<string>(
    sessionStorage.getItem("selectedEndLocation") || ""
  );

  const [selectedvehicleType, setSelectedVehicleType] = useState<string>(
    sessionStorage.getItem("selectedVehicleType") || ""
  );

  // const [scheduleId, setScheduleId] = useState<string>(
  //   sessionStorage.getItem("scheduleId") || ""
  // );

  // const [TicketPrice, setTicketPrice] = useState<number>(
  //   busDetails.ticketPrice
  // );
  // Set ticket price is according to selected vehicle type and selected class (Only for trains)
  //const [isAC, setIsAC] = useState<boolean>(false);

  console.log(busDetails.VehicleId);

  console.log(selectedvehicleType);

  useEffect(() => {
    if (location.state) {
      const stateData = location.state as any;
      console.log(stateData);
      setBusDetails(stateData as SearchResult);
    }
  }, [location.state]);

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
        console.log(response);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };

    fetchBusDetails();
  }, [busDetails]);

  // useEffect(() => {
  //   const fetchVehicleDetails = async () => {
  //     if (!busDetails || (!busDetails.VehicleId && !scheduleId)) {
  //       console.error("Vehicle details, VehicleId or scheduleId is undefined");
  //       return;
  //     }

  //     let url = '';
  //     if (selectedvehicleType === 'Train') {
  //       url = `https://localhost:7048/api/GetTrainDetails/${scheduleId}`;
  //     } else {
  //       url = `https://localhost:7048/api/GetBusDetails/${busDetails.VehicleId}`;
  //     }

  //     try {
  //       const response = await axios.get(url);
  //       setBusDetailsWithSeats(response.data);
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Error fetching vehicle details:", error);
  //     }
  //   };

  //   fetchVehicleDetails();
  // }, [busDetails]);

  console.log(busDetailsWithSeats);
  console.log("Location State:", location.state);

  console.log(selectedStartLocation);
  console.log(selectedEndLocation);
  console.log(startStandTime);
  console.log(endStandTime);

  const handleSeatSelected = (isSelected: boolean, seatNumber: number) => {
    if (isSelected) {
      setSelectedSeatNumbers([...selectedSeatNumbers, seatNumber]);
      setSelectedSeatLocations([...selectedSeatLocations, seatNumber]);
    } else {
      setSelectedSeatNumbers(
        selectedSeatNumbers.filter((number) => number !== seatNumber)
      );
      setSelectedSeatLocations(
        selectedSeatLocations.filter((location) => location !== seatNumber)
      );
    }
  };

  console.log("Selected Seat Locations:", selectedSeatLocations);

  // useEffect(() => {

  //   if (selectedvehicleType === "Train") {
  //     if (selectedClass === "1st") {
  //       setTicketPrice(busDetails.firstClassTicketPrice || 0);
  //       setIsAC(true);
  //     } else if (selectedClass === "2nd") {
  //       setTicketPrice(busDetails.secondClassTicketPrice || 0);
  //       setIsAC(false);
  //     }
  //   } else if (selectedvehicleType === "Bus") {
  //     setTicketPrice(busDetails.ticketPrice);
  //     setIsAC(busDetailsWithSeats ? busDetailsWithSeats.registeredBus.aCorNONAC : false);

  //   }
  // }, [selectedClass, selectedvehicleType, busDetailsWithSeats]);

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
          {/* Render only for trains */}
          {/* {selectedvehicleType === "Train" && (
            <div className="d-flex justify-content-start align-items-center">
              <button
                className={`classbtn btn SignUpNow btn-sm fw-semibold fs-5 m-2 ${
                  selectedClass === "1st" ? "selected" : "default"
                }`}
                onClick={() => setSelectedClass("1st")}
              >
                1st Class
              </button>
              <button
                className={`classbtn btn SignUpNow btn-sm fw-semibold fs-5 m-2 ${
                  selectedClass === "2nd" ? "selected" : "default"
                }`}
                onClick={() => setSelectedClass("2nd")}
              >
                2nd Class
              </button>
            </div>
          )} */}

          {/* Pass the seat structure to the SeatStructure component */}
          {busDetailsWithSeats && (
            <SeatStructure
              seatStructure={busDetailsWithSeats.selectedSeatStructures.$values}
              onSeatSelected={handleSeatSelected}
              selectedSeatNumbers={selectedSeatNumbers}
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
          {/* Display boarding and dropping points */}
          <div className="BDPoints row col-12 h-auto d-flex pt-5 pb-5  mt-5   ">
            <div className="BDPointsStart Left col-2 justify-content-center align-items-center m-auto d-grid  ">
              <div className="BoardingPoint justify-content-center align-items-center m-auto p-2">
                <img src={BoardinPoint} alt="Icon" />
              </div>
              <div className="BDPointsStartLocation justify-content-center align-items-center m-auto fs-5 fw-medium ">
                {selectedStartLocation}
              </div>
              <div className="BDPointsStartTime justify-content-center align-items-center m-auto fs-6 fw-medium  ">
                {startStandTime}
              </div>
            </div>
            <div className="Middle col-5 justify-content-center align-items-center m-auto d-grid ">
              <img
                src={ProgresLine}
                alt="icon"
                className="justify-content-center align-items-center p-0 "
              />
            </div>
            <div className="BDPointsEnd Right col-2 justify-content-center align-items-center m-auto d-grid">
              <div className="DroppingPoint justify-content-center align-items-center m-auto p-2">
                <img src={DroppingPoint} alt="icon" />
              </div>
              <div className="BDPointsEndLocation justify-content-center align-items-center m-auto fs-5 fw-medium">
                {selectedEndLocation}
              </div>
              <div className="BDPointsEndTime justify-content-center align-items-center m-auto fs-6 fw-medium ">
                {endStandTime}
              </div>
            </div>
          </div>
          {/* Display selected seat numbers */}
          <div className=" d-flex justify-content-center pt-5 fs-5 ">
            Selected Seats:{" "}
            {selectedSeatLocations.length > 0
              ? selectedSeatLocations.sort((a, b) => a - b).join(", ") // Sort the seat locations in ascending order
              : "None"}
          </div>
          <div className=" mt-4 ">
            <TotalPriceLable
              passengers={selectedSeatNumbers.length}
              totalPrice={selectedSeatNumbers.length * busDetails.ticketPrice}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusBookingPage;
