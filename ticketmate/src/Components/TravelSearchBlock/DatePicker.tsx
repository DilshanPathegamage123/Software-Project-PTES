import React, { useEffect, useState } from "react";
import "./DatePicker.css";
import axios from "axios";

export default function DatePicker() {
  const [date, setDate] = useState("");

  useEffect(() => {
    if (date) {
      sendDateToBackend();
    }
  }, [date]);

  const sendDateToBackend = async () => {
    try {
      // Api call for send selected date to backend
      await axios.post("Url", { selectedDate: date });
    } catch (error) {
      console.error("Error while sending date to backend", error);
    }
  };

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
