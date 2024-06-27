import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Selection from "../../Components/payment/Selection";
import Back from "../../Components/payment/Backbutton";
import Footer from "../../Components/Footer/Footer1";
import "./paymentmain.css";
import { useLocation } from "react-router-dom";

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const state = location.state || {}; // Ensure state is not undefined
  //const bookingDetails = state.bookingDetails || {}; // Ensure bookingDetails is not undefined
  //const userId = state.userId;
  console.log(location.state);

  console.log(state.BusScheduleId);
  console.log(state.userId);

  const UserId = sessionStorage.getItem("userId");
  console.log(UserId);

  const bookingData = {
    driverId: 5,

    busBookingId: 0,
    busScheduleId: state.BusScheduleId,
    busId: state.VehicleId || 0,

    passengerId: state.userId.toString() || UserId?.toString(),
    routeNo: state.RouteNo,
    startLocation: state.StartLocation,
    endLocation: state.EndLocation,
    boardingPoint: state.BoardingPoint,
    droppingPoint: state.DroppingPoint,
    startTime: state.StartTime,
    endTime: state.EndTime,
    bookingDate: state.departureDate,
    bookingSeatNO: state.BookingSeatNO,
    bookingSeatCount: state.BookingSeatCount.toString(),
    ticketPrice: state.TicketPrice,
    totalPaymentAmount: state.TotalPaymentAmount,
    paymentStatus: true,

    trainBookingId: 0,
    trainScheduleId: state.TrainScheduleId,
    bookingCarriageNo: state.BookingCarriageNo,
    bookingClass: state.BookingClass,
    // driverId: 5,

    // busBookingId: 0,
    // busScheduleId: 0,
    // busId: 0,

    // passengerId: "1",
    // routeNo: "23",
    // startLocation: "Rabukkana",
    // endLocation: "Colombo",
    // boardingPoint: "Gampaha",
    // droppingPoint: "Colombo",
    // startTime: "02:30 AM",
    // endTime: "05:00 PM",
    // bookingDate: "2024-06-28",
    // bookingSeatNO: "12,13",
    // bookingSeatCount: "2",
    // ticketPrice: 60.0,
    // totalPaymentAmount: 120,
    // paymentStatus: true,

    // trainBookingId: 0,
    // trainScheduleId: 2,
    // bookingCarriageNo: 2,
    // bookingClass: "A",
  };
  // const bookingData:React.FC<BookingData> =(props)=> {
  return (
    <>
      <div className="paymentmain">
        <PrimaryNavBar />
        <Back />
        <div className="container ">
          <div className="row">
            <Selection {...bookingData} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Payment;
