import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

import BoardinPoint from "./BusBookingUpdatePageAssests/BoardingPoint.png";
import DroppingPoint from "./BusBookingUpdatePageAssests/DroppingPoint.png";
import ProgresLine from "./BusBookingUpdatePageAssests/ProgressLine.png";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Footer from "../../Components/Footer/footer";
import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import SeatMenu from "../../Components/Booking-SeatMenu/SeatMenu";
import TravelLable from "../../Components/Booking-TravelLable/TravelLable";
import TotalPriceLable from "../../Components/Booking-TotalPriceLable/TotalPriceLable";
import BusSeatStructure from "../../Components/Booking-SeatStructure/BusSeatStructure";
import "../Bus-BookingPage/BusBookingPage.css";
import PrimaryNavBar_logout from "../../Components/NavBar/PrimaryNavBar-logout";


const getToken = () => {
  return sessionStorage.getItem("token");
};

type BusStand = {
  id: number;
  busStation: string;
  scheduledBusScheduleId: number;
  standArrivalTime: string;
};

type ScheduledBusDate = {
  id: number;
  departureDate: string;
  arrivalDate: string;
  scheduledBusScheduleId: number;
};

type BusScheduleDetails = {
  scheduleId: number;
  registeredBusBusId: number;
  busNo: string;
  driverId: number;
  routNo: string;
  startLocation: string;
  endLocation: string;
  departureTime: string;
  arrivalTime: string;
  comfortability: string;
  duration: string;
  ticketPrice: number;
  selectedBusStands: BusStand[];
  scheduledBusDatesList: ScheduledBusDate[];
  registeredBus: any;
};

type BusDetailsWithSeats = {
  registeredBus: {
    setsCount: number;
    aCorNONAC: boolean;
    busName: string;
  };
  selectedSeatStructures: {
    $values: any[];
  };
};

export interface Feedback {
  feedBackId: number;
  busId: number;
  bookingId: number;
  passengerId: string;
  rate: number;
  feedBack: string;
  givenDate: string;
}

const BusBookingUpdatePage: React.FC = () => {
  const location = useLocation();
  const booking = location.state.booking;
  const username = location.state.username;
  const password = location.state.password;

  console.log("Bus Booking:", booking);
  console.log(username);
  console.log(password);

  const [busDetailsWithSeats, setBusDetailsWithSeats] =
    useState<BusDetailsWithSeats | null>(null);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<number[]>([]);
  const [selectedSeatLocations, setSelectedSeatLocations] = useState<number[]>(
    []
  );
  const [busScheduleDetails, setBusScheduleDetails] =
    useState<BusScheduleDetails | null>(null);
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
  const [selectedDate, setSelectedDate] = useState<string>(booking.bookingDate);

  console.log(booking.id);
  const [currentBookingSeats, setCurrentBookingSeats] = useState<number[]>([]);

  const [busName, setBusName] = useState("");

  useEffect(() => {
    const fetchBusDetails = async () => {

      Swal.fire({
        title: 'Loading...',
        text: 'Loading vehicle details. Please wait.',
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        // Fetch bus schedule details
        const busScheduleDetailsResponse = await axios.get(
          `https://localhost:7048/api/GetBusScheduleDetails/${booking.busScheduleId}`
        );
        const busScheduleDetailsData = busScheduleDetailsResponse.data;
        console.log("Bus Schedule Details:", busScheduleDetailsData);

        // Fetch bus details with seats
        const busDetailsWithSeatsResponse = await axios.get(
          `https://localhost:7048/api/GetBusDetails/${busScheduleDetailsData.registeredBusBusId}`
        );
        const busDetailsWithSeatsData = busDetailsWithSeatsResponse.data;
        console.log("Bus Details With Seats:", busDetailsWithSeatsData);

        // Fetch booked seats
        const bookedSeatsResponse = await axios.get(
          `https://localhost:7048/api/GetBookingsofBusSchedule/${booking.busScheduleId}?selectedDate=${selectedDate}`
        );
        const bookedSeatsData = bookedSeatsResponse.data?.$values || [];
        const bookedSeatsList = bookedSeatsData.flatMap((booking: any) =>
          booking.bookingSeatNO.split(",").map(Number)
        );
        console.log("Booked Seats Data:", bookedSeatsData);
        console.log("Booked Seats List:", bookedSeatsList);

        const userBookedSeats = booking.bookingSeatNO.split(",").map(Number);

        setBusScheduleDetails(busScheduleDetailsData);
        setBusDetailsWithSeats(busDetailsWithSeatsData);
        setBookedSeats(bookedSeatsList);
        setCurrentBookingSeats(userBookedSeats);
        setSelectedSeatNumbers(userBookedSeats);
        setSelectedSeatLocations(userBookedSeats);
        Swal.close();
      } catch (error) {
        Swal.close();
        Swal.fire('Error', 'Error fetching bus details or booked seats.', 'error');
        console.error("Error fetching bus details or booked seats:", error);
      }
    };

    fetchBusDetails();
  }, [booking.busScheduleId, booking.scheduleId, selectedDate]);

  console.log("Booked Seats:", bookedSeats);
  console.log("Selected Seats:", selectedSeatNumbers);
  console.log("Bus Schedule Details:", busScheduleDetails);
  console.log("Bus Details With Seats:", busDetailsWithSeats);
  console.log("Bus Details With Seats:", currentBookingSeats);

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

  const navigate = useNavigate();

  const handleSave = async () => {
    const bookedSeatCount = currentBookingSeats.length;
    const selectedSeatCount = selectedSeatNumbers.length;

    if (selectedSeatCount !== bookedSeatCount) {
      Swal.fire({
        icon: 'info',
        title: 'Information',
        text: `You have to select ${bookedSeatCount} seats for saving`,
    });
      return;
    }

    // Convert the array to a comma-separated string
    const bookingSeatNO = selectedSeatNumbers.join(",");

    try {
      // Update booked seats
      await axios.put(
        `https://localhost:7048/api/UpdateBusBooking/${booking.id}`,
        bookingSeatNO,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(booking.busBookingId, bookingSeatNO);
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Seats booked successfully!',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            // Navigate to the passenger profile page
            navigate("/passenger", { state: { username, password } });
        }
    });
    } catch (error) {
      console.error("Error updating booked seats:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save seats. Please try again.',
    });
    }
  };

  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const busId = booking.busId || 0;
  console.log(busId);

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
        {(getToken() !== null)?  <span data-testid="navbar"><PrimaryNavBar_logout /></span>:<span data-testid="navbar"><PrimaryNavBar /></span>}
      <div className=" d-flex justify-content-center align-items-center pt-3">
        {busScheduleDetails ? (
          <DetailsCard
            isBookingPage
            onBookNow={() => {}}
            VehicleId={busScheduleDetails?.registeredBusBusId}
            scheduleId={busScheduleDetails?.scheduleId.toString()} // Convert number to string
            vehicleNo={busScheduleDetails?.busNo}
            routNo={busScheduleDetails?.routNo}
            startLocation={busScheduleDetails?.startLocation}
            endLocation={busScheduleDetails?.endLocation}
            departureTime={busScheduleDetails?.departureTime}
            arrivalTime={busScheduleDetails?.arrivalTime}
            comfortability={busScheduleDetails?.comfortability}
            duration={busScheduleDetails?.duration}
            ticketPrice={busScheduleDetails?.ticketPrice}
            selectedStands={{
              $id: "placeholder",
              $values: busScheduleDetails?.selectedBusStands,
            }}
            scheduledDatesList={{
              $id: "placeholder",
              $values: busScheduleDetails?.scheduledBusDatesList,
            }}
            VehicleType="Bus"
            BookingDate={booking.bookingDate}
          />
        ) : (
          <p>Loading details...</p>
        )}
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
              currentBookingSeats={currentBookingSeats}
            />
          )}
        </div>
        <div className="BusBookingBodyRight col col-lg-6 col-md-12 col-12  align-items-center justify-content-center me-lg-auto">
          <div className=" mb-4 ">
            <TravelLable
              availableSeats={
                busDetailsWithSeats
                  ? busDetailsWithSeats.registeredBus.setsCount -
                    bookedSeats.length +
                    currentBookingSeats.length
                  : 0
              }
              isAC={
                busDetailsWithSeats
                  ? busDetailsWithSeats.registeredBus.aCorNONAC
                  : false
              }
              ticketPrice={busScheduleDetails?.ticketPrice || 0}
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
                {booking.boardingPoint}
              </div>
              <div className="BDPointsStartTime justify-content-center align-items-center m-auto fs-6 fw-medium  ">
                {booking.startTime}
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
                {booking.droppingPoint}
              </div>
              <div className="BDPointsEndTime justify-content-center align-items-center m-auto fs-6 fw-medium">
                {booking.endTime}
              </div>
            </div>
          </div>
          {/* Display selected seat numbers */}{" "}
          <div className=" d-flex justify-content-center pt-5 fs-5 h-auto ">
            Selected Seats:{" "}
            {selectedSeatLocations.length > 0
              ? selectedSeatLocations.sort((a, b) => a - b).join(", ") // Sort the seat locations in ascending order
              : "None"}
          </div>
          <TotalPriceLable
            totalPrice={
              busScheduleDetails
                ? selectedSeatNumbers.length * busScheduleDetails.ticketPrice
                : 0
            }
            passengers={selectedSeatNumbers.length}
            buttonText="Save"
            onSave={handleSave}
             mode="update"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusBookingUpdatePage;
