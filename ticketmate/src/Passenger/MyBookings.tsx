import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./MyBookings.css";
import BusIcon from "./images/fa6-solid_bus.png";
import BusIcon2 from "./images/Group 391.png";
import TrainIcon from "./images/TrainImage.png";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import ConfirmModal from "../Components/ConfirmModal/ConfirmModal";
import { props } from "cypress/types/bluebird";

type BookingType = {
  id: number;
  type: "bus" | "train";
  boardingPoint: string;
  bookingDate: string;
  startTime: string;
  droppingPoint: string;
  endTime: string;
  paymentId: string;
};


interface MyBookingsProps {
  pid: number;
  username: string;
  password: string;
}

interface passengerData {
  id: number;
}




function MyBookings({ pid, username, password }: MyBookingsProps) {
  const passengerid=pid;
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(
    null
  );


let passengerId = passengerid.toString();


  console.log(pid);
  console.log(username);
  console.log(password);

let passengerId = passengerid.toString();
console.log(passengerId);
  useEffect(() => {
    const fetchBookings = async () => {

      Swal.fire({
        title: "Loading",
        text: "Please wait while we loading your active bookings...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });


      try {
        const busResponse = await axios.get(
          `https://localhost:7048/api/GetUserBusBookings/${passengerId}`
        );
        console.log(busResponse);
        const busBookings = busResponse.data.$values.map((booking: any) => ({
          id: booking.busBookingId,
          type: "bus",
          busScheduleId: booking.busScheduleId,
          busId: booking.busId,
          passengerId: booking.passengerId,
          routeNo: booking.routeNo,
          startLocation: booking.startLocation,
          endLocation: booking.endLocation,
          boardingPoint: booking.boardingPoint,
          droppingPoint: booking.droppingPoint,
          startTime: booking.startTime,
          endTime: booking.endTime,
          bookingDate: booking.bookingDate,
          bookingSeatNO: booking.bookingSeatNO,
          bookingSeatCount: booking.bookingSeatCount,
          ticketPrice: booking.ticketPrice,
          totalPaymentAmount: booking.totalPaymentAmount,
          paymentId: booking.paymentId,
        }));

        const trainResponse = await axios.get(
          `https://localhost:7048/api/GetUserTrainBookings/${passengerId}`
        );
        console.log(trainResponse);
        const trainBookings = trainResponse.data.$values.map(
          (booking: any) => ({
            id: booking.trainBookingId,
            type: "train",
            busScheduleId: booking.trainScheduleId,
            passengerId: booking.passengerId,
            routeNo: booking.routeNo,
            startLocation: booking.startLocation,
            endLocation: booking.endLocation,
            boardingPoint: booking.boardingPoint,
            droppingPoint: booking.droppingPoint,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingDate: booking.bookingDate,
            bookingClass: booking.bookingClass,
            bookingCarriageNo: booking.bookingCarriageNo,
            bookingSeatNO: booking.bookingSeatNO,
            bookingSeatCount: booking.bookingSeatCount,
            ticketPrice: booking.ticketPrice,
            totalPaymentAmount: booking.totalPaymentAmount,
            paymentId: booking.paymentId,
          })
        );

        const today = new Date();
        const filterBookings = (booking: BookingType) =>
          new Date(booking.bookingDate) >= today;

        const filteredBusBookings = busBookings.filter(filterBookings);
        const filteredTrainBookings = trainBookings.filter(filterBookings);

        console.log(filteredBusBookings);
        console.log(filteredTrainBookings);
        setBookings([...filteredBusBookings, ...filteredTrainBookings]);
        Swal.close();
        console.log(busBookings);
        console.log(trainBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        Swal.fire("Error", "Failed to load your bookings. Please try again.", "error");
      }
    };

    fetchBookings();
  }, [passengerId]);



  console.log(bookings);

  // const handelviewbtn = () => {
  //   navigate("/Mapview", { state: { bookings } });
  // }

  const handleEditClick = (booking: BookingType) => {
    if (booking.type === "bus") {
      navigate("/bus-booking-update", { state: { booking, username, password } });
    } else if (booking.type === "train") {
      navigate("/train-booking-update", { state: { booking, username, password } });

    }
    console.log(booking);
  };

  const handleCancelClick = (booking: BookingType) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  console.log("bookig",selectedBooking);
  const handleConfirmCancel = async () => {
    if (selectedBooking) {
      try {
        // Call refund API only for card payments
        if (selectedBooking.paymentId && selectedBooking.paymentId !== "None") {
          await axios.post(`https://localhost:7296/api/Refund/refund-payment`, {
            paymentId: selectedBooking.paymentId,
          });

          console.log("Refund API called");
          console.log(selectedBooking.paymentId);
        }

        if (selectedBooking.type === "bus") {
          await axios.delete(
            `https://localhost:7048/api/DeleteBusBooking/${selectedBooking.id}`
          );
        } else if (selectedBooking.type === "train") {
          await axios.delete(
            `https://localhost:7048/api/DeleteTrainBooking/${selectedBooking.id}`
          );
        }
        setBookings(bookings.filter((b) => b.id !== selectedBooking.id));
        setShowModal(false);
        Swal.fire("Success", "Booking cancelled successfully", "success");
      } catch (error) {
        console.error("Error cancelling booking:", error);
        Swal.fire("Error", "Failed to cancel booking. Please try again.", "error");
      }
    }
  };

  return (
    <>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div
            key={booking.type + booking.id}
            className="row p-5 rounded-4 sec shadow m-4 h-auto  "
          >
            <div className="col-lg-1 align-items-center justify-content-center m-auto d-grid pb-1 ">
              <img
                src={booking.type === "train" ? TrainIcon : BusIcon}
                alt="BusIcon "
                className="VehicleIcon align-items-center justify-content-center m-auto"
              />
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
            <div className="col col-lg-5 col-xl-4 col-12 align-items-center justify-content-center d-md-flex m-auto pt-1 ">
              <div className=" col-lg-1 col-2 align-items-center justify-content-center d-flex m-auto pt-sm-2">
                <PrimaryButton
                  value="View"
                  type="button"
                  color="primary"
                  className=" m-0 p-0 "
                  onClick={()=>navigate("/Mapview", {
                     state: {
                      booking
                     } } 
                  )  
                  }
                  
                />
                
              </div>
              <div className="col-lg-1 col-2 align-items-center justify-content-center d-flex m-auto pt-sm-2 ">
                <PrimaryButton
                  value="Edit"
                  type="button"
                  color="primary"
                  className=" m-0 "
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    handleEditClick(booking);
                  }}
                />
              </div>
              <div className="col-lg-1 col-2 align-items-center justify-content-center d-flex m-auto pt-sm-2">
                <PrimaryButton
                  value="cancel"
                  type="button"
                  color="primary"
                  className=" m-0 p-0  "
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    handleCancelClick(booking);
                  }}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
       // <div className="text-center">No active bookings found.</div>
                <div className="row p-4 rounded-4 sec shadow bg-grey mt-4 mb-4 ml-4 mr-4">
                    <div className="col-lg-12 mt-5 mb-4">
                        <p className="text-danger fs-10 fw-bold font-family-Inter">
                            No active bookings found.
                        </p>
                    </div>
                </div>
      )}

      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmCancel}
        title="Confirm Cancellation"
        body={
          <div>
            Are you sure you want to cancel this booking?
            <span className=" text-danger">
              <span className=" fw-bold">Note : </span>
              Cancellations made after 24 hours of making the payment may not be
              eligible for refund. Refund applicable only for card payments.
            </span>
          </div>
        }
      />
    </>
  );
}

export default MyBookings;
