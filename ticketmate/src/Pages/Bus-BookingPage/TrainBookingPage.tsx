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
import TrainSeatStructure from "../../Components/Booking-SeatStructure/TrainSeatStructure";
import { SearchResult } from "../../SearchResult";
import TrainReviewList from "../../Components/FeedBackSection/TrainReviewList";

export interface Feedback {
  feedBackId: number;
  busId?: number;
  trainScheduleId?: number;
  trainName?: string;
  bookingId: number;
  passengerId: string;
  rate: number;
  feedBack: string;
  givenDate: string;
}

interface Booking {
  bookingClass: string;
  bookingCarriageNo: number;
  bookingSeatNO: string;
}

const TrainBookingPage: React.FC = () => {
  const location = useLocation();

  const [trainDetailsWithSeats, setTrainDetailsWithSeats] = useState<any>(null);
  const [bookedSeats, setBookedSeats] = useState<{
    [classType: string]: { [carriageNo: number]: number[] };
  }>({});

  const [selectedSeats, setSelectedSeats] = useState<
    { carriageIndex: number; seatNumber: number }[]
  >([]);

  const [selectedSeatLocations, setSelectedSeatLocations] = useState<number[]>(
    []
  );

  const [selectedClass, setSelectedClass] = useState<string>("1st");

  const [scheduleId, setScheduleId] = useState<string>(
    sessionStorage.getItem("scheduleId") || ""
  );
  const [trainDetails, setTrainDetails] = useState<SearchResult>(
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

  const [selectedDate, setSelectedDate] = useState<string>(
    sessionStorage.getItem("selectedDate") || ""
  );

  const [ticketPrice, setTicketPrice] = useState<number>(
    trainDetails.ticketPrice
  );

  const [currentCarriageIndex, setCurrentCarriageIndex] = useState(0);
  const [selectedClassCarriages, setSelectedClassCarriages] = useState<any[]>(
    []
  );

  const [trainName, setTrainName] = useState("");

  useEffect(() => {
    if (location.state) {
      const stateData = location.state as any;
      setTrainDetails(stateData as SearchResult);
    }
  }, [location.state]);

  console.log(trainDetails);
  console.log(trainDetails.scheduleId);
  useEffect(() => {
    const fetchTrainDetails = async () => {
      if (!trainDetails || !trainDetails.scheduleId) {
        console.error("Train details or ScheduleId is undefined");
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
        const response = await axios.get(
          `https://localhost:7048/api/GetTrainDetails/${trainDetails.scheduleId}`
        );
        setTrainDetailsWithSeats(response.data);
        console.log("Train Details with seats:", trainDetailsWithSeats);

        const bookedSeatsResponse = await axios.get(
          `https://localhost:7048/api/GetBookingsOfTrainSchedule/${trainDetails.scheduleId}?selectedDate=${selectedDate}`
        );
        const bookedSeatsData = bookedSeatsResponse.data?.$values || [];

        const bookedSeatsByClassAndCarriage: {
          [classType: string]: { [carriageNo: number]: number[] };
        } = {};

        bookedSeatsData.forEach((booking: Booking) => {
          const classType = booking.bookingClass;
          const carriageNo = booking.bookingCarriageNo;
          const bookedSeatNumbers = booking.bookingSeatNO
            .split(",")
            .map(Number);

          if (!bookedSeatsByClassAndCarriage[classType]) {
            bookedSeatsByClassAndCarriage[classType] = {};
          }

          if (!bookedSeatsByClassAndCarriage[classType][carriageNo]) {
            bookedSeatsByClassAndCarriage[classType][carriageNo] = [];
          }

          bookedSeatsByClassAndCarriage[classType][carriageNo].push(
            ...bookedSeatNumbers
          );
        });

        console.log(
          "Booked Seats by Class and Carriage:",
          bookedSeatsByClassAndCarriage
        );

        setBookedSeats(bookedSeatsByClassAndCarriage);
        Swal.close();
      } catch (error) {
        Swal.close();
      Swal.fire('Error', 'Error fetching Train details or booked seats.', 'error');
        console.error("Error fetching train details:", error);
      }
    };

    fetchTrainDetails();
  }, [trainDetails, trainDetails.scheduleId, selectedDate]);

  console.log("Booked Seats:", bookedSeats);
  console.log("Train Details:", trainDetails);
  console.log("Train Details with seats:", trainDetailsWithSeats);

  useEffect(() => {
    if (trainDetailsWithSeats && trainDetailsWithSeats.scheduledCarriages) {
      const TrainCarriage = trainDetailsWithSeats.scheduledCarriages.$values;
      console.log(TrainCarriage);
      if (TrainCarriage.length > 0) {
        const TrainName = TrainCarriage[0].scheduledTrain.trainName;
        console.log(TrainName);
        setTrainName(TrainName);
      }
    }
  }, [trainDetailsWithSeats]);

  console.log(trainName);

  useEffect(() => {
    if (trainDetailsWithSeats && trainDetailsWithSeats.scheduledCarriages) {
      const carriages = trainDetailsWithSeats.scheduledCarriages.$values.filter(
        (carriage: any) =>
          (selectedClass === "1st" &&
            carriage.registeredCarriage.carriageClass === 1) ||
          (selectedClass === "2nd" &&
            carriage.registeredCarriage.carriageClass === 2)
      );
      setSelectedClassCarriages(carriages);
      setCurrentCarriageIndex(0);
    }
  }, [selectedClass, trainDetailsWithSeats]);

  useEffect(() => {
    setSelectedSeats([]);
    setCurrentCarriageIndex(0);
  }, [selectedClass]);

  useEffect(() => {
    setSelectedSeats([]);
  }, [currentCarriageIndex]);

  const handleSeatSelected = (isSelected: boolean, seatNumber: number) => {
    if (isSelected) {
      setSelectedSeats([
        ...selectedSeats,
        { carriageIndex: currentCarriageIndex, seatNumber },
      ]);
    } else {
      setSelectedSeats(
        selectedSeats.filter(
          (seat) =>
            seat.seatNumber !== seatNumber ||
            seat.carriageIndex !== currentCarriageIndex
        )
      );
    }
  };

  const handleNextCarriage = () => {
    if (currentCarriageIndex < selectedClassCarriages.length - 1) {
      setCurrentCarriageIndex(currentCarriageIndex + 1);
      setSelectedSeats([]);
    }
  };

  const handlePreviousCarriage = () => {
    if (currentCarriageIndex > 0) {
      setCurrentCarriageIndex(currentCarriageIndex - 1);
      setSelectedSeats([]);
    }
  };

  const calculateSeatsCount = (selectedClass: string) => {
    let totalSeats = 0;

    if (trainDetailsWithSeats && trainDetailsWithSeats.scheduledCarriages) {
      trainDetailsWithSeats.scheduledCarriages.$values.forEach(
        (carriage: any) => {
          if (
            (selectedClass === "1st" &&
              carriage.registeredCarriage.carriageClass === 1) ||
            (selectedClass === "2nd" &&
              carriage.registeredCarriage.carriageClass === 2)
          ) {
            totalSeats += carriage.registeredCarriage.seatsCount;
          }
        }
      );
    }

    return totalSeats;
  };

  const formatSelectedSeats = () => {
    type SeatsByCarriage = { [key: number]: number[] };
    const seatsByCarriage: SeatsByCarriage = selectedSeats.reduce(
      (acc, seat) => {
        if (!acc[seat.carriageIndex]) {
          acc[seat.carriageIndex] = [];
        }
        acc[seat.carriageIndex].push(seat.seatNumber);
        return acc;
      },
      {} as SeatsByCarriage
    );

    return Object.entries(seatsByCarriage).map(([carriageIndex, seats]) => (
      <div key={carriageIndex}>
        <div>Class: {selectedClass === "1st" ? "1st Class" : "2nd Class"}</div>
        <div>Carriage: {parseInt(carriageIndex) + 1}</div>
        <div>Selected Seats: {seats.sort((a, b) => a - b).join(", ")}</div>
      </div>
    ));
  };
  console.log(trainDetails);
  console.log(trainDetailsWithSeats);
  console.log("Booked Seats:", bookedSeats);

  const getBookedSeatsForCurrentCarriage = (): number[] => {
    // Map selected class to numeric key
    const classKey =
      selectedClass === "1st" ? 1 : selectedClass === "2nd" ? 2 : null;

    
    if (classKey !== null && bookedSeats[classKey]) {
      // Use currentCarriageIndex + 1 to get the carriage number (1-based index)
      const carriageSeats = bookedSeats[classKey][currentCarriageIndex + 1];
      if (carriageSeats) {
        console.log(
          `Booked seats for ${selectedClass} class, carriage ${
            currentCarriageIndex + 1
          }:`,
          carriageSeats
        );
        return carriageSeats;
      }
    }
    console.log(
      `No booked seats found for ${selectedClass} class, carriage ${
        currentCarriageIndex + 1
      }`
    );
    return [];
  };

  const getTotalBookedSeatsCountForSelectedClass = (): number => {
    // Map selected class to numeric key
    const classKey =
      selectedClass === "1st" ? 1 : selectedClass === "2nd" ? 2 : null;

    let totalBookedSeats = 0;

    if (classKey !== null && bookedSeats[classKey]) {
      // Sum up all the booked seats for the selected class across all carriages
      for (let carriage in bookedSeats[classKey]) {
        totalBookedSeats += bookedSeats[classKey][carriage].length;
      }
    }

    console.log(
      `Total booked seats for ${selectedClass} class:`,
      totalBookedSeats
    );
    return totalBookedSeats;
  };

  const A = getBookedSeatsForCurrentCarriage();
  console.log("BookedSeatsForCurrentCarriage", A);

  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching feedback with params:", {
          trainName,
        });

        const response = await axios.get(
          `https://localhost:7048/api/GetFeedBackForTrain`,
          {
            params: { trainName },
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

    if (trainName) {
      fetchData();
    }
  }, [trainName]);

  console.log("Fetched feedback:", averageRating);
  console.log(selectedSeats);

  return (
    <div className="BusBooking">
      <PrimaryNavBar />
      <div className=" d-flex justify-content-center align-items-center pt-3">
        <DetailsCard
          isBookingPage
          onBookNow={() => {}} //empty function because Book now button is disabled in this page.
          VehicleId={trainDetails.VehicleId}
          scheduleId={trainDetails.scheduleId}
          vehicleNo={trainDetails.vehicleNo}
          routNo={trainDetails.routNo}
          startLocation={trainDetails.startLocation}
          endLocation={trainDetails.endLocation}
          departureTime={trainDetails.departureTime}
          arrivalTime={trainDetails.arrivalTime}
          comfortability={trainDetails.comfortability}
          duration={trainDetails.duration}
          ticketPrice={trainDetails.ticketPrice}
          selectedStands={trainDetails.selectedStands}
          scheduledDatesList={trainDetails.scheduledDatesList}
          firstClassTicketPrice={trainDetails.firstClassTicketPrice}
          secondClassTicketPrice={trainDetails.secondClassTicketPrice}
        />
      </div>
      <SeatMenu />

      <div className="row BusBooking m-auto h-auto justify-content-center align-content-center">
        <div className="BusBookingBodyLeft col col-lg-4 col-md-12 col-12 align-items-center justify-content-center ms-lg-auto ms-lg-auto  ">
          <div className="d-flex justify-content-start align-items-center pt-0 mt-0 ps-0">
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

          <br />
          <br />

          <div className="d-flex justify-content-between align-items-center mb-2">
            <button
              className="btn btn-secondary"
              onClick={handlePreviousCarriage}
              disabled={currentCarriageIndex === 0}
            >
              &lt; Previous
            </button>
            <span>
              Carriage {currentCarriageIndex + 1} of{" "}
              {selectedClassCarriages.length}
            </span>
            <button
              className="btn btn-secondary"
              onClick={handleNextCarriage}
              disabled={
                currentCarriageIndex === selectedClassCarriages.length - 1
              }
            >
              Next &gt;
            </button>
          </div>

          {selectedClassCarriages.length > 0 && (
            <TrainSeatStructure
              seatStructure={trainDetailsWithSeats.selCarriageSeatStructures.$values.filter(
                (seat: any) =>
                  seat.registeredCarriageCarriageId ===
                  selectedClassCarriages[currentCarriageIndex]
                    .registeredCarriage.carriageId
              )}
              onSeatSelected={handleSeatSelected}
              selectedSeatNumbers={selectedSeats
                .filter((seat) => seat.carriageIndex === currentCarriageIndex)
                .map((seat) => seat.seatNumber)}
              bookedSeats={getBookedSeatsForCurrentCarriage()}
            />
          )}
        </div>
        <div className="BusBookingBodyRight col col-lg-6 col-md-12 col-12  align-items-center justify-content-center me-lg-auto">
          <div className="mb-4">
            <TravelLable
              availableSeats={
                calculateSeatsCount(selectedClass) -
                getTotalBookedSeatsCountForSelectedClass()
              }
              isAC={selectedClass === "1st"}
              ticketPrice={
                selectedClass === "1st"
                  ? trainDetails.firstClassTicketPrice || 0
                  : trainDetails.secondClassTicketPrice || 0
              }
              totalSeats={calculateSeatsCount(selectedClass)}
              vehicleName={trainName}
              rate={averageRating}
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
          <div className=" d-flex justify-content-center pt-5 fs-5 h-auto ">
            {selectedSeats.length > 0
              ? formatSelectedSeats()
              : "Selected Seats: None"}
          </div>

          <TotalPriceLable
            passengers={selectedSeats.length}
            totalPrice={
              selectedClass === "1st"
                ? selectedSeats.length *
                  (trainDetails?.firstClassTicketPrice || 0)
                : selectedSeats.length *
                  (trainDetails?.secondClassTicketPrice || 0)
            }
            TrainScheduleId={trainDetails.scheduleId}
            RouteNo={trainDetails.routNo}
            StartLocation={trainDetails.startLocation}
            EndLocation={trainDetails.endLocation}
            BoardingPoint={selectedStartLocation}
            DroppingPoint={selectedEndLocation}
            StartTime={startStandTime}
            EndTime={endStandTime}
            BookingSeatNO={selectedSeats
              .map((seat) => seat.seatNumber)
              .sort((a, b) => a - b)
              .join(", ")}
            BookingSeatCount={selectedSeats.length}
            TicketPrice={
              selectedClass === "1st"
                ? trainDetails?.firstClassTicketPrice || 0
                : trainDetails?.secondClassTicketPrice || 0
            }
            TotalPaymentAmount={
                selectedClass === "1st"
                ? selectedSeats.length *
                  (trainDetails?.firstClassTicketPrice || 0)
                : selectedSeats.length *
                  (trainDetails?.secondClassTicketPrice || 0)
            }
            // departureDate={
            //   trainDetails.scheduledDatesList.$values[0].departureDate 
            // }
            departureDate={
              trainDetails.scheduledDatesList && trainDetails.scheduledDatesList.length > 0
                ? trainDetails.scheduledDatesList[0].departureDate
                : undefined // or a default value or handling for when departureDate is not available
            }
            //disableButton={selectedSeats.length === 0}
            BookingClass={selectedClass}
            BookingCarriageNo={currentCarriageIndex + 1}
          />
        </div>
      </div>
      <TrainReviewList trainName={trainName} />
      <Footer />
    </div>
  );
};

export default TrainBookingPage;
