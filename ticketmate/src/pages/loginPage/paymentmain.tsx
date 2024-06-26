
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Selection from "../../Components/payment/Selection";
import Back from "../../Components/payment/Backbutton";
import Footer from "../../Components/Footer/Footer1";
import "./paymentmain.css";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Payment() {
 const bookingData = {
  driverId:5,

  busBookingId: 0,
  busScheduleId: 0,
  busId: 0,

  passengerId: '1',
  routeNo: '23',
  startLocation: 'Rabukkana',
  endLocation: 'Colombo',
  boardingPoint: 'Gampaha',
  droppingPoint: 'Colombo',
  startTime: '02:30 AM',
  endTime: '05:00 PM',
  bookingDate: '2024-06-28',
  bookingSeatNO: '12,13',
  bookingSeatCount: '2',
  ticketPrice: 60.00,
  totalPaymentAmount: 120,
  paymentStatus: true,

  trainBookingId: 0,
  trainScheduleId:2,
  bookingCarriageNo:2,
  bookingClass:"A"
  }
 // const bookingData:React.FC<BookingData> =(props)=> {
  return (
    <>
    <div className="paymentmain">
      <PrimaryNavBar />
      <Back />
      <div className="container ">
        <div className="row">
          <Selection {...bookingData}/>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );

}

export default Payment;
