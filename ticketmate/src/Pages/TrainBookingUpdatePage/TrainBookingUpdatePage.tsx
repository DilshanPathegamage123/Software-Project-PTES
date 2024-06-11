import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import BoardinPoint from "./TrainBookingUpdatePageAssests/BoardingPoint.png";
import DroppingPoint from "./TrainBookingUpdatePageAssests/DroppingPoint.png";
import ProgresLine from "./TrainBookingUpdatePageAssests/ProgressLine.png";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Footer from "../../Components/Footer/footer";
import DetailsCard2 from "../../Components/TravelDetailsCard/DetailsCard";
import SeatMenu from "../../Components/Booking-SeatMenu/SeatMenu";
import TravelLable from "../../Components/Booking-TravelLable/TravelLable";
import TotalPriceLable from "../../Components/Booking-TotalPriceLable/TotalPriceLable";
import TrainSeatStructure from "../../Components/Booking-SeatStructure/TrainSeatStructure";
import { toast } from "react-toastify";

interface Booking {
  id: number;
  type: string;
  busScheduleId: number;
  passengerId: string;
  routeNo: string;
  startLocation: string;
  endLocation: string;
  boardingPoint: string;
  droppingPoint: string;
  startTime: string;
  endTime: string;
  bookingDate: string;
  bookingClass: string;
  bookingCarriageNo: number;
  bookingSeatNO: string;
  bookingSeatCount: number;
  ticketPrice: number;
  totalPaymentAmount: number;
}

type TrainDetailsWithSeats = {
  $id: string;
  scheduledCarriages: {
    $id: string;
    $values: Carriage[];
  };
  registeredCarriages: {
    $id: string;
    $values: { $ref: string }[];
  };
  selCarriageSeatStructures: {
    $id: string;
    $values: SeatStructure[];
  };
};
type Carriage = {
  $id: string;
  id: number;
  classType: string;
  scheduledTrainSchedulId: number;
  registeredCarriageCarriageId: number;
  scheduledTrain: any;
  registeredCarriage: {
    $id: string;
    carriageId: number;
    carriageNo: string;
    seatsCount: number;
    carriageClass: number;
  };
};

type SeatStructure = {
  $id: string;
  id: number;
  seatId: string;
  avalability: boolean;
  registeredCarriageCarriageId: number;
};

interface TrainScheduleDetails {
  schedulId: number;
  trainRoutNo: string;
  startStation: string;
  endStation: string;
  trainDepartureTime: string;
  trainArrivalTime: string;
  duration: string;
  trainType: string;
  firstClassTicketPrice: number;
  secondClassTicketPrice: number;
}

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

const TrainBookingUpdatePage: React.FC = () => {
  const location = useLocation();
  const booking = location.state as Booking;
  const navigate = useNavigate();

  const [trainDetailsWithSeats, setTrainDetailsWithSeats] =
    useState<TrainDetailsWithSeats | null>(null);
  const [trainScheduleDetails, setTrainScheduleDetails] =
    useState<TrainScheduleDetails | null>(null);
  const [bookedSeats, setBookedSeats] = useState<{
    [classType: string]: { [carriageNo: number]: number[] };
  }>({});

  const [selectedClass, setSelectedClass] = useState<string>(
    booking.booking.bookingClass == "1" ? "1st" : "2nd"
  );

  console.log(selectedClass);
  console.log(booking.booking.bookingClass);
  console.log(booking.booking.bookingCarriageNo);
  const [currentCarriageIndex, setCurrentCarriageIndex] = useState<number>(
    booking.booking.bookingCarriageNo - 1 || 0
  );

  console.log("Current Carriage Index:", currentCarriageIndex);

  useEffect(() => {
    console.log("Current Carriage Index:", currentCarriageIndex);
  }, [currentCarriageIndex]);

  const [selectedClassCarriages, setSelectedClassCarriages] = useState<any[]>(
    []
  );

  const [trainName, setTrainName] = useState("");

  const [selectedSeats, setSelectedSeats] = useState<Array<number>>(
    selectedClass === (booking.booking.bookingClass == "1" ? "1st" : "2nd") &&
      currentCarriageIndex === booking.booking.bookingCarriageNo - 1
      ? booking.booking.bookingSeatNO.split(",").map(Number)
      : []
  );

  console.log(selectedSeats);
  useEffect(() => {
    if (
      selectedClass === (booking.booking.bookingClass == "1" ? "1st" : "2nd") &&
      currentCarriageIndex === booking.booking.bookingCarriageNo - 1 &&
      booking.booking.bookingSeatNo
    ) {
      setSelectedSeats(booking.booking.bookingSeatNo.split(",").map(Number));
    }
  }, [
    currentCarriageIndex,
    selectedClass,
    booking.booking.bookingCarriageNo,
    booking.booking.bookingClass,
    booking.booking.bookingSeatNo,
  ]);

  console.log(selectedSeats);

  const [ticketPrice, setTicketPrice] = useState<number>(
    booking.booking.ticketPrice
  );
  console.log("Booking object", booking);
  console.log("BusScheduleId", booking.booking.bookingCarriageNo - 1);

  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchTrainDetails = async () => {
      if (!booking || !booking.booking.busScheduleId) {
        console.error("Train details or ScheduleId is undefined");
        return;
      }

      try {
        const response = await axios.get(
          `https://localhost:7048/api/GetTrainDetails/${booking.booking.busScheduleId}`
        );
        setTrainDetailsWithSeats(response.data);

        const response1 = await axios.get(
          `https://localhost:7048/api/GetTrainScheduleDetails/${booking.booking.busScheduleId}`
        );
        setTrainScheduleDetails(response1.data);

        console.log(booking.booking.bookingDate);
        const bookedSeatsResponse = await axios.get(
          `https://localhost:7048/api/GetBookingsOfTrainSchedule/${booking.booking.busScheduleId}?selectedDate=${booking.booking.bookingDate}`
        );
        const bookedSeatsData = bookedSeatsResponse.data?.$values || [];
        const bookedSeatsByClassAndCarriage: {
          [classType: string]: { [carriageNo: number]: number[] };
        } = {};

        bookedSeatsData.forEach((booking: Booking) => {
          console.log(booking.bookingClass);
          const classType = booking.bookingClass;
          const carriageNo = booking.bookingCarriageNo;
          const bookedSeatNumbers = booking.bookingSeatNO

            .split(",")
            .map(Number);

          console.log(classType);
          console.log(carriageNo);
          console.log(bookedSeatNumbers);
          console.log(classType, carriageNo, bookedSeatNumbers);

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

        // Update state with booked seats
        setBookedSeats(bookedSeatsByClassAndCarriage);
      } catch (error) {
        console.error("Error fetching train details:", error);
      }
    };

    fetchTrainDetails();
  }, [
    booking.booking.id,
    booking.booking.busScheduleId,
    booking.booking.bookingDate,
  ]);

  console.log("Booked Seats:", selectedClass);
  console.log("Bus Details:", currentCarriageIndex);
  console.log("Bus Details with seats:", selectedSeats);

  useEffect(() => {
    setCurrentCarriageIndex(booking.booking.bookingCarriageNo - 1); // Set the default value
  }, [booking.booking.bookingCarriageNo]); // Trigger whenever bookingCarriageNo changes

  useEffect(() => {
    if (trainDetailsWithSeats && trainDetailsWithSeats.scheduledCarriages) {
      const classMapping: { [key: string]: string } = {
        "1": "1st",
        "2": "2nd",
      };
      const carriages = trainDetailsWithSeats.scheduledCarriages.$values.filter(
        (carriage: any) =>
          //carriage.registeredCarriage.carriageClass.toString() === selectedClass
          classMapping[carriage.registeredCarriage.carriageClass.toString()] ===
          selectedClass
      );
      console.log(carriages);
      setSelectedClassCarriages(carriages);
    }
  }, [selectedClass, trainDetailsWithSeats]);

  const handleSeatSelected = (isSelected: boolean, seatNumber: number) => {
    if (isSelected) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    } else {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    }
  };

  console.log(selectedSeats);

  const handleSave = async () => {
    if (!booking.booking || !booking.booking.bookingSeatNO) {
      console.error("Booking or bookingSeatNO is undefined");
      return;
    }

    const selectedSeatNumbers = selectedSeats;
    const selectedSeatCount = selectedSeats.length;
    const bookedSeatCount = booking.booking.bookingSeatNO
      ? booking.booking.bookingSeatNO.split(",").length
      : 0;

    console.log("Selected Seat Numbers:", selectedSeatNumbers);
    console.log(selectedSeatCount);
    console.log(bookedSeatCount);
    if (selectedSeatCount !== bookedSeatCount) {
      toast.info(`You have to select ${bookedSeatCount} seats for saving`);
      return;
    }

    const bookingSeatNO = selectedSeatNumbers.join(",");
    console.log(bookingSeatNO);

    const payload = {
      id: booking.booking.id,
      bookingCarriageNo: currentCarriageIndex + 1,
      bookingSeatNO,
    };

    console.log("Payload:", payload);

    try {
      await axios.put(
        `https://localhost:7048/api/UpdateTrainBooking/${booking.booking.id}`,
        payload
      );

      toast.success("Seats booked successfully!");
      navigate("/passenger-profile");
    } catch (error) {
      console.error("Error updating booked seats:", error);
      console.error("Server response:", error.response);
      toast.error("Failed to save seats. Please try again.");
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
        <div>Class :{selectedClass === "1st" ? "1st Class" : "2nd Class"}</div>
        <div>Carriage : {currentCarriageIndex + 1}</div>
        <div>
          Selected Seats : {selectedSeats.sort((a, b) => a - b).join(", ")}
        </div>
      </div>
    ));
  };

  console.log(trainDetailsWithSeats);

  const getBookedSeatsForCurrentCarriage = (): number[] => {
    const classKey =
      selectedClass === "1st" ? 1 : selectedClass === "2nd" ? 2 : null;
    if (classKey !== null && bookedSeats[classKey]) {
      const carriageSeats = bookedSeats[classKey][currentCarriageIndex + 1];
      //return carriageSeats || [];
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

  const A = getBookedSeatsForCurrentCarriage();
  console.log("BookedSeatsForCurrentCarriage", A);

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

  let trainType: string,
    firstClassTicketPrice: number,
    secondClassTicketPrice: number,
    departureTime: string,
    arrivalTime: string;
  // Check if trainDetailsWithSeats and scheduledCarriages array exist
  if (
    trainDetailsWithSeats &&
    trainDetailsWithSeats.scheduledCarriages &&
    trainDetailsWithSeats.scheduledCarriages.$values.length > 0
  ) {
    const scheduledTrain =
      trainDetailsWithSeats.scheduledCarriages.$values[0].scheduledTrain;

    if (scheduledTrain) {
      trainType = scheduledTrain.trainType;
      firstClassTicketPrice = scheduledTrain.firstClassTicketPrice;
      secondClassTicketPrice = scheduledTrain.secondClassTicketPrice;
      departureTime = scheduledTrain.trainDepartureTime;
      arrivalTime = scheduledTrain.trainArrivalTime;
    }
  }

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

  return (
    <div className="BusBooking">
      <PrimaryNavBar />
      <div className=" d-flex justify-content-center align-items-center pt-3">
        <DetailsCard2
          isBookingPage
          //VehicleId={booking.booking.busScheduleId}
          scheduleId={booking.booking.busScheduleId}
          vehicleNo={booking.booking.routeNo}
          routNo={booking.booking.routeNo}
          startLocation={booking.booking.startLocation}
          endLocation={booking.booking.endLocation}
          departureTime={departureTime}
          arrivalTime={arrivalTime}
          comfortability={trainType}
          scheduledDatesList={{
            $id: "placeholder",
            $values: [],
          }}
          firstClassTicketPrice={firstClassTicketPrice}
          secondClassTicketPrice={secondClassTicketPrice}
          VehicleType="Train"
          BookingDate={booking.booking.bookingDate}
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
              disabled={booking.booking.bookingClass == 2}
            >
              1st Class
            </button>
            <button
              className={`classbtn btn SignUpNow btn-sm fw-semibold fs-5 m-2 ${
                selectedClass === "2nd" ? "selected" : "default"
              }`}
              onClick={() => setSelectedClass("2nd")}
              disabled={booking.booking.bookingClass == 1}
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

          {trainDetailsWithSeats && selectedClassCarriages.length > 0 && (
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
              bookingSeatNO={
                selectedClass ===
                  (booking.booking.bookingClass == "1" ? "1st" : "2nd") &&
                currentCarriageIndex === booking.booking.bookingCarriageNo - 1
                  ? booking.booking.bookingSeatNO.split(",").map(Number)
                  : []
              }
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
              ticketPrice={booking.booking.ticketPrice}
              totalSeats={calculateSeatsCount(selectedClass)}
              vehicleName={trainName}
              rate={averageRating}
            />
          </div>
          <div className="BDPoints row col-12 h-auto d-flex pt-5 pb-5 mt-5">
            <div className="BDPointsStart Left col-2 justify-content-center align-items-center m-auto d-grid">
              <div className="BoardingPoint justify-content-center align-items-center m-auto p-2">
                <img src={BoardinPoint} alt="Icon" />
              </div>
              <div className="BDPointsStartLocation justify-content-center align-items-center m-auto fs-5 fw-medium">
                {booking.booking.boardingPoint}
              </div>
              <div className="BDPointsStartTime justify-content-center align-items-center m-auto fs-6 fw-medium">
                {booking.booking.startTime}
              </div>
            </div>
            <div className="Middle col-5 justify-content-center align-items-center m-auto d-grid">
              <img
                src={ProgresLine}
                alt="icon"
                className="justify-content-center align-items-center p-0"
              />
            </div>
            <div className="BDPointsEnd Right col-2 justify-content-center align-items-center m-auto d-grid">
              <div className="DroppingPoint justify-content-center align-items-center m-auto p-2">
                <img src={DroppingPoint} alt="icon" />
              </div>
              <div className="BDPointsEndLocation justify-content-center align-items-center m-auto fs-5 fw-medium">
                {booking.booking.droppingPoint}
              </div>
              <div className="BDPointsEndTime justify-content-center align-items-center m-auto fs-6 fw-medium">
                {booking.booking.endTime}
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
              totalPrice={selectedSeats.length * booking.booking.ticketPrice}
              buttonText="Save"
              onSave={handleSave}
            />
         
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrainBookingUpdatePage;
