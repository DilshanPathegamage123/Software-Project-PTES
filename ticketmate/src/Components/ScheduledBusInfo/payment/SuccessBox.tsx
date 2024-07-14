import Rec2 from "./asset/rec2.png";
import Checkmark from "./asset/checkmark.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

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

  trainBookingId: number;
  trainScheduleId: number;
  bookingCarriageNo: number;
  bookingClass: string;

  clientSecret: string;

}
const SuccessBox:React.FC<BookingData> = (props)=>{
  
  //let location = useLocation();
  //let { userId, tripId } = location.state;
  //console.log(userId, tripId);
  const history = useNavigate();
  console.log("props-successbox",props);
  const buttonStyle = {
    backgroundColor: "rgb(4,47,64)",
    color: "white", // Optionally change text color to ensure readability

    width: "75%",
    height: "60%",
  };
  //  const usenavigate = useNavigate();

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center position-relative">
          <img src={Rec2} className="rounded mx-auto d-block" alt="Rec2" />

          <div className="position-absolute top-50 start-50 translate-middle">
            <p
              className="d-flex justify-content-center"
              style={{
                color: "rgb(0,117,124",
                fontFamily: "Poppins",
                fontSize: "20px",
                fontWeight: "Regular",
              }}
            >
              Payment Successful
            </p>
            <div className="d-flex justify-content-center">
              <img src={Checkmark} alt={Checkmark} />
            </div>

            <p
              className="d-flex justify-content-center"
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "Regular",
              }}
            >
              Thank You
            </p>
            <button
              type="button"
              className="btn btn-primary ml-3"
              style={buttonStyle}
              onClick={() => history("/payment4",{state:{...props}})}
             
               // Remove the argument from the useNavigate function call
            >
              Receipt  
            </button>
          {/* </Link> */}

          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessBox;
