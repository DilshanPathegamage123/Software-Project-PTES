import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";


function PayNowbtn(){
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
            alert("Your payment is successfully done.Your email has been received tickets.");
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