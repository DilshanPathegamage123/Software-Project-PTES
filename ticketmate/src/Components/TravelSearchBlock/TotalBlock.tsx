import React from "react";
import StartLocationSelector from "./StartLocationSelector";
import EndLocationSelector from "./EndLocationSelector";
import "./TotalBlock.css";
import VehicleType from "./VehicleType";
import DatePicker from "./DatePicker";
import SearchButton from "./SearchButton";

export default function TotalBlock() {
  return (
    <div className="TotalBlock container-fluid py-4  align-items-center col-lg-10 col-8   z-1  ">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-5 align-items-center justify-content-center  ">
        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4">
          {" "}
          <VehicleType />
        </div>
        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4">
          <StartLocationSelector />
        </div>
        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4">
          <EndLocationSelector />
        </div>

        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4">
          <DatePicker />
        </div>

        <div className="col col-lg-2 col-md-4 col-sm-6 mb-4">
          <SearchButton />
        </div>

      </div>
    </div>
  );
}
