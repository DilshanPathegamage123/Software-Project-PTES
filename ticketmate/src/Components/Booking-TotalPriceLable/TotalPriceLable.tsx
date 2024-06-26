import React from "react";
import { useNavigate } from "react-router-dom";
import "./TotalPriceLabel.css";
import { toast } from "react-toastify";

interface TotalPriceLableProps {
  passengers: number;
  totalPrice: number;
  buttonText?: string; 
  onSave?: () => void;
  BusScheduleId?: string;
  TrainScheduleId?: string;
  VehicleId?: Number;
  RouteNo?: string;
  StartLocation?: string;
  EndLocation?: string;
  BoardingPoint?: string;
  DroppingPoint?: string;
  StartTime?: string;
  EndTime?: string;
  BookingSeatNO?: string;
  BookingSeatCount?: Number;
  TicketPrice?: Number;
  TotalPaymentAmount?: Number;
  departureDate?: string;
 // disableButton?: boolean;
  BookingClass?: string;
  BookingCarriageNo?: Number;

}

const TotalPriceLable: React.FC<TotalPriceLableProps> = ({
  passengers,
  totalPrice,
  buttonText = "Pay Now", // Default value is Pay Now
  onSave,
  BusScheduleId,
  TrainScheduleId,
  VehicleId,
  RouteNo,
  StartLocation,
  EndLocation,
  BoardingPoint,
  DroppingPoint,
  StartTime,
  EndTime,
  BookingSeatNO,
  BookingSeatCount,
  TicketPrice,
  TotalPaymentAmount,
  departureDate,
  //disableButton,
  BookingClass,
  BookingCarriageNo,
}) => {

  const getToken = () => {
    return sessionStorage.getItem("token")
   }

  const navigate = useNavigate();
 
  const handlePayNow = () => {
    
    if(BookingSeatCount === 0){
      toast.warning("Please select at least one seat to proceed");
    } else{
    const path = getToken() ? "/paymentmain" : "/login";
    //const path = getToken() ? "/login" : "/paymentmain";

    navigate(path, {
      state: {
        BusScheduleId,
        VehicleId,
        RouteNo,
        StartLocation,
        EndLocation,
        BoardingPoint,
        DroppingPoint,
        StartTime,
        EndTime,
        BookingSeatNO,
        BookingSeatCount,
        TicketPrice,
        TotalPaymentAmount,
        departureDate,
        BookingClass,
        BookingCarriageNo,
      },
    });
  };
  };

  console.log(
    BusScheduleId,
    TrainScheduleId,
    VehicleId,
    RouteNo,
    StartLocation,
    EndLocation,
    BoardingPoint,
    DroppingPoint,
    StartTime,
    EndTime,
    BookingSeatNO,
    BookingSeatCount,
    TicketPrice,
    TotalPaymentAmount,
    departureDate,
    BookingClass,
        BookingCarriageNo,
  );
  return (
    <div className="PriceLable col-12 pt-5 h-auto">
      <div className="row1 row col-12 pb-2 m-auto h-auto pt-lg-4 pb-lg-5">
        <div className="col col-8 fs-4 d-flex justify-content-start m-auto p-0  fw-semibold">
          Passengers
        </div>
        <div className="col col-2 fs-4 fw-semibold d-flex d-flex justify-content-end m-auto">
          {passengers}
        </div>
      </div>
      <div className="row2 row col-12 pb-2 m-auto h-auto ">
        <div className="col col-md-6 col-sm-8 fs-4 d-flex justify-content-start p-0  m-auto ">
          Total
        </div>
        <div className="col col-md-4 col-sm-8 fs-4 fw-semibold d-flex  justify-content-end m-auto ">
          LKR {totalPrice}.00
        </div>
      </div>
      <div className="row row3 col-12 pb-2 pt-2 pb-2 h-auto pt-lg-3">
        <div className=" d-flex p-0 align-items-center justify-content-center ">
          <button
            className=" button PayNowButton w-100 h-auto  border-0 p-1 fs-4 fw-bold "
            type="button"
            onClick={handlePayNow}
            //disabled={disableButton}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalPriceLable;
