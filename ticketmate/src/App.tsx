// //App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/HomePage/Home";
import TravelOptionsPage from "./pages/TravelOptionsPage/TravelOptionsPage";
import BusBookingPage from "./pages/Bus-BookingPage/BusBookingPage";
import TrainBookingPage from "./pages/Bus-BookingPage/TrainBookingPage";
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
  const [selectedStartLocation, setSelectedStartLocation] = useState("");
  const [selectedEndLocation, setSelectedEndLocation] = useState("");

  return (
    <SelectedVehicleTypeContext.Provider
      value={{ selectedVehicleType, setSelectedVehicleType }}
    >
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onSearch={setSearchResults}
              setSelectedStartLocation={setSelectedStartLocation}
              setSelectedEndLocation={setSelectedEndLocation}
            />
          }
        />
        <Route
          path="/travel-options"
          element={
            <TravelOptionsPage
              selectedVehicleType={selectedVehicleType}
              selectedStartLocation={selectedStartLocation}
              selectedEndLocation={selectedEndLocation}
            />
          }
        />
        <Route path="/bus-booking" element={<BusBookingPage />} />

        <Route path="/train-booking" element={<TrainBookingPage />} />
      </Routes>
    </SelectedVehicleTypeContext.Provider>
    // <TravelLable/>
  );
}

export default App;

// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Home from "./pages/HomePage/Home";
// import TravelOptionsPage from "./pages/TravelOptionsPage/TravelOptionsPage";
// import BusBookingPage from "./pages/Bus-BookingPage/BusBookingPage";
// import { SelectedVehicleTypeProvider } from "./SelectedVehicleTypeContext";
// import { SearchResult } from "./SearchResult";

// function App() {
//   const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);

//   const [selectedStartLocation, setSelectedStartLocation] = useState("");
//   const [selectedEndLocation, setSelectedEndLocation] = useState("");

//   return (
//     <SelectedVehicleTypeProvider>
//       <ToastContainer />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Home
//               onSearch={(results) => setSearchResults(results)}
//               setSelectedStartLocation={setSelectedStartLocation}
//               setSelectedEndLocation={setSelectedEndLocation}
//             />
//           }
//         />
//         <Route
//           path="/travel-options"
//           element={
//             <TravelOptionsPage searchResults={searchResults || []} />
//           }
//         />
//         <Route
//           path="/bus-booking"
//           element={<BusBookingPage />}
//         />
//       </Routes>
//     </SelectedVehicleTypeProvider>
//   );
// }

// export default App;
