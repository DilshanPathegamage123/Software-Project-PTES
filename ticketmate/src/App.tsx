// App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/HomePage/Home";
import TravelOptionsPage from "./pages/TravelOptionsPage/TravelOptionsPage";
import SeatButton from "./Components/Buttons/SeatButton/SeatButton";
interface SearchResult {
  // Define the properties of a search result
  vehicleType: string;
  startLocation: string;
  departureTime: string;
  endLocation: string;
  arrivalTime: string;
  travelDate: string;
  arrivalDate: string;
  regNo: string;
  comfortability: string;
  duration: string;
  ticketPrice: number;
  bookingClosingDate: string;
  bookingClosingTime: string;
}

function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );

  const [selectedVehicleType, setSelectedVehicleType] = useState("");

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onSearch={setSearchResults}
              //setSelectedVehicleType={setSelectedVehicleType}
            />
          }
        />
        {searchResults && (
          <Route
            path="/travel-options"
            element={
              <TravelOptionsPage selectedVehicleType={selectedVehicleType} />
            }
          />
        )}
      </Routes>

      {/* <SeatButton status="available" onClick={() => {}} /> */}
    </div>
  );
}

export default App;
