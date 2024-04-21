import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "./DatePicker.css";

interface DatePickerProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

//export default function DatePicker() {

const DatePicker: React.FC<DatePickerProps> = ({ setSelectedDate }) => {
  const currentDate = new Date().toISOString().substr(0, 10);
  const [date, setDate] = useState(currentDate);

  useEffect(() => {
    setSelectedDate(date);
  }, []);

  // useEffect(() => {
  //   if (date) {
  //     sendDateToBackend();
  //   }
  // }, [date]);

  // const sendDateToBackend = async () => {
  //   try {
  //     // Api call for send selected date to backend
  //     await axios.post("Url", { selectedDate: date });
  //   } catch (error) {
  //     console.error("Error while sending date to backend", error);
  //   }
  // };

  // const formatDate = (selectedDate: string) => {
  //   const [month, day, year] = selectedDate.split("/");
  //   return "${day}-${month}-${year}";
  // };

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
