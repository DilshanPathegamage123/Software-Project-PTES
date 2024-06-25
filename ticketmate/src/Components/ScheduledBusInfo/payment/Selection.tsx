import React, { useState } from "react";
import Rec1 from "./asset/rec1.png";
import Creditcard from "./asset/credit-card.png";
import Wallet from "./asset/wallet.png";
import Payment1 from "../../pages/loginPage/payment1";
import Payment2 from "../../pages/loginPage/payment2";

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

  trainBookingId:number ;
  trainScheduleId: number;
  bookingCarriageNo: number;
  bookingClass: string

}

const Selection: React.FC<BookingData> = (props) => {
  const [selectedOption, setSelectedOption] = useState("payment1");

  const handleOptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };
 
 
  return (
    <>
      <div className="container mt-2">
      <div className="card" style={{ border: 'none' }}>
      <img src={Rec1} className="card-img" alt="Rec1" />
      <div className="card-img-overlay d-flex flex-column justify-content-center">
        <p
          className="card-text "
          style={{
            color: 'rgb(0,168,141)',
            fontFamily: 'Inter',
            fontSize: '26px',
            fontWeight: '600', // Use numeric value for fontWeight
          }}
        >
          Select your payment method.
        </p>
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center mb-3">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mt-2"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="payment1"
                  checked={selectedOption === 'payment1'}
                  onChange={handleOptionChange}
                />
                <label htmlFor="inlineRadio1" className="ms-2 d-flex align-items-center">
                  <img
                    src={Creditcard}
                    alt="Credit/Debit Card"
                    className="button-image me-2"
                    style={{ width: '24px', height: '24px' }} // Adjust size as needed
                  />
                  Credit/Debit Card
                </label>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center mb-3">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mt-2"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="payment2"
                  checked={selectedOption === 'payment2'}
                  onChange={handleOptionChange}
                />
                <label htmlFor="inlineRadio2" className="ms-2 d-flex align-items-center">
                  <img
                    src={Wallet}
                    alt="Cash"
                    className="button-image me-2"
                    style={{ width: '24px', height: '24px' }} // Adjust size as needed
                  />
                  Cash
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        {selectedOption === "payment1" && <Payment1 {...props} />}
        {selectedOption === "payment2" && <Payment2 {...props}/>}
      </div>
    </>
  );
}

export default Selection;
