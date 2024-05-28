
// import React from "react";
// import SeatButton from "../Buttons/SeatButton/SeatButton";
// import Steering from "./SeatStructureAssests/Steering-wheel.png";
// import "./SeatStructure.css";
// type Seat = {
//   seatId: string;
//   seatAvailability: boolean;
// };

// type SeatStructureProps = {
//   seatStructure: Seat[];
//   onSeatSelected: (isSelected: boolean, seatNumber: number) => void;
//   selectedSeatNumbers: number[];
// };

// function SeatStructure({
//   seatStructure,
//   onSeatSelected,
//   selectedSeatNumbers,
// }: SeatStructureProps) {
//   const handleClick = (seatId: string) => {
//     // Logic to handle seat selection for booking
//     console.log(`Seat ${seatId} selected`);
//   };

//   const rows = 11;
//   const cols = 6;
//   const busStructure: JSX.Element[][] = [];

//   let currentSeatIndex = 0;
//   let seatNumber = 1;

//   // Mapping through the rows
//   for (let i = 0; i < rows; i++) {
//     const row: JSX.Element[] = [];
//     // Mapping through the columns
//     for (let j = 0; j < cols; j++) {
//       const seat = seatStructure[currentSeatIndex];
//       const locationNumber = i * cols + j + 1; // Assign a location number to each seat

//       if (seat) {
//         // If there is a seat, check if it's available
//         if (seat.seatAvailability) {
//           const isSelected = selectedSeatNumbers.includes(seatNumber);
//           row.push(
//             <SeatButton
//               key={seat.seatId}
//               seatNumber={seatNumber}
//               status="available"
//               isSelected={isSelected}
//               onClick={(isSelected) => {
//                 handleClick(seat.seatId);
//                 onSeatSelected(isSelected, locationNumber);
//               }}
//             />
//           );
//           seatNumber++; //Increment seat number by 1 only for available
//         } else {
//           // If the seat is not available, render a "not available" seat
//           row.push(
//             <SeatButton
//               key={seat.seatId}
//               seatNumber={null} // Set seat number to 0 for not available seats
//               status="not-available"
//               isSelected={false}
//               onClick={() => {}}
//             />
//           );
//         }
//         currentSeatIndex++;
//       } else {
//         // If no seat, render a placeholder
//         row.push(<div key={`${i}-${j}`} className="seat-placeholder"></div>);
//       }
//     }
//     // Push each row to the busStructure array
//     busStructure.push(row);
//   }

//   return (
//     <div className=" SeatStruct p-3 align-items-center  justify-content-center m-auto  ">
//       <div className=" d-flex justify-content-end align-items-start pt-2 pe-4 m-0">
//         <img src={Steering} alt="Up Side" />
//       </div>

//       {busStructure.map((row, rowIndex) => (
//         <div key={rowIndex}>
//           {row.map((seat, colIndex) => (
//             <React.Fragment key={colIndex}>{seat}</React.Fragment>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SeatStructure;

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
  onSeatSelected: (isSelected: boolean, seatNumber: number) => void;
  selectedSeatNumbers: number[];
};

function SeatStructure({
  seatStructure,
  onSeatSelected,
  selectedSeatNumbers,
}: SeatStructureProps) {
  const handleClick = (seatId: string) => {
    console.log(`Seat ${seatId} selected`);
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
      const seat = seatStructure[currentSeatIndex];
      if (seat) {
        if (seat.seatAvailability) {
          availableSeatCount++;
          const locationNumber = availableSeatCount;
          const isSelected = selectedSeatNumbers.includes(seatNumber);
          row.push(
            <SeatButton
              key={seat.seatId}
              seatNumber={seatNumber}
              status="available"
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
    <div className="SeatStruct p-3 align-items-center justify-content-center m-auto pb-5 ">
      <div className="d-flex justify-content-end align-items-start pt-3 pe-5 m-0">
        <img src={Steering} alt="Up Side" />
      </div>
      {busStructure.map((row, rowIndex) => (
        <div
          className="justify-content-center align-items-center m-auto d-flex pt-0 mt-0"
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

export default SeatStructure;

// The SeatStructure component accepts a vehicleId prop, which is used to fetch the selected seat structure for the specified vehicle from the API endpoint.
// Inside the useEffect hook, an Axios GET request is made to fetch the seat structure data for the given vehicleId. The response data is then stored in the seatStructure state variable.
// The component iterates over the seatStructure object to render each row of seats. Within each row, it maps over the array of seat statuses to render individual SeatButton components.
// The handleClick function can be extended to handle the logic for selecting preferred available seats for booking.
// To use this SeatStructure component, you can pass the vehicleId as a prop when rendering it in your application. For example:

// <SeatStructure vehicleId="vehicle123" />

// Ensure that your backend API endpoint /api/vehicle/:vehicleId/seats returns the seat structure data in the appropriate format expected by this component. Adjust the API endpoint URL as necessary based on your backend implementation.

