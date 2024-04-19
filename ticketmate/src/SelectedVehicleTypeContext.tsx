import React from "react";

const SelectedVehicleTypeContext = React.createContext({
  selectedVehicleType: "",
  setSelectedVehicleType: (value: string | ((val: string) => string)) => {},
});

export default SelectedVehicleTypeContext;
