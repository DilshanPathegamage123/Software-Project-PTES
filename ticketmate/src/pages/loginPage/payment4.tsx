import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Footer from "../../Components/Footer/Footer1";
import "./payment4.css";
import Receipt from "../../Components/payment/Receipt";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";



interface BookingData {
  driverId: number;

  busBookingId: number;
  busScheduleId: number;
  busId: number;

  passengerId: string;
  routeNo: string;
  startLocation: string;
  endLocation: string;
  boardingPoint: string;
  droppingPoint: string;
  startTime: string;
  endTime: string;
  bookingDate: string;
  bookingSeatNO: string;
  bookingSeatCount: string;
  ticketPrice: number;
  totalPaymentAmount: number;
  paymentStatus: boolean;

  trainBookingId:number ;
  trainScheduleId: number;
  bookingCarriageNo: number;
  bookingClass: number;
}


const Payment4: React.FC<BookingData> = () => {
  const location = useLocation();
  const state=location.state;
  console.log("payment 4 state",state);
  return (
    <>
   
      <div className="d-flex flex-column min-vh-100" id="payment4_body">
        <PrimaryNavBar />
        {/* <Receipt {...state}/> */}
        <Receipt {...state} /> 
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
export default Payment4;


