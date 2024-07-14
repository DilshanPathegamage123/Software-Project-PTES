import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import "./DatePicker.css";

interface DatePickerProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  defaultDate?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  setSelectedDate,
  defaultDate,
}) => {
  const currentDate = new Date().toISOString().substr(0, 10);
  const [date, setDate] = useState(defaultDate || currentDate);

  useEffect(() => {
    setSelectedDate(date);
  }, []);

  return (
    <div className="datepicker  d-flex ">
      <input
        className=" h-100 w-100  p-sm-3 align-content-center "
        type="date"
        value={date}
        onChange={(e) => {
          const selectedDate = new Date(e.target.value);
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          if (selectedDate < now) {
            Swal.fire("Warning", "The selected date is in the past.", "warning");
            setDate(currentDate);
            setSelectedDate(currentDate);
          } else {
            setDate(e.target.value);
            setSelectedDate(e.target.value);
          }
        }}
      />
    </div>
  );
};
export default DatePicker;
