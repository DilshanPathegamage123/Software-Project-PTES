import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import "./TravelHistory.css";
import BusIcon from "./images/fa6-solid_bus.png";
import BusIcon2 from "./images/Group 391.png";
import TrainIcon from "./images/TrainImage.png";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import FeedBackModal from "../Components/FeedBackSection/FeedBackModal";
import FeedbackForm from "../Components/FeedBackSection/FeedbackForm";
import FeedbackList from "../Components/FeedBackSection/FeedbackList";
import TrainFeedbackForm from "../Components/FeedBackSection/TrainFeedbackForm";
import TrainFeedbackList from "../Components/FeedBackSection/TrainFeedbackList";

type BookingType = {
  id: number;
  busId: number;
  trainScheduleId: number | null;
  type: "bus" | "train";
  boardingPoint: string;
  bookingDate: string;
  startTime: string;
  droppingPoint: string;
  endTime: string;
};

type Feedback = {
  id: number;
  passengerId: string;
  busId: number;
  bookingId: number;
  text: string;
  rating: number;
};

interface passengerData {
  id: number;
}


function TravelHistory({pid}: {pid: number}) {
  const passengerid=pid;
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  //const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(
    null
  );


  let passengerId = passengerid.toString();

  useEffect(() => {
    const fetchBookings = async () => {

      Swal.fire({
        title: 'Loading...',
        text: 'Please wait while we fetch your bookings.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        const [busResponse, trainResponse] = await Promise.all([
          axios.get(
            `https://localhost:7048/api/GetUserBusBookings/${passengerId}`
          ),
          axios.get(
            `https://localhost:7048/api/GetUserTrainBookings/${passengerId}`
          ),
        ]);

        const today = new Date();
        const todayFormatted = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        const busBookings = busResponse.data.$values
          .filter((booking: any) => booking.bookingDate < todayFormatted)
          .map((booking: any) => ({
            id: booking.busBookingId,
            busId: booking.busId,
            type: "bus",
            boardingPoint: booking.boardingPoint,
            bookingDate: booking.bookingDate,
            startTime: booking.startTime,
            droppingPoint: booking.droppingPoint,
            endTime: booking.endTime,
          }));

        const trainBookings = trainResponse.data.$values
          .filter((booking: any) => booking.bookingDate < todayFormatted)
          .map((booking: any) => ({
            id: booking.trainBookingId,
            trainScheduleId: booking.trainScheduleId,
            type: "train",
            boardingPoint: booking.boardingPoint,
            bookingDate: booking.bookingDate,
            startTime: booking.startTime,
            droppingPoint: booking.droppingPoint,
            endTime: booking.endTime,
          }));

        setBookings([...busBookings, ...trainBookings]);
        Swal.close();
      } catch (error) {
        console.error("Error fetching bookings:", error);
              Swal.fire('Error', 'Failed to load past bookings. Please try again later.', 'error');

      }
    };

    fetchBookings();
  }, []);

  console.log(bookings);

  const handleGiveFeedback = (booking: BookingType) => {
    //setSelectedBookingId(bookingId);
    setSelectedBooking(booking);
    setShowFeedbackForm(true);
    sessionStorage.setItem('BusId', JSON.stringify(selectedBooking?.busId || 0));
    sessionStorage.setItem('BookingId', JSON.stringify(selectedBooking?.id || 0));
    sessionStorage.setItem('PassengerId', JSON.stringify(passengerId));
    setShowFeedbackForm(true);
  };

 
    console.log(selectedBooking?.busId || selectedBooking?.trainScheduleId);
    console.log(selectedBooking?.id);
    console.log(passengerId);

  const handleCloseModal = () => {
    setShowFeedbackForm(false);
    setSelectedBooking(null);
    sessionStorage.removeItem('BusId');
    sessionStorage.removeItem('BookingId');
    sessionStorage.removeItem('PassengerId');
  };

  const handleSaveFeedback = (feedback: Feedback) => {
    console.log("Feedback saved:", feedback);
    // Update state or perform any necessary actions with the saved feedback
  };


  return (
    <>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div className="row p-5 rounded-4 sec shadow m-4 h-auto  ">
            <div className="col-lg-1 align-items-center justify-content-center m-auto d-grid pb-1 ">
              <img
                src={booking.type === "train" ? TrainIcon : BusIcon}
                alt={booking.type === "train" ? "TrainIcon" : "BusIcon"}
                className="VehicleIcon align-items-center justify-content-center m-auto"
              />{" "}
              <div className=" fw-semibold pt-2">{booking.bookingDate}</div>
            </div>
            <div className="col-lg-2 align-items-center justify-content-center m-auto d-grid  ">
              <h5 className="align-items-center justify-content-center m-auto">
                {booking.boardingPoint}
              </h5>
              <p className="align-items-center justify-content-center m-auto">
                {booking.startTime}
              </p>
            </div>
            <div className="col-lg-2 align-items-center justify-content-center m-auto d-grid  ">
              <img src={BusIcon2} alt="BusIcon2" />
            </div>
            <div className="col-lg-2 align-items-center justify-content-center m-auto d-grid ">
              <h5 className="align-items-center justify-content-center m-auto">
                {booking.droppingPoint}
              </h5>
              <p className="align-items-center justify-content-center m-auto">
                {booking.endTime}
              </p>
            </div>
            <div className="col col-lg-2 col-12 align-items-center justify-content-center d-flex  m-auto pt-1 ">
              <div className=" col-lg-1 col-2  m-0 align-items-center justify-content-center d-flex  m-auto">
                <PrimaryButton
                  value="Give Feedback"
                  type="button"
                  color="primary"
                  className=" m-0 p-0 "
                  onClick={() => handleGiveFeedback(booking)}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">No past bookings found.</div>
      )}

{showFeedbackForm && selectedBooking && (
        <FeedBackModal onClose={handleCloseModal}>
          {selectedBooking.type === "bus" ? (
            <>
              <FeedbackForm
                passengerId={passengerId}
                busId={selectedBooking.busId}
                bookingId={selectedBooking.id}
                onClose={handleCloseModal}
                onSave={handleSaveFeedback}
              />
              <FeedbackList
                passengerId={passengerId}
                busId={selectedBooking.busId}
                bookingId={selectedBooking.id}
              />
            </>
          ) : (
            <>
              <TrainFeedbackForm
                passengerId={passengerId}
                trainScheduleId={selectedBooking.trainScheduleId}
                bookingId={selectedBooking.id}
                onClose={handleCloseModal}
                onSave={handleSaveFeedback}
              />
              <TrainFeedbackList
                passengerId={passengerId}
                trainScheduleId={selectedBooking.trainScheduleId || 0}
                bookingId={selectedBooking.id}
                
              />
            </>
          )}
        </FeedBackModal>
      )}
    </>
  );
}

export default TravelHistory;

