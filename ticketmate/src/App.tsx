//App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/HomePage/Home";
import TravelOptionsPage from "./pages/TravelOptionsPage/TravelOptionsPage";
import BusBookingPage from "./pages/Bus-BookingPage/BusBookingPage";
import SelectedVehicleTypeContext from "./SelectedVehicleTypeContext";
import { SearchResult } from "./SearchResult";

function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );

  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(
    null
  );
  const [selectedVehicleType, setSelectedVehicleType] = useState("");

  return (
    <SelectedVehicleTypeContext.Provider
      value={{ selectedVehicleType, setSelectedVehicleType }}
    >
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home onSearch={setSearchResults} />} />
        <Route
          path="/travel-options"
          element={
            <TravelOptionsPage selectedVehicleType={selectedVehicleType} />
          }
        />
        <Route
          path="/bus-booking"
          element={<BusBookingPage />}
        />
      </Routes>
    </SelectedVehicleTypeContext.Provider>
    // <TravelLable/>
  );
}

export default App;
