import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Footer from "../../Components/Footer/Footer1";
import "./payment4.css";
import Receipt from "../../Components/payment/Receipt";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);


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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MySwal.fire({
      title: 'Loading...',
      text: 'Please wait while we load your data',
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    // Simulating data fetching, you should replace this with actual data fetching logic
    setTimeout(() => {
      setLoading(false);
      MySwal.close();
    }, 2000); // Adjust the timeout as needed
  }, []);
  if (loading) {
    return null; // Return null or a loader component while data is loading
  }
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


