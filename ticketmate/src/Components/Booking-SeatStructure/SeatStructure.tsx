import React from "react";
import SeatButton from "../Buttons/SeatButton/SeatButton";
import Steering from "./SeatStructureAssests/Steering-wheel.png";
import "./SeatStructure.css";
type Seat = {
  seatId: string;
  seatAvailability: boolean;
};

type SeatStructureProps = {
  seatStructure: Seat[];
  onSeatSelected: (isSelected: boolean) => void;
};

function SeatStructure({ seatStructure, onSeatSelected }: SeatStructureProps) {
  const handleClick = (seatId: string) => {
    // Logic to handle seat selection for booking
    console.log(`Seat ${seatId} selected`);
  };

  const rows = 11;
  const cols = 6;
  const busStructure: JSX.Element[][] = [];

  let currentSeatIndex = 0;

  // Mapping through the rows
  for (let i = 0; i < rows; i++) {
    const row: JSX.Element[] = [];
    // Mapping through the columns
    for (let j = 0; j < cols; j++) {
      const seat = seatStructure[currentSeatIndex];
      if (seat) {
        // If there is a seat, check if it's available
        if (seat.seatAvailability) {
          row.push(
            <SeatButton
              key={seat.seatId}
              status="available"
              onClick={(isSelected) => {
                handleClick(seat.seatId);
                onSeatSelected(isSelected);
              }}
            />
          );
        } else {
          // If the seat is not available, render a "not available" seat
          row.push(
            <SeatButton
              key={seat.seatId}
              status="not-available"
              onClick={() => {}}
            />
          );
        }
        currentSeatIndex++;
      } else {
        // If no seat, render a placeholder
        row.push(<div key={`${i}-${j}`} className="seat-placeholder"></div>);
      }
    }
    // Push each row to the busStructure array
    busStructure.push(row);
  }

  return (
    <div className=" SeatStruct p-3 align-items-center  justify-content-center m-auto  ">
      <div className=" d-flex justify-content-end align-items-start pt-2 pe-4 m-0">
        <img src={Steering} alt="Up Side" />
      </div>

      {busStructure.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((seat, colIndex) => (
            <React.Fragment key={colIndex}>{seat}</React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SeatStructure;
