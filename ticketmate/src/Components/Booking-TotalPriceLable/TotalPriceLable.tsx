import React from "react";
import "./TotalPriceLabel.css";

const TotalPriceLable = () => {
  return (
    <div className="PriceLable col-12 pt-2 ">
      <div className="row row1 pb-2 ">
        <div className="col col-6 fs-5">Passengers</div>
        <div className="col col-6 fs-5 fw-semibold  d-flex align-items-end justify-content-end">
          06
        </div>
      </div>
      <div className="row row2 pb-2">
        <div className="col-4 fs-5  d-flex ">Total</div>
        <div className="col-8 fs-5 fw-semibold d-flex align-items-end justify-content-end">
          LKR 2255.00
        </div>
      </div>
      <div className="row row3 pb-2 pt-2 pb-2">
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
