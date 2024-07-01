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
import QRCode from "qrcode";

// Define the interface for your data
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
}
const stripePromise = loadStripe(
  "pk_test_51PKw0t04aP7UQrlkXsmQnGlaCpfs21pIOLfkBQPwAk3Qr4HjZQ1NHPpsXDgsclOczo8xuhtCGwLRxLn1x18IK0iz00Gb2xtcqS"
);

interface PaymentFormProps extends BookingData {
  clientSecret: string;
}

const total = Math.round(1000 * 0.3458 * 100);

const PaymentForm: React.FC<PaymentFormProps> = (props) => {
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
      props.clientSecret,
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

      const formattedPaymentDate = new Date(paymentIntent.created * 1000)
        .toISOString()
        .split("T")[0];
      setPaymentDate(formattedPaymentDate);
      // Set the paymentId state here
      setPaymentId(paymentIntent.id);

      const qrCodeData = JSON.stringify({
        bookingId: paymentIntent.id,
        passengerId: props.passengerId,
        bookingSeatNO: props.bookingSeatNO,
        boardingPoint: props.boardingPoint,
        droppingPoint: props.droppingPoint,
      });

      // Generate base64 QR code
      QRCode.toDataURL(qrCodeData, { width: 150, margin: 1 }, (err, url) => {
        if (err) {
          console.error(err);
          return;
        }

        // Send an email when the payment is successful
        axios
          .post(
            `https://localhost:7296/api/Email/SendEmails/${props.passengerId}`,
            {
              to: "",
              message: `
          <html>
            <body>
              <p>Dear customer(${props.passengerId}),</p>
              <p>We are delighted to inform you that your seat booking has been successfully processed and confirmed. Please find below the details of your reservation:</p>
              <ul>
               
                <li><strong>Booking Date:</strong> ${props.bookingDate}</li>
                <li><strong>Payment Date:</strong> ${formattedPaymentDate}</li>
                <li><strong>Payment Method:</strong> Card</li>
                <li><strong>Boarding point:</strong> ${props.boardingPoint}</li>
                <li><strong>Dropping point:</strong> ${props.droppingPoint}</li>
                <li><strong>Booked Seat No.:</strong>${props.bookingSeatNO}</li>
                <li><strong>Total Seats Booked:</strong> ${props.bookingSeatCount}</li>
                <li><strong>Ticket Price:</strong> ${props.ticketPrice}</li>
                <li><strong>Total Payment Amount:</strong>${props.totalPaymentAmount}</li>
              </ul>
              <p>Your payment has been successfully processed using the card payment method.</p>
              <p>Thank you for choosing our service. We look forward to serving you aboard our srvice. Should you have any further inquiries or require assistance, please feel free to contact us at +9471 1152 633.</p>
              <p>Warm regards,</p>
              <p>Joe Henry<br>
              Director<br>
              TicketMate<br>
              +9471 123 2145</p>
              <p>QR Code for your booking:</p>
            <div><img src="${url}" alt="QR Code"></div>
            </body>
          </html>
        `,
            }
          )
          .then((response) => {
            console.log("Email sent", response);
            if (props.busId) {
              axios
                .post("https://localhost:7296/api/BusBooking", {
                  busBookingId: props.busBookingId,
                  busScheduleId: props.busScheduleId,
                  busId: props.busId,
                  passengerId: props.passengerId,
                  routeNo: props.routeNo,
                  startLocation: props.startLocation,
                  endLocation: props.endLocation,
                  boardingPoint: props.boardingPoint,
                  droppingPoint: props.droppingPoint,
                  startTime: props.startTime,
                  endTime: props.endTime,
                  bookingDate: props.bookingDate,
                  paymentDate: formattedPaymentDate, // Use the formatted payment date here
                  paymentMethod: "card",
                  bookingSeatNO: props.bookingSeatNO,
                  bookingSeatCount: props.bookingSeatCount,
                  ticketPrice: props.ticketPrice,
                  totalPaymentAmount: props.totalPaymentAmount,
                  paymentStatus: true,
                  paymentId: paymentIntent.id,
                })
                .then((bookingResponse) => {
                  console.log("Booking successful", bookingResponse);
                  history("/payment3", { state: { ...props } });
                })
                .catch((bookingError) => {
                  console.error("Failed to bus book", bookingError);
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
                  paymentDate: formattedPaymentDate,
                  paymentMethod: "card",
                  bookingClass: props.bookingClass,
                  bookingCarriageNo: props.bookingCarriageNo,
                  bookingSeatNO: props.bookingSeatNO,
                  bookingSeatCount: props.bookingSeatCount,
                  ticketPrice: props.ticketPrice,
                  totalPaymentAmount: props.totalPaymentAmount,
                  paymentStatus: true,
                  paymentId: paymentIntent.id,
                })
                .then((response) => {
                  console.log("Train booking successful:", response.data);
                  history("/payment3", { state: { ...props } });

                  // Handle success response if needed
                })
                .catch((error) => {
                  console.error("Error making train booking:", error);
                  // Handle error if needed
                });
            }
          })
          .catch((error) => {
            console.error("Failed to send email", error);
          });
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
    border: "none",
    outline: "none",
    paddingBottom: "20px",
    marginecolor: "none",
    fontSize: "20px",
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

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // State to keep track of checkbox
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
                placeholder="John Doe"
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

            {/* <div className="form-check form-switch">
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
      </div> */}
            <div className="form-check form-check-inline">
              <input
                className="form-check-input mt-2"
                type="checkbox"
                id="inlineCheckbox1"
                value="option1"
                onChange={handleCheckboxChange}
              />
              <label
                className="form-check-label ml-2"
                htmlFor="inlineCheckbox1"
                style={{ fontStyle: "italic", fontSize: "12px" }}
              >
                By Continuing your agree to our{" "}
                <a href="#" data-bs-toggle="modal" data-bs-target="#termsModal">
                  Terms and Conditions.
                </a>
              </label>
            </div>
            {/* Modal */}
            <div
              className="modal fade"
              id="termsModal"
              tabIndex={-1}
              aria-labelledby="termsModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="termsModalLabel">
                      Terms and Conditions
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h2>Terms and Conditions</h2>
                    <p>
                      Welcome to TicketMate. These terms and conditions govern
                      your use of our online ticket reservation and payment
                      services.
                    </p>

                    <h5>1. Introduction</h5>
                    <p>
                      Welcome to TicketMate. These terms and conditions govern
                      your use of our online ticket reservation and payment
                      services.
                    </p>

                    <h5>2. Booking and Payments</h5>
                    <ul>
                      <li>
                        By booking a seat through our platform, you agree to
                        abide by these terms and conditions.
                      </li>
                      <li>
                        All payments are securely processed through our
                        platform. By completing a payment, you authorize us to
                        proceed with the booking.
                      </li>
                    </ul>

                    <h5>3. Cancellations and Refunds</h5>
                    <ul>
                      <li className="alert alert-danger">
                        You may cancel your seat booking within 24 hours of
                        making the payment. Cancellations made after this period
                        may not be eligible for a refund.
                      </li>
                      <li>
                        Refunds for cancellations made within 24 hours will be
                        processed to the original payment method used during
                        booking. Refunds are subject to processing fees.
                      </li>
                    </ul>

                    <h5>4. Seat Reservation</h5>
                    <ul>
                      <li>
                        Seat availability is subject to change and is not
                        guaranteed until payment is successfully processed.
                      </li>
                      <li>
                        Changes to seat reservations are subject to availability
                        and may incur additional charges.
                      </li>
                    </ul>

                    <h5>5. Privacy and Security</h5>
                    <ul>
                      <li>
                        We are committed to protecting your privacy. Your
                        personal information is securely stored and used only
                        for ticketing purposes.
                      </li>
                      <li>
                        Our platform uses industry-standard encryption and
                        security measures to protect your payment and personal
                        information.
                      </li>
                    </ul>

                    <h5>6. Contact Us</h5>
                    <ul>
                      <li>
                        For any inquiries or assistance regarding your booking,
                        please contact our customer support team at{" "}
                        <a href="tel:+94719151160">+94 71 9151160</a> or email
                        us at{" "}
                        <a href="mailto:ticketmatePTES@gmail.com">
                          ticketmatePTES@gmail.com
                        </a>
                        .
                      </li>
                    </ul>

                    <h5>7. Amendments to Terms</h5>
                    <p>
                      We reserve the right to amend these terms and conditions
                      at any time. Changes will be effective immediately upon
                      posting on our website.
                    </p>

                    <h5>8. Acceptance of Terms</h5>
                    <p>
                      By using our services, you acknowledge that you have read,
                      understood, and agree to be bound by these terms and
                      conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal */}
            <div className="d-grid">
              <button
                className="btn mt-5"
                type="submit"
                style={buttonStyle}
                disabled={!isChecked ||!stripe}
              >
                Pay Now
              </button>
              {/* <button className="btn mt-5" type="button" style={buttonStyle}   onClick={() => history("/payment3",{state:{userId,tripId}})} >Pay Now</button> */}
            </div>
          </form>
        </div>

        <div className="col-6 mt-5 pl-5  pr-5">
          <div className="card p-2 shadow-sm m-2">
            <div className="container text-center">
              <div className="row align-items-center mb-3">
                <div
                  className="col text-start"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  Passengers
                </div>
                <div
                  className="col text-end"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  {props.bookingSeatCount}
                </div>
              </div>
              <div className="row align-items-center">
                <div
                  className="col text-start"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "32px",
                    fontWeight: "bold",
                  }}
                >
                  Total
                </div>
                <div
                  className="col text-end"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "36px",
                    color: "rgb(0, 117, 124)",
                    fontWeight: "bold",
                  }}
                >
                  {props.totalPaymentAmount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stripe_test: React.FC<BookingData> = (prop1) => {
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const total1 = prop1.totalPaymentAmount;
  React.useEffect(() => {
    //alert(prop1.totalPaymentAmount)
    // Fetch the client secret from your backend
    axios
      .post("https://localhost:7296/api/stripe/create-payment-intent", {
        amount: total1, // Convert the amount to cents
      })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      });
  }, []);

  return (
    <Elements stripe={stripePromise}>
      {clientSecret && (
        <PaymentForm
          clientSecret={clientSecret}
          driverId={prop1.driverId}
          busBookingId={prop1.busBookingId}
          busScheduleId={prop1.busScheduleId}
          busId={prop1.busId}
          passengerId={prop1.passengerId}
          routeNo={prop1.routeNo}
          startLocation={prop1.startLocation}
          endLocation={prop1.endLocation}
          boardingPoint={prop1.boardingPoint}
          droppingPoint={prop1.droppingPoint}
          startTime={prop1.startTime}
          endTime={prop1.endTime}
          bookingDate={prop1.bookingDate}
          bookingSeatNO={prop1.bookingSeatNO}
          bookingSeatCount={prop1.bookingSeatCount}
          ticketPrice={prop1.ticketPrice}
          totalPaymentAmount={prop1.totalPaymentAmount}
          paymentStatus={prop1.paymentStatus}
          trainBookingId={prop1.trainBookingId}
          trainScheduleId={prop1.trainScheduleId}
          bookingCarriageNo={prop1.bookingCarriageNo}
          bookingClass={prop1.bookingClass}
        />
      )}
    </Elements>
  );
};

export default Stripe_test;
