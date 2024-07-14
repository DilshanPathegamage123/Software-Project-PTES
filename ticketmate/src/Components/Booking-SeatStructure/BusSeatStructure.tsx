import React from "react";
import SeatButton from "../Buttons/SeatButton/SeatButton";
import Steering from "./SeatStructureAssests/Steering-wheel.png";
import "./SeatStructure.css";

type Seat = {
  seatId: string;
  seatAvailability: boolean;
};

type BusSeatStructureProps = {
  seatStructure: Seat[];
  onSeatSelected: (isSelected: boolean, seatNumber: number) => void;
  selectedSeatNumbers: number[];
  bookedSeats: number[];
  currentBookingSeats: number[];
};

function BusSeatStructure({
  seatStructure,
  onSeatSelected,
  selectedSeatNumbers,
  bookedSeats,
  currentBookingSeats,
}: BusSeatStructureProps) {
  const handleClick = (seatId: string) => {
    console.log(`Seat ${seatId} selected`);
  };

  console.log("Seat Structure:", seatStructure);
  console.log("Selected Seat Numbers:", selectedSeatNumbers);
  console.log("Booked Seat Numbers:", bookedSeats);

  const rows = 11;
  const cols = 6;
  const busStructure: JSX.Element[][] = [];

  let currentSeatIndex = 0;
  let seatNumber = 1;
  let availableSeatCount = 0;

  for (let i = 0; i < rows; i++) {
    const row: JSX.Element[] = [];
    for (let j = 0; j < cols; j++) {
      const seat = seatStructure[currentSeatIndex];
      if (seat) {
        if (seat.seatAvailability) {
          availableSeatCount++;
          const locationNumber = availableSeatCount;
          const isSelected = selectedSeatNumbers.includes(locationNumber);
          //const isBooked = bookedSeats.includes(locationNumber); // Check if the seat is booked
          const isCurrentBookingSeat =
            currentBookingSeats.includes(locationNumber); // Check if seat is booked by current user
          const isBooked =
            bookedSeats.includes(locationNumber) && !isCurrentBookingSeat; // Check if the seat is booked by others
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
              seatNumber={locationNumber}
              status={isBooked ? "booked" : "available"} // Use "booked" status for booked seats
              isSelected={isSelected || isCurrentBookingSeat}
              onClick={(isSelected) => {
                handleClick(seat.seatId);
                // if (!isBooked) {
                //   onSeatSelected(isSelected, locationNumber);
                // }
                if (!isBooked || isCurrentBookingSeat) {
                  // Allow selection if not booked or booked by the current user
                  onSeatSelected(isSelected, locationNumber);
                }
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
    <div className="col-12 SeatStr p-3 align-items-center justify-content-center m-auto pb-5 w-auto h-auto mb-3">

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

export default BusSeatStructure;
