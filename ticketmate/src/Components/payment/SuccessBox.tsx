import Rec2 from "./asset/rec2.png";
import Checkmark from "./asset/checkmark.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


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

const SuccessBox: React.FC<BookingData> = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

 

   

  const buttonStyle = {
    backgroundColor: "rgb(4,47,64)",
    color: "white",
    width: "75%",
    height: "60%",
  };



  return (
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
            <img src={Checkmark} alt="Checkmark" />
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
            onClick={() => navigate("/payment4", { state: { ...props } })}
          >
            Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessBox;


// import Rec2 from "./asset/rec2.png";
// import Checkmark from "./asset/checkmark.png";
// import { useNavigate } from "react-router-dom";
// import withReactContent from 'sweetalert2-react-content';
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// const MySwal = withReactContent(Swal);

// interface BookingData {
//   driverId: number;
//   busBookingId: number;
//   busScheduleId: number;
//   busId: number;
//   passengerId: string;
//   routeNo: string;
//   startLocation: string;
//   endLocation: string;
//   boardingPoint: string;
//   droppingPoint: string;
//   startTime: string;
//   endTime: string;
//   bookingDate: string;
//   bookingSeatNO: string;
//   bookingSeatCount: string;
//   ticketPrice: number;
//   totalPaymentAmount: number;
//   paymentStatus: boolean;
//   trainBookingId: number;
//   trainScheduleId: number;
//   bookingCarriageNo: number;
//   bookingClass: string;
//   clientSecret: string;
// }

// const SuccessBox: React.FC<BookingData> = (props) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     MySwal.fire({
//       title: 'Loading...',
//       text: 'Please wait while we load your data',
//       allowOutsideClick: false,
//       didOpen: () => {
//         MySwal.showLoading();
//       },
//     });

//     // Simulating data fetching, you should replace this with actual data fetching logic
//     setTimeout(() => {
//       setLoading(false);
//       MySwal.close();
//     }, 2000); // Adjust the timeout as needed
//   }, []);

//   const buttonStyle = {
//     backgroundColor: "rgb(4,47,64)",
//     color: "white",
//     width: "75%",
//     height: "60%",
//   };

//   if (loading) {
//     return null; // Return null or a loader component while data is loading
//   }

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-center align-items-center position-relative">
//         <img src={Rec2} className="rounded mx-auto d-block" alt="Rec2" />

//         <div className="position-absolute top-50 start-50 translate-middle">
//           <p
//             className="d-flex justify-content-center"
//             style={{
//               color: "rgb(0,117,124",
//               fontFamily: "Poppins",
//               fontSize: "20px",
//               fontWeight: "Regular",
//             }}
//           >
//             Payment Successful
//           </p>
//           <div className="d-flex justify-content-center">
//             <img src={Checkmark} alt="Checkmark" />
//           </div>

//           <p
//             className="d-flex justify-content-center"
//             style={{
//               fontFamily: "Poppins",
//               fontSize: "16px",
//               fontWeight: "Regular",
//             }}
//           >
//             Thank You
//           </p>
//           <button
//             type="button"
//             className="btn btn-primary ml-3"
//             style={buttonStyle}
//             onClick={() => navigate("/payment4", { state: { ...props } })}
//           >
//             Receipt
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SuccessBox;
