import SuccessBox from "../../Components/payment/SuccessBox";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Footer from "../../Components/Footer/Footer1";
import "./payment3.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";


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
  bookingClass: string;

}

const Payment3: React.FC<BookingData> = () => {
  const location = useLocation();
   const state=location.state;
  // const [bookingData,setBookingData]=useState<BookingData>();
  // setBookingData(location.state)
  return (
    <>
      <div className="d-flex flex-column min-vh-100" id="payment3_body">
        <PrimaryNavBar />
     
        <SuccessBox {...state} />

       <div className="mt-auto">
          <Footer />
        </div>

      </div>
    </>
  );
}
export default Payment3;
