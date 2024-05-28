import React, { useState } from "react";
import "./DatePicker.css";

interface DatePickerProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

//export default function DatePicker() {

const DatePicker: React.FC<DatePickerProps> = ({ setSelectedDate }) => {
  const [date, setDate] = useState("");

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
        onChange={(e) => {
          //const formattedDate = formatDate(e.target.value);
          setDate(e.target.value);
          setSelectedDate(e.target.value);
        }}
      />
    </div>
  );
};
export default DatePicker;
