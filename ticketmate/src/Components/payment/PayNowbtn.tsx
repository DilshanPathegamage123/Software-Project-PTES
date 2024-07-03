import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import QRCode from 'qrcode';
import axios from "axios";

interface BookingData {
  disabled: boolean ;

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
  bookingClass:string;

}

const PayNowbtn:React.FC<BookingData> = (props)=>{

    const [userId, setUserId] = useState("10");//to pass userId 
    const [tripId, setTripId] = useState("23");//to pass tripId


    const history = useNavigate();
    const PassengerId = "1";
    const buttonStyle = {
        backgroundColor: 'rgb(255,199,0)',
        color: 'white', // Optionally change text color to ensure readability
        
        width: '75%',
        height: '40%',
      };
      const handlePayNowClick = async () => {

        // Display an alert when the "Pay Now" button is clicked
        // alert("Your payment is successfully done.Your email has been received tickets.");
        const qrCodeData = JSON.stringify({
        
          passengerId: props.passengerId,
          bookingSeatNO: props.bookingSeatNO,
          boardingPoint: props.boardingPoint,
          droppingPoint: props.droppingPoint,
         
        });
    
       
      // Generate base64 QR code
      QRCode.toDataURL(qrCodeData, { width: 150, margin: 1 }, async (err, url) => {
        if (err) {
          console.error(err);
          return;
        }
        try{
            const response = await axios.post(`https://localhost:7296/api/Email/SendEmails/${PassengerId}`, 

            {
                to: "",
                message:  `
                <html>
                  <body>
                    <p>Dear customer(${props.passengerId}),</p>
                    <p>We are delighted to inform you that your seat booking has been successfully processed and confirmed. Please find below the details of your reservation:</p>
                    <ul>
                     <li><strong>Booking Date:</strong> ${props.bookingDate}</li>
                     <li><strong>Payment Method:</strong> Cash</li>
                     <li><strong>Booked Seat No.:</strong> ${props.bookingSeatNO}</li>
                     <li><strong>Total Seats Booked:</strong> ${props.bookingSeatCount}</li>
                     <li><strong>Ticket Price:</strong> ${props.ticketPrice}</li>
                     <li><strong>Total Payment Amount:</strong> ${props.totalPaymentAmount}</li>
                    </ul>
                    <p>You can make your payment in cash on the day of your trip.</p>
                    <p>Thank you for choosing our service. We look forward to serving you aboard our service. Should you have any further inquiries or require assistance, please feel free to contact us at +9471 1152 633.</p>
                    <p>Warm regards,</p>
                    <p>R.M.H.Ranasinghe<br>
                    Director<br>
                    TicketMate<br>
                    +9471 123 2145</p>
                    <p>QR Code for your booking:</p>
                    <div><img src="${url}" alt="QR Code"></div>

                  </body>
                </html>
              `,
            });
            console.log(response.data);
            if (props.busId) {
            axios
          .post("https://localhost:7296/api/BusBooking", {
            busBookingId: props.busBookingId,
            busScheduleId: props.busScheduleId,
            busId: props.busId,
            passengerId:props.passengerId,
            routeNo: props.routeNo,
            startLocation: props.startLocation,
            endLocation: props.endLocation,
            boardingPoint: props.boardingPoint,
            droppingPoint: props.droppingPoint,
            startTime: props.startTime,
            endTime: props.endTime,
            bookingDate: props.bookingDate,
            paymentDate: "None", // Use the formatted payment date here
            paymentMethod: "cash",
            bookingSeatNO: props.bookingSeatNO,
            bookingSeatCount: props.bookingSeatCount,
            ticketPrice: props.ticketPrice,
            totalPaymentAmount: props.totalPaymentAmount,
            paymentStatus: false,
            paymentId:"None",
          })


          .then((bookingResponse) => {
            console.log("Bus Booking successful", bookingResponse);
            history("/payment4", { state: { ...props} });
          })
          .catch((bookingError) => {
            console.error("Failed to book", bookingError);
          });
        } else {
          // If busNo is empty, make a train booking
          axios
            .post("https://localhost:7296/api/TrainBooking", {
              // Provide train booking details here
              trainBookingId: props.trainBookingId,
              trainScheduleId: props.trainScheduleId,
              passengerId: props.passengerId,
              routeNo: props.routeNo,
              startLocation: props.startLocation,
              endLocation: props.endLocation,
              boardingPoint: props.boardingPoint,
              droppingPoint: props.droppingPoint,
              startTime: props.startTime,
              endTime: props.endTime,
              bookingDate: props.bookingDate,
              paymentDate: "None",
              paymentMethod:"cash",
              bookingClass:props.bookingClass, 
              bookingCarriageNo: props.bookingCarriageNo,
              bookingSeatNO: props.bookingSeatNO,
              bookingSeatCount: props.bookingSeatCount,
              ticketPrice: props.ticketPrice,
              totalPaymentAmount: props.totalPaymentAmount,
              paymentStatus: false,
              paymentId:"None",
            })
            .then(response => {
              console.log("Train booking successful:", response.data);
              history("/payment4", { state: { ...props } });
              // Handle success response if needed
            })
            .catch(error => {
              console.error("Error making train booking:", error);
              // Handle error if needed
            });
          }
            //alert("Your payment is successfully done.Your email has been received tickets.");
        }catch(error){
            alert("Error in sending email");
           

        }
      });
    };
      

   

    return(
        <div className="d-grid">
            <button className="btn mt-5 mb-5" type="button" style={buttonStyle}  onClick={handlePayNowClick} 
            disabled={props.disabled} >Confirm</button>
            {/* <button className="btn mt-5" type="button" style={buttonStyle}   onClick={() => history("/payment3",{state:{userId,tripId}})} >Pay Now</button> */}

        </div>
    )
}
export default PayNowbtn;
