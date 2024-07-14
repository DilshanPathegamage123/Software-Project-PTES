import React, { useState } from "react";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import TravelDetails from "../../Components/payment/TravelDetail";
import Paassenger from "../../Components/payment/Passenger";
import PayNowbtn from "../../Components/payment/PayNowbtn";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./paymentmain.css";

interface BookingData {
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
const Payment2: React.FC<BookingData> = (props) => {
  
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  return (
    <>
      {/* <PrimaryNavBar/> 
        <Back/> */}
      <div className="container ">
        {/* <div className="row ">
              <Selection/>
            </div> */}

        <div className="row mt-4 justify-content-center">
          <div className="col-3"></div>
          <div className="col-6">
            <TravelDetails {...props} />
          </div>
          <div className="col-3"></div>
        </div>

        <div className="row mt-4 justify-content-center">
          <div className="col-2"></div>
          <div className="col-10">
            <Paassenger {...props} />
          </div>
        </div>

        <div className="row mt-4 justify-content-center">
          <div className="col-2"></div>
          <div className="col-10">
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
                style={{ fontStyle: "italic", fontSize: "20px" }}
              >
                By Continuing your agree to our{" "}
                <a href="#" data-bs-toggle="modal" data-bs-target="#termsModal">
                  Terms and Conditions.
                </a>
              </label>
            </div>
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
                        All payments can be made in cash on the trip day or
                        before it. By completing a booking, you agree to pay the
                        fare in cash as per the instructions provided.
                      </li>
                    </ul>

                    <h5>3. Cancellations and Refunds</h5>
                    <ul>
                      <li className="alert alert-danger">
                        If you cancel your reservation after making a cash
                        payment, no refunds will be issued.
                      </li>
                    </ul>

                    <h5>4. Seat Reservation</h5>
                    <ul>
                      <li>
                        Seat availability is subject to change and is not
                        guaranteed until the booking is successfully completed.
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
                        security measures to protect your personal information.
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
          </div>
        </div>
        <div className="row mt-4 justify-content-center">
          <div className="col-2"> </div>
          <div className="col-10">
            <PayNowbtn {...props} disabled={!isChecked}/>
            <div className="d-grid"></div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};
export default Payment2;
