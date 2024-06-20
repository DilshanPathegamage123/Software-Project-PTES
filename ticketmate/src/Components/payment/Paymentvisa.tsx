// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import './Paymentvisa.css'
// import SelectMonth from './SelectMonth';
// import SelectYear from './SelectYear';
// import Passenger from './Passenger';
// import PayNowbtn from './PayNowbtn';
// import axios from "axios";

// function Paymentvisa() {
//     const [cardNumber, setCardNumber] = useState('');
//     const [cvv, setCVV] = useState('');
//     const [isCardNumberValid, setIsCardNumberValid] = useState(true);
//     const [isCVVValid, setIsCVVValid] = useState(true);
import React, { useState } from 'react';

import './Paymentvisa.css'
import SelectMonth from './SelectMonth';
import SelectYear from './SelectYear';
import Passenger from './Passenger';
import PayNowbtn from './PayNowbtn';
function Paymentvisa() {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCVV] = useState('');
    const [isCardNumberValid, setIsCardNumberValid] = useState(true);
    const [isCVVValid, setIsCVVValid] = useState(true);


    const handleCardNumberChange = (event: { target: { value: any; }; }) => {
        const { value } = event.target;
        setCardNumber(value);
        setIsCardNumberValid(validateCardNumber(value));
    };

    const handleCVVChange = (event: { target: { value: any; }; }) => {
        const { value } = event.target;
        setCVV(value);
        setIsCVVValid(validateCVV(value));
    };

    const validateCardNumber = (cardNumber: string) => {
        // Simple Luhn algorithm validation
        const sanitizedInput = cardNumber.replace(/\D/g, '');
        let sum = 0;
        let shouldDouble = false;
        for (let i = sanitizedInput.length - 1; i >= 0; i--) {
            let digit = parseInt(sanitizedInput.charAt(i));
            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    };
    const validateCVV = (cvv: string) => {
        return /^[0-9]{3}$/.test(cvv);
    };

    return(
<>

<div className="container">
    <div className="row">
        <div className="col-6">
            
                
                
                    <form>
                    <div className="form-group">                           
                            <input type="text" className="form-control" placeholder="John Henry" aria-label="name" />
                        </div>
                        <div className="form-group">        
                           <label> <input type="text"  className={`form-control ${!isCardNumberValid ? 'is-invalid' : ''}`} placeholder="45** **** **** 3947" aria-label="cardno" value={cardNumber} onChange={handleCardNumberChange}/>
                           {!isCardNumberValid && <div className="invalid-feedback">Invalid card number</div>}
                           </label>

                        </div>
                        {/* <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>                        
                           <SelectMonth/>
                           <SelectYear/>
                        </div> */}
                        <div className="row g-5">
                        <div className="col-md-4">
                        <SelectMonth/>
                        </div>
                        {/* <div className="col-md-1"></div> */}
                        <div className="col-md-4 ml-4">
                        <SelectYear/>
                        </div>
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>                            
                        <input
                                    type="text"
                                    className={`form-control ${!isCVVValid ? 'is-invalid' : ''}`}
                                    placeholder="145"
                                    style={{ width: 162.19, marginRight: '14px'}}
                                    value={cvv}
                                    onChange={handleCVVChange}
                                />
                            <p style={{ width: '162.19px', margin: 0, fontSize:11, color:'grey'}} >3 or 4 digits usually found on the signature strip</p>
                            {!isCVVValid && <div className="invalid-feedback">Invalid CVV</div>}

                        </div>
                        <div className="form-check form-switch">
                        <label className="form-check-label ml-0" htmlFor="flexSwitchCheckDefault">SET AS DEFAULT</label> 
                        <input className="form-check-input ml-3" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input mt-2" type="checkbox" id="inlineCheckbox1" value="option1"/>
                        <label className="form-check-label ml-2" htmlFor="inlineCheckbox1" style={{ fontStyle: 'italic', fontSize: '12px'}}>By Continuing your agree to our <a href='#'>Terms and Conditions.</a></label>
                        </div>

                    </form>
                
            
           
        </div>
        
        <div className="col-6 mt-5">
          <Passenger/>
          <PayNowbtn/>
          </div>
          
    </div>
</div>

//     const [userId, setUserId] = useState("10");//to pass userId
//     const [tripId, setTripId] = useState("23");//to pass tripId
//     const history = useNavigate();

//     const buttonStyle = {
//         backgroundColor: 'rgb(255,199,0)',
//         color: 'white', // Optionally change text color to ensure readability

//         width: '75%',
//         height: '60%',
//       };
//     const handlePayNowClick = async () => {

//         try{
//             const response = await axios.post('https://localhost:7296/api/Email/SendEmails',
//             {
//                 to: "",
//                 message: ""
//             });
//             console.log(response.data);
//             history ("/payment3",{state:{userId,tripId}})

//             //alert("Your payment is successfully done.Your email has been received tickets.");
//         }catch(error){
//             console.error('Error:', error);
//             alert("Error in sending email");
//             history ("/payment3",{state:{userId,tripId}})
//         }
//         };

//     const handleCardNumberChange = (event: { target: { value: any; }; }) => {
//         const { value } = event.target;
//         setCardNumber(value);
//         setIsCardNumberValid(validateCardNumber(value));
//     };


function validateCVV(value: any): React.SetStateAction<boolean> {
    throw new Error('Function not implemented.');
}

// import './Paymentvisa.css';
// import SelectMonth from './SelectMonth';
// import SelectYear from './SelectYear';

//     const handleCVVChange = (event: { target: { value: any; }; }) => {
//         const { value } = event.target;
//         setCVV(value);
//         setIsCVVValid(validateCVV(value));
//     };

//     const validateCardNumber = (cardNumber: string) => {
//         // Simple Luhn algorithm validation
//         const sanitizedInput = cardNumber.replace(/\D/g, '');
//         let sum = 0;
//         let shouldDouble = false;
//         for (let i = sanitizedInput.length - 1; i >= 0; i--) {
//             let digit = parseInt(sanitizedInput.charAt(i));
//             if (shouldDouble) {
//                 if ((digit *= 2) > 9) digit -= 9;
//             }
//             sum += digit;
//             shouldDouble = !shouldDouble;
//         }
//         return sum % 10 === 0;
//     };
//     const validateCVV = (cvv: string) => {
//         return /^[0-9]{3}$/.test(cvv);
//     };

//     return(
// <>

// <div className="container">
//     <div className="row">
//         <div className="col-6">

//                     <form>
//                     <div className="form-group">
//                             <input type="text" className="form-control" placeholder="John Henry" aria-label="name" />
//                         </div>
//                         <div className="form-group">
//                            <label>
//                             <input type="text"  className={`form-control ${!isCardNumberValid ? 'is-invalid' : ''}`} placeholder="45** **** **** 3947" aria-label="cardno" value={cardNumber} onChange={handleCardNumberChange}/>
//                            {!isCardNumberValid && <div className="invalid-feedback">Invalid card number</div>}
//                            </label>

//                         </div>
//                         {/* <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
//                            <SelectMonth/>
//                            <SelectYear/>
//                         </div> */}
//                         <div className="row g-5">
//                         <div className="col-md-4">
//                         <SelectMonth/>
//                         </div>
//                         {/* <div className="col-md-1"></div> */}
//                         <div className="col-md-4 ml-4">
//                         <SelectYear/>
//                         </div>
//                         </div>
//                         <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
//                         <input
//                                     type="text"
//                                     className={`form-control ${!isCVVValid ? 'is-invalid' : ''}`}
//                                     placeholder="145"
//                                     style={{ width: 162.19, marginRight: '14px'}}
//                                     value={cvv}
//                                     onChange={handleCVVChange}
//                                 />
//                             <p style={{ width: '162.19px', margin: 0, fontSize:11, color:'grey'}} >3 or 4 digits usually found on the signature strip</p>
//                             {!isCVVValid && <div className="invalid-feedback">Invalid CVV</div>}

//                         </div>
//                         <div className="form-check form-switch">
//                         <label className="form-check-label ml-0" htmlFor="flexSwitchCheckDefault">SET AS DEFAULT</label>
//                         <input className="form-check-input ml-3" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
//                         </div>
//                         <div className="form-check form-check-inline">
//                         <input className="form-check-input mt-2" type="checkbox" id="inlineCheckbox1" value="option1"/>
//                         <label className="form-check-label ml-2" htmlFor="inlineCheckbox1" style={{ fontStyle: 'italic', fontSize: '12px'}}>By Continuing your agree to our <a href='#'>Terms and Conditions.</a></label>
//                         </div>

//                     </form>

//         </div>

//         <div className="col-6 mt-5">
//             <Passenger/>
//             {/* <PayNowbtn />  */}
//             <div className="d-grid">
//             <button className="btn mt-5" type="button" style={buttonStyle}  onClick={handlePayNowClick} >Pay Now</button>
//             {/* <button className="btn mt-5" type="button" style={buttonStyle}   onClick={() => history("/payment3",{state:{userId,tripId}})} >Pay Now</button> */}
//         </div>
//             </div>

//     </div>
// </div>

// </>
//     )
// }
// export default Paymentvisa;

// function validateCVV(value: any): React.SetStateAction<boolean> {
//     throw new Error('Function not implemented.');
// }








// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import Passenger from "./Passenger";

// interface BookingProps {
//   BusScheduleId: number;
//   PassengerId: string;
//   busId: string;
//   RouteNo: string;
//   StartLocation: string;
//   EndLocation: string;
//   BoardingPoint: string;
//   DroppingPoint: string;
//   StartTime: string;
//   EndTime: string;
//   BookingDate: string;
//   PaymentMethod: string;
//   BookingSeatNo: string;
//   BookingSeatCount: string;
//   TicketPrice: string;
//   TotalPaymentAmount: string;
//   PaymentStatus: boolean;
// }


// const stripePromise = loadStripe(
//   "pk_test_51PKw0t04aP7UQrlkXsmQnGlaCpfs21pIOLfkBQPwAk3Qr4HjZQ1NHPpsXDgsclOczo8xuhtCGwLRxLn1x18IK0iz00Gb2xtcqS"
// );

// const Total=6750;
// const PassengerId="01";


//   const PaymentForm: React.FC<{ clientSecret: string }> = ({ clientSecret}) => {
    
//   const [cardHolderName, setCardHolderName] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();
  
//   const [userId, setUserId] = useState("10"); //to pass userId
//   const [tripId, setTripId] = useState("23"); //to pass tripId
//   const history = useNavigate();

//   const handleCardHolderNameChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setCardHolderName(event.target.value);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardNumberElement = elements.getElement(CardNumberElement);

//     if (!cardNumberElement) {
//       console.error("Card Number Element not found");
//       return;
//     }

//     const { error, paymentIntent } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: {
//           card: cardNumberElement,
//           billing_details: {
//             name: cardHolderName,
//           },
//         },
//       }
//     );

//     if (error) {
//       console.error(error);
//       alert(`Payment failed`);
//     } else if (paymentIntent && paymentIntent.status === "succeeded") {
//       console.log("Payment succeeded!", paymentIntent);
//       // Send an email when the payment is successful
//       axios
//         .post(`https://localhost:7296/api/Email/SendEmails/${PassengerId}`, {
//           to: "",
//           message: "",
//         })
//         .then((response) => {
//           console.log("Email sent", response);
          
//           history("/payment3", { state: { userId, tripId } });
//         })
        
//         .catch((error) => {
//           console.error("Failed to send email", error);
//         });
//     }
//   };
//   const CARD_ELEMENT_OPTIONS1 = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: "Arial, sans-serif",
//         fontSmoothing: "antialiased",
//         fontSize: "20px",
//         "::placeholder": {
//           color: "#aab7c4",
//         },
//         padding: "10px",
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a",
//       },
//     },
//     placeholder: "45** **** **** 3947",
//   };
//   const CARD_ELEMENT_OPTIONS2 = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: "Arial, sans-serif",
//         fontSmoothing: "antialiased",
//         fontSize: "20px",
//         "::placeholder": {
//           color: "#aab7c4",
//         },
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a",
//       },
//     },
//     placeholder: "MM/YY",
//   };
//   const CARD_ELEMENT_OPTIONS3 = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: "Arial, sans-serif",
//         fontSmoothing: "antialiased",
//         fontSize: "20px",
//         "::placeholder": {
//           color: "#aab7c4",
//         },
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a",
//       },
//     },
//     placeholder: "CVC",
//   };
//   const inputStyle = {
//     padding: "10px",
//     marginecolor: "none",
//     fontSize: "16px",
//     color: "#32325d",
//     fontFamily: "Arial, sans-serif",
//     "::placeholder": {
//       color: "#aab7c4",
//     },
//   };

//   const buttonStyle = {
//     backgroundColor: "rgb(255,199,0)",
//     color: "white", // Optionally change text color to ensure readability
//     border: "none",
//     width: "75%",
//     height: "60%",
//   };
//   const wrapperStyle = {
//     padding: "0.3%",
//     border: "1px solid #ccc",
//     borderRadius: "6px",
//     marginBottom: "1%",
//     width: "60%",
//     alignItems: "center",
//   };
//   return (
// <div className="container">
//     <div className="row">
//          <div className="col-6">
//     <form onSubmit={handleSubmit}>
//       <div style={wrapperStyle}>
//         <input
//           type="text"
//           style={inputStyle}
//           value={cardHolderName}
//           onChange={handleCardHolderNameChange}
//           placeholder="Card Holder Name"
//         />
//       </div>
//       <div style={wrapperStyle}>
//         <CardNumberElement options={CARD_ELEMENT_OPTIONS1} />
//         <br />
//       </div>
//       <div style={wrapperStyle}>
//         <CardExpiryElement options={CARD_ELEMENT_OPTIONS2} />
//         <br />
//       </div>
//       <div style={wrapperStyle}>
//         <CardCvcElement options={CARD_ELEMENT_OPTIONS3} />
//         <br />
//       </div>

//       <div className="form-check form-switch">
//         <label
//           className="form-check-label ml-0"
//           htmlFor="flexSwitchCheckDefault"
//         >
//           SET AS DEFAULT
//         </label>
//         <input
//           className="form-check-input ml-3"
//           type="checkbox"
//           role="switch"
//           id="flexSwitchCheckDefault"
//         />
//       </div>
//       <div className="form-check form-check-inline">
//         <input
//           className="form-check-input mt-2"
//           type="checkbox"
//           id="inlineCheckbox1"
//           value="option1"
//         />
//         <label
//           className="form-check-label ml-2"
//           htmlFor="inlineCheckbox1"
//           style={{ fontStyle: "italic", fontSize: "12px" }}
//         >
//           By Continuing your agree to our <a href="#">Terms and Conditions.</a>
//         </label>
//       </div>
//       <div className="d-grid">
//         <button
//           className="btn mt-5"
//           type="submit"
//           style={buttonStyle}
//           disabled={!stripe}
//         >
//           Pay Now
//         </button>
//         {/* <button className="btn mt-5" type="button" style={buttonStyle}   onClick={() => history("/payment3",{state:{userId,tripId}})} >Pay Now</button> */}
//       </div>
//     </form>

//     </div>

//       <div className="col-6 mt-5">
//       <div>
//         <div className="container text-center">
//           <div className="row mt-3">
//             <div
//               className="col-3 text-start mr-5"
//               style={{
//                 fontFamily: "Poppins",
//                 fontSize: "24px",
//                 fontWeight: "bold",
//               }}
//             >
//               Passengers
//             </div>
//             <div
//               className="col-4 text-end ml-5"
//               style={{
//                 fontFamily: "Poppins",
//                 fontSize: "30px",
//                 fontWeight: "bold",
//               }}
//             >
//               03
//             </div>
//           </div>
//           <div className="row mt-5">
//             {" "}
//             {/* Added margin-top for separation */}
//             <div
//               className="col-4 text-start "
//               style={{
//                 fontFamily: "Poppins",
//                 fontSize: "32px",
//                 fontWeight: "bold",
//               }}
//             >
//               Total
//             </div>
//             <div
//               className="col-5 text-end mr-2"
//               style={{
//                 fontFamily: "Poppins",
//                 fontSize: "36px",
//                 color: "rgb(0, 117, 124)",
//                 fontWeight: "bold",
//               }}
//             >
//              {Total} 
//             </div>
//           </div>
//         </div>
//       </div>

//       </div>
//     </div>
//     </div>
//   );
// };

// const Stripe_test: React.FC = () => {
//   const [clientSecret, setClientSecret] = React.useState<string>("");

//   React.useEffect(() => {
//     // Fetch the client secret from your backend
//     axios
//       .post("https://localhost:7296/api/stripe/create-payment-intent", {
//         amount: Total,
//       })
//       .then((response) => {
//         setClientSecret(response.data.clientSecret);
//       });
//   }, []);

//   return (
//     <Elements stripe={stripePromise}>
//       {clientSecret && <PaymentForm clientSecret={clientSecret}/>}
//     </Elements>
//   );
// };

// export default Stripe_test;






import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useNavigate } from "react-router-dom";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Passenger from "./Passenger";


const stripePromise = loadStripe(
  "pk_test_51PKw0t04aP7UQrlkXsmQnGlaCpfs21pIOLfkBQPwAk3Qr4HjZQ1NHPpsXDgsclOczo8xuhtCGwLRxLn1x18IK0iz00Gb2xtcqS"
);

const Total=6750;
const PassengerId="01";


  const PaymentForm: React.FC<{ clientSecret: string }> = ({ clientSecret}) => {
    
  const [cardHolderName, setCardHolderName] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  
  const [userId, setUserId] = useState("10"); //to pass userId
  const [tripId, setTripId] = useState("23"); //to pass tripId
  const history = useNavigate();

  const [paymentId, setPaymentId] = useState<string>("");
  const [paymentDate, setPaymentDate] = useState<string>("");

  const handleCardHolderNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardHolderName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      console.error("Card Number Element not found");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: cardHolderName,
          },
        },
      }
    );

    if (error) {
      console.error(error);
      alert(`Payment failed`);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Payment succeeded!", paymentIntent);

      const formattedPaymentDate = new Date(paymentIntent.created * 1000).toISOString().split("T")[0];
      setPaymentDate(formattedPaymentDate);
      // Set the paymentId state here
      setPaymentId(paymentIntent.id);


      // Send an email when the payment is successful
      axios
        .post(`https://localhost:7296/api/Email/SendEmails/${PassengerId}`, {
          to: "",
          message: "",
        })
        .then((response) => {
          console.log("Email sent", response);
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
            paymentDate: formattedPaymentDate, // Use the formatted payment date here
            paymentMethod: "card",
            bookingSeatNO: "15",
            bookingSeatCount: "1",
            ticketPrice: "155",
            totalPaymentAmount: "155",
            paymentStatus: true,
            paymentId:paymentIntent.id,
          })
          .then((bookingResponse) => {
            console.log("Booking successful", bookingResponse);
            history("/payment3", { state: { userId, tripId } });
          })
          .catch((bookingError) => {
            console.error("Failed to book", bookingError);
          });
      })
        .catch((error) => {
          console.error("Failed to send email", error);
        });
    }
  };
  const CARD_ELEMENT_OPTIONS1 = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "20px",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    placeholder: "45** **** **** 3947",
  };
  const CARD_ELEMENT_OPTIONS2 = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "20px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    placeholder: "MM/YY",
  };
  const CARD_ELEMENT_OPTIONS3 = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "20px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    placeholder: "CVC",
  };
  const inputStyle = {
    padding: "10px",
    marginecolor: "none",
    fontSize: "16px",
    color: "#32325d",
    fontFamily: "Arial, sans-serif",
    "::placeholder": {
      color: "#aab7c4",
    },
  };

  const buttonStyle = {
    backgroundColor: "rgb(255,199,0)",
    color: "white", // Optionally change text color to ensure readability
    border: "none",
    width: "75%",
    height: "60%",
  };
  const wrapperStyle = {
    padding: "0.3%",
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginBottom: "1%",
    width: "60%",
    alignItems: "center",
  };
  return (
<div className="container">
    <div className="row">
         <div className="col-6">
    <form onSubmit={handleSubmit}>
      <div style={wrapperStyle}>
        <input
          type="text"
          style={inputStyle}
          value={cardHolderName}
          onChange={handleCardHolderNameChange}
          placeholder="Card Holder Name"
        />
      </div>
      <div style={wrapperStyle}>
        <CardNumberElement options={CARD_ELEMENT_OPTIONS1} />
        <br />
      </div>
      <div style={wrapperStyle}>
        <CardExpiryElement options={CARD_ELEMENT_OPTIONS2} />
        <br />
      </div>
      <div style={wrapperStyle}>
        <CardCvcElement options={CARD_ELEMENT_OPTIONS3} />
        <br />
      </div>

      <div className="form-check form-switch">
        <label
          className="form-check-label ml-0"
          htmlFor="flexSwitchCheckDefault"
        >
          SET AS DEFAULT
        </label>
        <input
          className="form-check-input ml-3"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input mt-2"
          type="checkbox"
          id="inlineCheckbox1"
          value="option1"
        />
        <label
          className="form-check-label ml-2"
          htmlFor="inlineCheckbox1"
          style={{ fontStyle: "italic", fontSize: "12px" }}
        >
          By Continuing your agree to our <a href="#">Terms and Conditions.</a>
        </label>
      </div>
      <div className="d-grid">
        <button
          className="btn mt-5"
          type="submit"
          style={buttonStyle}
          disabled={!stripe}
        >
          Pay Now
        </button>
        {/* <button className="btn mt-5" type="button" style={buttonStyle}   onClick={() => history("/payment3",{state:{userId,tripId}})} >Pay Now</button> */}
      </div>
    </form>

    </div>

      <div className="col-6 mt-5">
      <div>
        <div className="container text-center">
          <div className="row mt-3">
            <div
              className="col-3 text-start mr-5"
              style={{
                fontFamily: "Poppins",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Passengers
            </div>
            <div
              className="col-4 text-end ml-5"
              style={{
                fontFamily: "Poppins",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              03
            </div>
          </div>
          <div className="row mt-5">
            {" "}
            {/* Added margin-top for separation */}
            <div
              className="col-4 text-start "
              style={{
                fontFamily: "Poppins",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              Total
            </div>
            <div
              className="col-5 text-end mr-2"
              style={{
                fontFamily: "Poppins",
                fontSize: "36px",
                color: "rgb(0, 117, 124)",
                fontWeight: "bold",
              }}
            >
             {Total} 
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>
    </div>
  );
};

const Stripe_test: React.FC = () => {
  const [clientSecret, setClientSecret] = React.useState<string>("");

  React.useEffect(() => {
    // Fetch the client secret from your backend
    axios
      .post("https://localhost:7296/api/stripe/create-payment-intent", {
        amount: Total,
      })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      });
  }, []);

  return (
    <Elements stripe={stripePromise}>
      {clientSecret && <PaymentForm clientSecret={clientSecret}/>}
    </Elements>
  );
};

export default Stripe_test;

