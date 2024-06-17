import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from "axios";


function PayNowbtn(){

    const [userId, setUserId] = useState("10");//to pass userId 
    const [tripId, setTripId] = useState("23");//to pass tripId
    const history = useNavigate();

    const PassengerId = "1";
    const buttonStyle = {
        backgroundColor: 'rgb(255,199,0)',
        color: 'white', // Optionally change text color to ensure readability
        
        width: '75%',
        height: '60%',
      };
      const handlePayNowClick = async () => {

        // Display an alert when the "Pay Now" button is clicked
        // alert("Your payment is successfully done.Your email has been received tickets.");

        try{
            const response = await axios.post(`https://localhost:7296/api/Email/SendEmails/${PassengerId}`, 

            {
                to: "",
                message: ""
            });
            console.log(response.data);
            axios
          .post("https://localhost:7296/api/BusBooking", {
            busBookingId: 0,
            busScheduleId: "9",
            busId: "6",
            passengerId: "1",
            routeNo: "155/3",
            startLocation: "Minuwangoda",
            endLocation: "Colombo",
            boardingPoint: "Kotugoda",
            droppingPoint: "Ja-Ela",
            startTime: "06.30 am",
            endTime: "07.15 am",
            bookingDate: "2021-09-21",
            paymentDate: "None", // Use the formatted payment date here
            paymentMethod: "cash",
            bookingSeatNO: "15",
            bookingSeatCount: "1",
            ticketPrice: "155",
            totalPaymentAmount: "155",
            paymentStatus: true,
            paymentId:"None",
          })
          .then((bookingResponse) => {
            console.log("Booking successful", bookingResponse);
            history("/payment4", { state: { userId, tripId } });
          })
          .catch((bookingError) => {
            console.error("Failed to book", bookingError);
          });
            //alert("Your payment is successfully done.Your email has been received tickets.");
        }catch(error){
            alert("Error in sending email");
           

        }
    };
      

   

    return(
        <div className="d-grid">
            <button className="btn mt-5" type="button" style={buttonStyle}  onClick={handlePayNowClick} >Pay Now</button>
            {/* <button className="btn mt-5" type="button" style={buttonStyle}   onClick={() => history("/payment3",{state:{userId,tripId}})} >Pay Now</button> */}

        </div>
    )
}
export default PayNowbtn;

// const PayNowbtn = ({route}: {route: any}) => {
//     const navigate = useNavigate();
  
//     const handleClick = () => {
//       // Navigate to the desired route when the button is clicked
//       navigate(route);
//     };
//     return (
//         <div className="ButtonContainer">
//             <button
//                 className="Button"
//                 onClick={handleClick} style={{width:100, height:50, color:'red' }}>
//                 Pay Now
//                 </button>
//         </div>
//     );
//     };
//     export default PayNowbtn;