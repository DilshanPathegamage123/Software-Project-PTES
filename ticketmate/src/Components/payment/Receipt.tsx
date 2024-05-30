import React, { useRef, useState } from "react";
import Rec3 from "./asset/rec3.png";
import Rec4 from "./asset/rec4.png";
import StartEndLocation from "./StartEnd";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Receipt() {
  
 const pdfRef= useRef<HTMLDivElement>(null);

  let location = useLocation();
  //let { userId, tripId } = location.state;//pass userId and tripId
  const buttonStyle1 = {
    backgroundColor: "rgba(0, 117, 124,1)",
    color: "white", // Optionally change text color to ensure readability
  };
  const buttonStyle2 = {
    backgroundColor: "rgba(4, 47, 64, 1)",
    color: "white", // Optionally change text color to ensure readability
  };
  const downloadPDF = () => {
    const input = pdfRef.current;
    if (input) {
     html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4",true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight =pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio=Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
      const imgX=(pdfWidth-imgWidth*ratio)/2;
      const imgY=30;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
     });}
     else{
      alert("No data to download pdf");
    }
  };
  return (
    <>
      <div className="container">
        {/* <div className="bg-white rounded-3 shadow"> */}

        {/* <div className="bg-white rounded-3 shadow"> */}
        <div className="d-flex justify-content-center align-items-center position-relative img-fluid mt-5" ref={pdfRef}>
          <img src={Rec3} alt="Rec3" />
          <div className="position-absolute">
            <div className="row justify-content-center">
              <div className="col-auto">
                <p className="text-success fs-6 fw-bold font-family-Poppins">
                  Receipt
                </p>
              </div>
            </div>
            <p className="text-success fs-6 fw-normal font-family-Poppins  m-0 px-3 py-2">
              TRIP NO-34738M
            </p>
            <p className="text-black text-opacity-50 fs-6 fw-normal font-family-Poppins  m-0 px-3 py-2">
              Passenger ID
            </p>
            <p className="text-black fs-6 fw-bold font-family-Poppins  m-0 px-3 py-2">
              COMPLETED
            </p>
            <StartEndLocation />
            <div className="container">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-4" style={{ lineHeight: "1" }}>
                  <p className=" m-1">Date</p>
                  <p className=" m-1">Route Number</p>
                  <p className="m-1">Start Time</p>
                  <p className=" m-1">End Time</p>
                  <p className=" m-1">Passengers</p>
                  <p className=" m-1">Total Trip Fair</p>
                  <p className=" m-1">Payment Method</p>
                </div>
                <div className="col-4" style={{ lineHeight: "1" }}>
                  <p className=" date text-end m-1">20 February 2024</p>
                  <p className="routenumber text-end m-1">199</p>
                  <p className="starttime text-end m-1">5.50 am</p>
                  <p className="endtime text-end m-1">11.15 am</p>
                  <p className="passenger text-end m-1">2</p>
                  <p className="tripfair text-end m-1">LKR 2500.00</p>
                  <p className="paymentmethod text-end m-1">cash</p>
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
              >
                CANCEL
              </button>
            </div>

        {/* </div> */}
      </div>
    </>
  );
}
export default Receipt;
