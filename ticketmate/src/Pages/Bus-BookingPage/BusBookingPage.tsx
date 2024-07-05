import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import BoardinPoint from "./BusBookingPageAssests/BoardingPoint.png";
import DroppingPoint from "./BusBookingPageAssests/DroppingPoint.png";
import ProgresLine from "./BusBookingPageAssests/ProgressLine.png";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Footer from "../../Components/Footer/footer";
import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import SeatMenu from "../../Components/Booking-SeatMenu/SeatMenu";
import TravelLable from "../../Components/Booking-TravelLable/TravelLable";
import TotalPriceLable from "../../Components/Booking-TotalPriceLable/TotalPriceLable";
import BusSeatStructure from "../../Components/Booking-SeatStructure/BusSeatStructure";
import { SearchResult } from "../../SearchResult";
import "./BusBookingPage.css";
import ReviewList from "../../Components/FeedBackSection/ReviewList";

export interface Feedback {
  feedBackId: number;
  busId: number;
  bookingId: number;
  passengerId: string;
  rate: number;
  feedBack: string;
  givenDate: string;
}

const BusBookingPage: React.FC = () => {
  const location = useLocation();

  const [busDetailsWithSeats, setBusDetailsWithSeats] = useState<any>(null);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<number[]>([]);
  const [selectedSeatLocations, setSelectedSeatLocations] = useState<number[]>(
    []
  );
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
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>(
    sessionStorage.getItem("selectedVehicleType") || ""
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    sessionStorage.getItem("selectedDate") || ""
  );

  const [busName, setBusName] = useState("");

  useEffect(() => {
    if (location.state) {
      const stateData = location.state as any;
      setBusDetails(stateData as SearchResult);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchBusDetails = async () => {
      if (!busDetails || !busDetails.VehicleId) {
        console.error("Bus details or VehicleId is undefined");
        return;
      }

    Swal.fire({
      title: 'Loading...',
      text: 'Loading vehicle details. Please wait.',
      didOpen: () => {
        Swal.showLoading();
      },
    });

      try {
        const busDetailsResponse = await axios.get(
          `https://localhost:7048/api/GetBusDetails/${busDetails.VehicleId}`
        );
        setBusDetailsWithSeats(busDetailsResponse.data);

        const bookedSeatsResponse = await axios.get(
          `https://localhost:7048/api/GetBookingsofBusSchedule/${busDetails.scheduleId}?selectedDate=${selectedDate}`
        );
        const bookedSeatsData = bookedSeatsResponse.data?.$values || [];
        const bookedSeatsList = bookedSeatsData.flatMap((booking: any) =>
          booking.bookingSeatNO.split(",").map(Number)
        );
        console.log("Booked Seats:", bookedSeatsList);
        setBookedSeats(bookedSeatsList);
        Swal.close();
      } catch (error) {
        Swal.close();
      Swal.fire('Error', 'Error fetching bus details or booked seats.', 'error');
        console.error("Error fetching bus details or booked seats:", error);
      }
    };

    fetchBusDetails();
  }, [busDetails, selectedDate]);

  console.log("Booked Seats:", bookedSeats);
  console.log("Bus Details:", busDetails);
  console.log("Bus Details with seats:", busDetailsWithSeats);

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

  console.log(busDetails.scheduledDatesList.$values[0].departureDate);

  sessionStorage.setItem("BusScheduleId", Number(busDetails.scheduleId).toString());
  sessionStorage.setItem("VehicleId", busDetails.VehicleId.toString());
  sessionStorage.setItem("RouteNo", busDetails.routNo);
  sessionStorage.setItem("StartLocation", busDetails.startLocation);
  sessionStorage.setItem("EndLocation", busDetails.endLocation);
  sessionStorage.setItem("BoardingPoint", selectedStartLocation);
  sessionStorage.setItem("DroppingPoint", selectedEndLocation);
  sessionStorage.setItem("StartTime", startStandTime);
  sessionStorage.setItem("EndTime", endStandTime);
  sessionStorage.setItem("BookingSeatNO", JSON.stringify(selectedSeatNumbers));
  sessionStorage.setItem(
    "BookingSeatCount",
    selectedSeatNumbers.length.toString()
  );
  sessionStorage.setItem("TicketPrice", busDetails.ticketPrice.toString());
  sessionStorage.setItem(
    "TotalPaymentAmount",
    (selectedSeatNumbers.length * busDetails.ticketPrice).toString()
  );
  sessionStorage.setItem(
    "departureDate",
    busDetails.scheduledDatesList.$values[0].departureDate
  );



  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const busId = busDetails.VehicleId || 0;

  console.log(
    busDetails.scheduleId,
    busDetails.VehicleId,
    busDetails.routNo,
    busDetails.startLocation,
    busDetails.endLocation,
    selectedStartLocation,
    selectedEndLocation,
    startStandTime,
    endStandTime,
    selectedSeatNumbers.toString(),
    selectedSeatNumbers.length,
    busDetails.ticketPrice,
    selectedSeatNumbers.length * busDetails.ticketPrice,

  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching feedback with params:", {
          busId,
        });

        const response = await axios.get(
          `https://localhost:7048/api/GetFeedbacksForBus`,
          {
            params: { busId },
          }
        );

        console.log("API response:", response.data);

        const feedbackArray = response.data.$values || [];
        setFeedback(feedbackArray);
        console.log("Fetched feedback:", feedbackArray);

        if (feedbackArray.length > 0) {
          const totalRating = feedbackArray.reduce(
            (sum: number, item: Feedback) => sum + item.rate,
            0
          );
          const avgRating = totalRating / feedbackArray.length;
          setAverageRating(avgRating);
        } else {
          setAverageRating(null);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        //setIsLoading(false);
      }
    };

    if (busId) {
      fetchData();
    }
  }, [busId]);
  console.log("Fetched feedback:", averageRating);

  useEffect(() => {
    if (busDetailsWithSeats && busDetailsWithSeats.registeredBus) {
      const Bus = busDetailsWithSeats.registeredBus;
      console.log(Bus);
      if (Bus) {
        const TrainName = Bus.busName;
        console.log(TrainName);
        setBusName(TrainName);
      }
    }
  }, [busDetailsWithSeats]);

  console.log(busName);

  return (
    <div className="BusBooking">
      <PrimaryNavBar />
      <div className=" d-flex justify-content-center align-items-center pt-3">
        <DetailsCard
          isBookingPage
          onBookNow={() => {}}
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

      <div className="row BusBooking m-auto h-auto justify-content-center align-content-center">
        <div className="BusBookingBodyLeft col col-lg-4 col-md-12 col-12 align-items-center justify-content-center ms-lg-auto ms-lg-auto  ">
          {busDetailsWithSeats && (
            <BusSeatStructure
              seatStructure={busDetailsWithSeats.selectedSeatStructures.$values}
              onSeatSelected={handleSeatSelected}
              selectedSeatNumbers={selectedSeatNumbers}
              bookedSeats={bookedSeats}
              currentBookingSeats={[]}
            />
          )}
        </div>
        <div className="BusBookingBodyRight col col-lg-6 col-md-12 col-12  align-items-center justify-content-center me-lg-auto">
          <div
            className=" mb
          -4 "
          >
            <TravelLable
              availableSeats={
                busDetailsWithSeats
                  ? busDetailsWithSeats.registeredBus.setsCount -
                    bookedSeats.length
                  : 0
              }
              isAC={
                busDetailsWithSeats
                  ? busDetailsWithSeats.registeredBus.aCorNONAC
                  : false
              }
              ticketPrice={busDetails.ticketPrice}
              totalSeats={busDetailsWithSeats?.registeredBus.setsCount || 0}
              rate={averageRating}
              vehicleName={busName}
            />
          </div>
          <div className="BDPoints row col-12 h-auto d-flex pt-5 pb-5  mt-5 ms-auto  ">
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
              <div className="BDPointsEndTime justify-content-center align-items-center m-auto fs-6 fw-medium">
                {endStandTime}
              </div>
            </div>
          </div>
          {/* Display selected seat numbers */}
          <div className=" d-flex justify-content-center pt-5 fs-5 h-auto ">
            Selected Seats:{" "}
            {selectedSeatLocations.length > 0
              ? selectedSeatLocations.sort((a, b) => a - b).join(", ") // Sort the seat locations in ascending order
              : "None"}
          </div>
          <TotalPriceLable
            passengers={selectedSeatNumbers.length}
            totalPrice={selectedSeatNumbers.length * busDetails.ticketPrice}
            BusScheduleId={busDetails.scheduleId}
            VehicleId={busDetails.VehicleId}
            RouteNo={busDetails.routNo}
            StartLocation={busDetails.startLocation}
            EndLocation={busDetails.endLocation}
            BoardingPoint={selectedStartLocation}
            DroppingPoint={selectedEndLocation}
            StartTime={startStandTime}
            EndTime={endStandTime}
            BookingSeatNO={selectedSeatNumbers.toString()}
            BookingSeatCount={selectedSeatNumbers.length}
            TicketPrice={busDetails.ticketPrice}
            TotalPaymentAmount={
              selectedSeatNumbers.length * busDetails.ticketPrice
            }
            departureDate={
              busDetails.scheduledDatesList.$values[0].departureDate
            }
           // disableButton={selectedSeatNumbers.length === 0}
          />
        </div>
      </div>

      <ReviewList busId={busDetails.VehicleId} />
      <Footer />
    </div>
  );
};

export default BusBookingPage;
