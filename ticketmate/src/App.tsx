//App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/HomePage/Home";
import TravelOptionsPage from "./pages/TravelOptionsPage/TravelOptionsPage";
import SeatButton from "./Components/Buttons/SeatButton/SeatButton";
import TravelLable from "./Components/Booking-TravelLable/TravelLable";
import SelectedVehicleTypeContext from "./SelectedVehicleTypeContext";
import { SearchResult } from "./SearchResult";
// interface SearchResult {
//   // Define the properties of a search result
//   vehicleType: string;
//   startLocation: string;
//   departureTime: string;
//   endLocation: string;
//   arrivalTime: string;
//   travelDate: string;
//   arrivalDate: string;
//   regNo: string;
//   comfortability: string;
//   duration: string;
//   ticketPrice: number;
//   bookingClosingDate: string;
//   bookingClosingTime: string;
// }

function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );

  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  
  return (
    <SelectedVehicleTypeContext.Provider value={{ selectedVehicleType, setSelectedVehicleType }}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home onSearch={setSearchResults} />} />
        <Route path="/travel-options" element={<TravelOptionsPage selectedVehicleType={selectedVehicleType} />} />
      </Routes>
    </SelectedVehicleTypeContext.Provider>
  );
}

export default App;

// import React from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

//import TravelLable from "./Components/Booking-TravelLable/TravelLable";
// import TravelLable from "./Components/Booking-TravelLable/TravelLable";
// import SeatButton from "./Components/Buttons/SeatButton/SeatButton";
// import TotalPriceLable from "./Components/Booking-TotalPriceLable/TotalPriceLable";
// import SeatMenu from "./Components/Booking-SeatMenu/SeatMenu";
// import RatingComponent from "./Components/FeedBack-RatingComponent/RatingComponent";
// import SelectBusSeatStructure from "./Components/SelectBusSeatStructure/SelectBusSeatStructure";
// import SeatStructure from "./Components/Booking-SeatStructure/SeatStructure";
// import BusBookingPage from "./pages/Bus-BookingPage/BusBookingPage";

// function App() {
//   return (
//     <div>
//       {/* <TravelLable />
//       <TotalPriceLable />
//       <SeatMenu />
//       <RatingComponent />
//       <SelectBusSeatStructure /> */}

//       <BusBookingPage />
//     </div>
//   );
// }

// export default App;
