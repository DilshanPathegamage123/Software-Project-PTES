import React from 'react';  
import axios from 'axios';
function ConfirmButton(){
    const buttonStyle = {
        backgroundColor: 'rgb(255,199,0)',
        color: 'white', // Optionally change text color to ensure readability
        
        width: '75%',
        height: '60%',
      };
      const handlePayNowClick = () => {
        // Make an HTTP POST request to your backend API endpoint
        axios.post('https://localhost:7296/api/Email/SendEmails', {
            // Pass any necessary data in the request body
            // For example, payment information
        })
        .then(response => {
            // Handle successful response
            alert("Your email has been received tickets.");
        })
        .catch(error => {
            // Handle error
            console.error('Error sending email:', error);
            alert("Failed to send email. Please try again later.");
        });
    };
    return(
        <div className="d-grid">
            <button className="btn mt-2 mb-5" type="button" style={buttonStyle} onClick={handlePayNowClick}>Confirm</button>
        </div>
    )
}
export default ConfirmButton;