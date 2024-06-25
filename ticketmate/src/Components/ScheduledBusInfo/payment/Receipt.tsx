// import React, { useEffect, useRef, useState } from "react";
// import Rec3 from "./asset/rec3.png";
// import Rec4 from "./asset/rec4.png";
// import StartEndLocation from "./StartEnd";
// import { useLocation, useNavigate } from "react-router-dom";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

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
//   bookingClass: number;

//   clientSecret: string;
// }

// const Receipt: React.FC<BookingData> = (props) => {
//   const pdfRef = useRef<HTMLDivElement>(null);
//   const history = useNavigate();

//   console.log("Receipt props final", props);
//   useEffect(() => {
//     console.log("Updated Receipt props", props);
//   }, [props]);

//   //let location = useLocation();
//   //let { userId, tripId } = location.state;//pass userId and tripId
//   const buttonStyle1 = {
//     backgroundColor: "rgba(0, 117, 124,1)",
//     color: "white", // Optionally change text color to ensure readability
//   };
//   const buttonStyle2 = {
//     backgroundColor: "rgba(4, 47, 64, 1)",
//     color: "white", // Optionally change text color to ensure readability
//   };
//   const downloadPDF = () => {
//     const input = pdfRef.current;
//     if (input) {
//       html2canvas(input).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdfWidth = 500; // mm
//         const pdfHeight = 500; // mm
//         const pdf = new jsPDF("p", "pt", [pdfWidth, pdfHeight]);
//         const imgWidth = canvas.width;
//         const imgHeight = canvas.height;
//         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//         const imgX = (pdfWidth - imgWidth * ratio) / 2;
//         const imgY = 30;
//         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//         pdf.save("download.pdf");
//       });
//     } else {
//       alert("No data to download pdf");
//     }
//   };
  
//   console.log("Passenger ID:", props.passengerId);
//   return (
//     <>
//       <div className="container">
//         <div
//           className="d-flex justify-content-center align-items-center position-relative img-fluid mt-5"
//           ref={pdfRef}
//         >
//           <img src={Rec3} alt="Rec3" />
//           <div className="position-absolute">
//             <div className="row justify-content-center">
//               <div className="col-auto">
//                 <p className="text-success fs-6 fw-bold font-family-Poppins">
//                   Receipt
//                 </p>
//               </div>
//             </div>
//             <p className="text-success fs-6 fw-normal font-family-Poppins  m-0 px-3 py-2">
//               TRIP NO-{" "}
//               {props.busScheduleId
//                 ? props.busScheduleId
//                 : props.trainScheduleId}
//             </p>
//             <p className="text-black text-opacity-50 fs-6 fw-normal font-family-Poppins  m-0 px-3 py-2">
//               {/* Passenger ID- {props.passengerId || 'N/A'} */}
              
//               Passenger ID- {props.passengerId !== null && props.passengerId !== undefined ? props.passengerId : 'N/A'}
//             </p>
//             <p className="text-black fs-6 fw-bold font-family-Poppins  m-0 px-3 py-2">
//               COMPLETED
//             </p>
//             <StartEndLocation {...props} />
//             <div className="container">
//               <div className="row">
//                 <div className="col-2"></div>
//                 <div className="col-4" style={{ lineHeight: "1" }}>
//                   <p className=" m-1">Date</p>
//                   <p className=" m-1">Route Number</p>
//                   <p className="m-1">Bording Point</p>
//                   <p className=" m-1">Dropping Point</p>
//                   <p className=" m-1">Passengers</p>
//                   <p className=" m-1">Total Trip Fair</p>
//                   <p className=" m-1">Payment Method</p>
//                 </div>
//                 <div className="col-4" style={{ lineHeight: "1" }}>
//                   <p className=" date text-end m-1">{props.bookingDate}</p>
//                   <p className="routenumber text-end m-1">
//                     {props.routeNo}
//                   </p>
//                   <p className="starttime text-end m-1">
//                     {props.boardingPoint}
//                   </p>
//                   <p className="endtime text-end m-1">{props.droppingPoint}</p>
//                   <p className="passenger text-end m-1">
//                     {props.bookingSeatCount}
//                   </p>
//                   <p className="tripfair text-end m-1">
//                     LKR {props.totalPaymentAmount}
//                   </p>
//                   <p className="paymentmethod text-end m-1">
//                     {props.clientSecret ? "Card" : "Cash"}
//                   </p>
//                 </div>
//                 <div className="col-2"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="d-flex justify-content-end">
//           <button
//             type="button"
//             className="btn btn-primary mt-4"
//             style={buttonStyle1}
// onClick={downloadPDF}
//           >
//             DOWNLOAD
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary ml-3 mt-4"
//             style={buttonStyle2}
//             onClick={() => history("/")}
//           >
//             CANCEL
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Receipt;



// import React, { useEffect, useRef } from "react";
// import Rec3 from "./asset/rec3.png";
// import StartEndLocation from "./StartEnd";
// import { useNavigate } from "react-router-dom";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

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
//   bookingClass: number;
//   clientSecret: string;
// }

// const Receipt: React.FC<BookingData> = (props) => {
//   const pdfRef = useRef<HTMLDivElement>(null);
//   const history = useNavigate();

//   const buttonStyle1 = {
//     backgroundColor: "rgba(0, 117, 124,1)",
//     color: "white",
//   };
//   const buttonStyle2 = {
//     backgroundColor: "rgba(4, 47, 64, 1)",
//     color: "white",
//   };

//   const downloadPDF = () => {
//     const input = pdfRef.current;
//     if (input) {
//       input.classList.add('hidden');
//       html2canvas(input).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "pt", "a4");
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
//         const imgWidth = canvas.width;
//         const imgHeight = canvas.height;
//         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//         const imgX = (pdfWidth - imgWidth * ratio) / 2;
//         const imgY = 30;
//         pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
//         pdf.save("download.pdf");
//         input.classList.remove('hidden');
//       });
//     } else {
//       alert("No data to download pdf");
//     }
//   };

//   console.log("Passenger ID:", props.passengerId);
//   return (
//     <>
//       <div className="container">
//         <div className="d-flex justify-content-center align-items-center position-relative img-fluid mt-5">
//           <img src={Rec3} alt="Rec3" />
//           <div className="position-absolute essential-data" ref={pdfRef}>
//             <div className="row justify-content-center">
//               <div className="col-auto">
//                 <p className="text-success fs-6 fw-bold font-family-Poppins">
//                   Receipt
//                 </p>
//               </div>
//             </div>
//             <p className="text-success fs-6 fw-normal font-family-Poppins m-0 px-3 py-2">
//               TRIP NO-{" "}
//               {props.busScheduleId
//                 ? props.busScheduleId
//                 : props.trainScheduleId}
//             </p>
//             <p className="text-black text-opacity-50 fs-6 fw-normal font-family-Poppins m-0 px-3 py-2">
//               Passenger ID-{" "}
//               {props.passengerId !== null && props.passengerId !== undefined
//                 ? props.passengerId
//                 : "N/A"}
//             </p>
//             <p className="text-black fs-6 fw-bold font-family-Poppins m-0 px-3 py-2">
//               COMPLETED
//             </p>
//             <StartEndLocation {...props} />
//             <div className="container">
//               <div className="row">
//                 <div className="col-2"></div>
//                 <div className="col-4" style={{ lineHeight: "1" }}>
//                   <p className="m-1">Date</p>
//                   <p className="m-1">Route Number</p>
//                   <p className="m-1">Boarding Point</p>
//                   <p className="m-1">Dropping Point</p>
//                   <p className="m-1">Passengers</p>
//                   <p className="m-1">Total Trip Fair</p>
//                   <p className="m-1">Payment Method</p>
//                 </div>
//                 <div className="col-4" style={{ lineHeight: "1" }}>
//                   <p className="date text-end m-1">{props.bookingDate}</p>
//                   <p className="routenumber text-end m-1">{props.routeNo}</p>
//                   <p className="starttime text-end m-1">{props.boardingPoint}</p>
//                   <p className="endtime text-end m-1">{props.droppingPoint}</p>
//                   <p className="passenger text-end m-1">{props.bookingSeatCount}</p>
//                   <p className="tripfair text-end m-1">LKR {props.totalPaymentAmount}</p>
//                   <p className="paymentmethod text-end m-1">
//                     {props.clientSecret ? "Card" : "Cash"}
//                   </p>
//                 </div>
//                 <div className="col-2"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="d-flex justify-content-end">
//           <button
//             type="button"
//             className="btn btn-primary mt-4"
//             style={buttonStyle1}
//             onClick={downloadPDF}
//           >
//             DOWNLOAD
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary ml-3 mt-4"
//             style={buttonStyle2}
//             onClick={() => history("/")}
//           >
//             CANCEL
//           </button>
//         </div>
//       </div>

//       <style>
//         {`
//           .hidden .img-fluid,
//           .hidden .position-absolute {
//             display: none;
//           }
//           .hidden .essential-data {
//             display: block;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Receipt;



import React, { useEffect, useRef } from "react";
import Rec3 from "./asset/rec3.png";
import StartEndLocation from "./StartEnd";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  bookingClass: number;
  clientSecret: string;
}

const Receipt: React.FC<BookingData> = (props) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const history = useNavigate();

  const buttonStyle1 = {
    backgroundColor: "rgba(0, 117, 124,1)",
    color: "white",
  };
  const buttonStyle2 = {
    backgroundColor: "rgba(4, 47, 64, 1)",
    color: "white",
  };

  const downloadPDF = () => {
    const input = pdfRef.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save("download.pdf");
      });
    } else {
      alert("No data to download pdf");
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center position-relative img-fluid mt-5">
          <img src={Rec3} alt="Rec3" />
          <div className="position-absolute essential-data" ref={pdfRef}>
            <div className="row justify-content-center">
              <div className="col-auto">
                <p className="text-success fs-6 fw-bold font-family-Poppins">
                  Receipt
                </p>
              </div>
            </div>
            <p className="text-success fs-6 fw-normal font-family-Poppins m-0 px-3 py-2">
              TRIP NO-{" "}
              {props.busScheduleId
                ? props.busScheduleId
                : props.trainScheduleId}
            </p>
            <p className="text-black text-opacity-50 fs-6 fw-normal font-family-Poppins m-0 px-3 py-2">
              Passenger ID-{" "}
              {props.passengerId !== null && props.passengerId !== undefined
                ? props.passengerId
                : "N/A"}
            </p>
            <p className="text-black fs-6 fw-bold font-family-Poppins m-0 px-3 py-2">
              COMPLETED
            </p>
            <div>
              <StartEndLocation {...props} />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-4" style={{ lineHeight: "1" }}>
                  <p className="m-1">Date</p>
                  <p className="m-1">Route Number</p>
                  <p className="m-1">Boarding Point</p>
                  <p className="m-1">Dropping Point</p>
                  <p className="m-1">Passengers</p>
                  <p className="m-1">Total Trip Fair</p>
                  <p className="m-1">Payment Method</p>
                </div>
                <div className="col-4" style={{ lineHeight: "1" }}>
                  <p className="date text-end m-1">{props.bookingDate}</p>
                  <p className="routenumber text-end m-1">{props.routeNo}</p>
                  <p className="starttime text-end m-1">{props.boardingPoint}</p>
                  <p className="endtime text-end m-1">{props.droppingPoint}</p>
                  <p className="passenger text-end m-1">{props.bookingSeatCount}</p>
                  <p className="tripfair text-end m-1">LKR {props.totalPaymentAmount}</p>
                  <p className="paymentmethod text-end m-1">
                    {props.clientSecret ? "Card" : "Cash"}
                  </p>
                </div>
                <div className="col-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary mt-4"
            style={buttonStyle1}
            onClick={downloadPDF}
          >
            DOWNLOAD
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-3 mt-4"
            style={buttonStyle2}
            onClick={() => history("/")}
          >
            CANCEL
          </button>
        </div>
      </div>

    </>
  );
};

export default Receipt;
