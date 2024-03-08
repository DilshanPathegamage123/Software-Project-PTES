import React from "react";
import StartLocationSelector from "./StartLocationSelector";
import EndLocationSelector from "./EndLocationSelector";
import DatePicker from "./DatePicker";
import "./TotalBlock2.css";
const TotalBlock2 = () => {
  return (
    <div className="TotalBlock2 text-black fs-5 fw-semibold font-family-Poppins h-auto   ">
      <div className="row col-12  m-auto ">
        <p className="m-0 px-4 py-3 text-white   ">Bus Schedule </p>
      </div>

      <div className="row row   col-12  m-auto pb-3 pt-2  d-sm-flex ">
        <div className=" class col col-12  m-auto d-md-flex">
          <div className="col  pb-1  ">
            <StartLocationSelector />
          </div>
          <div className="col pb-1 ">
            <EndLocationSelector />
          </div>
          <div className="col pb-1 ">
            <DatePicker />
          </div>

          <div className=" class col pb-1 ">
            <button
              type="button"
              className=" Modify-Button btn btn-lg text-white fs-5 fw-normal col  m-auto align-content-center justify-content-center"
            >
              Modify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalBlock2;
