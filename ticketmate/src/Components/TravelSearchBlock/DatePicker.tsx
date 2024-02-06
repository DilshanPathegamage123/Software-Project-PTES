import React, { useState } from "react";
import "./DatePicker.css";

export default function DatePicker() {
  const [, setDate] = useState("");

  return (
    <div className="datepicker  d-flex ">
      <input
        className=" h-100 w-100  p-sm-3 p-0 align-content-center "
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
}
