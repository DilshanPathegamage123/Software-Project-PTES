import React, { useState, useEffect } from "react";
import axios from "axios";
import SeatButton from "../Buttons/SeatButton/SeatButton";

function SeatStructure({ vehicleId }) {
  const [seatStructure, setSeatStructure] = useState({});

  useEffect(() => {
    // Fetch selected seat structure for the specified vehicleId
    axios
      .get(`/api/vehicle/${vehicleId}/seats`)
      .then((response) => setSeatStructure(response.data))
      .catch((error) => console.error(error));
  }, [vehicleId]);

  const handleClick = (seatId) => {
    // Logic to handle seat selection for booking
    console.log(`Seat ${seatId} selected`);
  };

  return (
    <div>
      {Object.keys(seatStructure).map((rowIndex) => (
        <div key={rowIndex}>
          {seatStructure[rowIndex].map((status, colIndex) => {
            const seatId = `${rowIndex}-${colIndex}`;
            return (
              <SeatButton
                key={seatId}
                status={status}
                onClick={() => handleClick(seatId)}
              />
            );
          })}
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
