import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";


function PayNowbtn(){

    const [userId, setUserId] = useState("");//to pass userId 
    const [tripId, setTripId] = useState("");//to pass tripId

    const history = useNavigate();

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
            const response = await axios.post('https://localhost:7296/api/Email/SendEmails', 
            {
                to: "",
                message: ""
            });
            console.log(response.data);
            history ("/payment3",{state:{userId,tripId}})

            //alert("Your payment is successfully done.Your email has been received tickets.");
        }catch(error){
            console.error('Error:', error);
            alert("Error in sending email");
        }
    };
      

   

    return(
        <div className="d-grid">
            <button className="btn mt-5" type="button" style={buttonStyle}  onClick={handlePayNowClick} >Pay Now</button>

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