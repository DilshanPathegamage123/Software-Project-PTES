import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar-logout";
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

    passengerId: (state.userId || UserId || "").toString(),
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


// // // ==============================================================

// import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar-logout";
// import Selection from "../../Components/payment/Selection";
// import Back from "../../Components/payment/Backbutton";
// import Footer from "../../Components/Footer/Footer1";
// import "./paymentmain.css";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";

// // import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// function Payment() {

//   const location = useLocation();
//   const state = location.state || {}; // Ensure state is not undefined
  
// // State to hold journey ID
//   const [busJourneyId, setBusJourneyId] = useState(null);
//   const [trainJourneyId, setTrainJourneyId] = useState(null);

//   console.log(location.state);
//   console.log(state.BusScheduleId);
//   console.log(state.userId);
//   console.log("train sched",state.TrainScheduleId);
//   console.log("trainbook",state.departureDate);
//   // Fetch journey ID when component mounts or state changes
// //   useEffect(() => {
// //   const fetchJourneyId = async () => {
// //     try {
// //       if (state.VehicleId) {
// //         console.log("bus sched1",state.BusScheduleId);
// //   console.log("trainbook1",state.departureDate);
// //         const response = await axios.get(`https://localhost:7296/api/BusJourneyId/journeyId/${state.BusScheduleId}?date=${state.departureDate}`);
// //         setBusJourneyId(response.data);
        
// //       } else {
// //         console.log("train sched2",state.TrainScheduleId);
// //   console.log("trainbook2",state.departureDate);
// //         const response = await axios.get(`https://localhost:7296/api/TrainJourneyId/journeyId/${state.TrainScheduleId}?date=${state.departureDate}`);
// //         setTrainJourneyId(response.data);
        
// //       }
// //     } catch (error) {
// //       console.error("Error fetching journey ID:", error);
// //     }
// //   };
// //   fetchJourneyId();
// // }, [state.busId, state.trainId, state.busScheduleId, state.trainScheduleId, state.bookingDate]);

//   console.log("bus",busJourneyId);
//   console.log("train",trainJourneyId);
//   const UserId = sessionStorage.getItem("userId");
//   console.log(UserId);

//   const bookingData = {
//     driverId: 5,

//     busBookingId: 0,
//     busScheduleId:state.busScheleId,
//     busId: state.VehicleId || 0,

//     passengerId: (state.userId || UserId || "").toString(),
//     routeNo: state.RouteNo,
//     startLocation: state.StartLocation,
//     endLocation: state.EndLocation,
//     boardingPoint: state.BoardingPoint,
//     droppingPoint: state.DroppingPoint,
//     startTime: state.StartTime,
//     endTime: state.EndTime,
//     bookingDate: state.departureDate,
//     bookingSeatNO: state.BookingSeatNO,
//     bookingSeatCount: state.BookingSeatCount.toString(),
//     ticketPrice: state.TicketPrice,
//     totalPaymentAmount: state.TotalPaymentAmount,
//     paymentStatus: true,

//     trainBookingId: 0,
//     trainScheduleId: trainJourneyId || 0,
//     bookingCarriageNo: state.BookingCarriageNo,
//     bookingClass: state.BookingClass,
    
//   };
  
//   return (
//     <>
//       <div className="paymentmain">
//         <PrimaryNavBar />
//         <Back />
//         <div className="container ">
//           <div className="row">
//             <Selection {...bookingData} />
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export default Payment;


// // ==============================================================

