import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectedVehicleTypeContext from "./SelectedVehicleTypeContext";
import { SearchResult } from "./SearchResult";
import AppRoutes from "./Routes";

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
      <AppRoutes
        onSearch={setSearchResults}
        setSelectedStartLocation={setSelectedStartLocation}
        setSelectedEndLocation={setSelectedEndLocation}
      />
    </SelectedVehicleTypeContext.Provider>

  );
}

export default App;


