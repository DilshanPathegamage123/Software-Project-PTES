import React, { useEffect, useState } from "react";
import SeatButton from "../Buttons/SeatButton/SeatButton";
import Steering from "./SeatStructureAssests/Steering-wheel.png";
import "./SeatStructure.css";

type Seat = {
  seatId: string;
  avalability: boolean;
};

type TrainSeatStructureProps = {
  seatStructure: Seat[];
  bookedSeats: number[];
  bookingSeatNO?: number[]; // Make bookingSeatNO optional
  onSeatSelected: (isSelected: boolean, seatNumber: number) => void;
  selectedSeatNumbers: number[];
};

function TrainSeatStructure({
  seatStructure,
  bookedSeats,
  bookingSeatNO,
  onSeatSelected,
  selectedSeatNumbers,
}: TrainSeatStructureProps) {
  const [currentSeatStructure, setCurrentSeatStructure] =
    useState(seatStructure);

  useEffect(() => {
    setCurrentSeatStructure(seatStructure);
  }, [seatStructure]);

  const handleClick = (seatId: string) => {
    console.log(`Seat ${seatId} selected`);
  };

  console.log(bookingSeatNO);

  const isSeatBooked = (seatNumber: number) => {
    return bookedSeats.includes(seatNumber);
  };

  console.log("Seat Structure:", seatStructure);
  console.log(selectedSeatNumbers);

  const isSeatSelected = (seatNumber: number) => {
    return Boolean(
      selectedSeatNumbers?.includes(seatNumber) ||
        (bookingSeatNO && bookingSeatNO.includes(seatNumber))
    );
  };

  const rows = 11;
  const cols = 6;
  const busStructure: JSX.Element[][] = [];

  let currentSeatIndex = 0;
  let seatNumber = 1;
  let availableSeatCount = 0;

  for (let i = 0; i < rows; i++) {
    const row: JSX.Element[] = [];
    for (let j = 0; j < cols; j++) {
      const seat = currentSeatStructure[currentSeatIndex];
      if (seat) {
        if (seat.avalability) {
          // Using the correct property name
          availableSeatCount++;
          const locationNumber = availableSeatCount;
          //const isSelected = selectedSeatNumbers.includes(seatNumber);
          const isSelected = isSeatSelected(seatNumber);
          const isBooked = isSeatBooked(seatNumber);

          console.log(locationNumber);
          console.log(isSelected);
          console.log(
            "Location number and booked or not",
            locationNumber,
            isBooked
          );
          row.push(
            <SeatButton
              key={seat.seatId}
              seatNumber={seatNumber}
              status={isBooked ? "booked" : "available"}
              isSelected={isSelected}
              onClick={(isSelected) => {
                handleClick(seat.seatId);
                onSeatSelected(isSelected, locationNumber);
              }}
            />
          );
          seatNumber++;
        } else {
          row.push(
            <SeatButton
              key={seat.seatId}
              seatNumber={null}
              status="not-available"
              isSelected={false}
              onClick={() => {}}
            />
          );
        }
        currentSeatIndex++;
      } else {
        row.push(<div key={`${i}-${j}`} className="seat-placeholder"></div>);
      }
    }
    busStructure.push(row);
  }

  return (
    <div className="col-12 SeatStr p-3 align-items-center justify-content-center m-auto pb-5 w-auto h-auto">
      <div className="d-flex justify-content-end align-items-start pt-3 pe-5 m-0">
        <img src={Steering} alt="Up Side" />
      </div>
      {busStructure.map((row, rowIndex) => (
        <div
          className="justify-content-center align-items-center m-auto d-flex pt-0 mt-0 "
          key={rowIndex}
        >
          {row.map((seat, colIndex) => (
            <React.Fragment key={colIndex}>{seat}</React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TrainSeatStructure;
