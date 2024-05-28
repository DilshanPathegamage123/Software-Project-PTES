import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./DatePicker.css";

interface DatePickerProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

const DatePicker: React.FC<DatePickerProps> = ({ setSelectedDate }) => {
  const currentDate = new Date().toISOString().substr(0, 10);
  const [date, setDate] = useState(currentDate);

  useEffect(() => {
    setSelectedDate(date);
  }, []);


  return (
    <div className="datepicker  d-flex ">
      <input
        className=" h-100 w-100  p-sm-3 p-0 align-content-center "
        type="date"
        value={date}
        onChange={(e) => {
          const selectedDate = new Date(e.target.value);
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          if (selectedDate < now) {
            toast.error("The selected date is in the past.");
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
