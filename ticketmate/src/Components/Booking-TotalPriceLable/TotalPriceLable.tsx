import React from "react";
import "./TotalPriceLabel.css";

interface TotalPriceLableProps {
  passengers: number;
  totalPrice: number;
}

const TotalPriceLable : React.FC<TotalPriceLableProps> = ({
  passengers,
  totalPrice
}) => {
  return (
    <div className="PriceLable col-12 pt-5">
      <div className="row1 row col-12 pb-2 m-auto  ">
        <div className="col col-8 fs-4 d-flex justify-content-start m-auto fw-semibold">
          Passengers
        </div>
        <div className="col col-2 fs-4 fw-semibold d-flex d-flex justify-content-end m-auto">
        {passengers}
        </div>
      </div>
      <div className="row2 row col-12 pb-2 m-auto h-auto ">
        <div className="col col-6 fs-5 d-flex justify-content-start m-auto ">Total</div>
        <div className="col col-4 fs-4 fw-semibold d-flex  justify-content-end m-auto ">
          LKR {totalPrice}.00
        </div>
      </div>
      <div className="row row3 col-12 pb-2 pt-2 pb-2">
        <div className=" d-flex p-0 align-items-center justify-content-center   ">
          <button
            className=" button PayNowButton w-100 h-auto  border-0 p-1 fs-4 fw-bold "
            type="button"
            //  onClick={}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalPriceLable;
