import React from "react";

const SelectedVehicleTypeContext = React.createContext({
  selectedVehicleType: "",
  setSelectedVehicleType: (value: string | ((val: string) => string)) => {},
});

export default SelectedVehicleTypeContext;

// SelectedVehicleTypeContext.tsx
// import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

// interface SelectedVehicleTypeContextProps {
//   children: React.ReactNode;
// }

// interface SelectedVehicleTypeContextState {
//   selectedVehicleType: string;
//   setSelectedVehicleType: Dispatch<SetStateAction<string>>;
//   startStandTime: string;
//   setStartStandTime: Dispatch<SetStateAction<string>>;
//   endStandTime: string;
//   setEndStandTime: Dispatch<SetStateAction<string>>;
//   selectedStartLocation: string;
//   setSelectedStartLocation: Dispatch<SetStateAction<string>>;
//   selectedEndLocation: string;
//   setSelectedEndLocation: Dispatch<SetStateAction<string>>;
// }

// const SelectedVehicleTypeContext = createContext<SelectedVehicleTypeContextState>(
//   {} as SelectedVehicleTypeContextState
// );

// export const SelectedVehicleTypeProvider: React.FC<SelectedVehicleTypeContextProps> = ({
//   children
// }) => {
//   const [selectedVehicleType, setSelectedVehicleType] = useState("");
//   const [startStandTime, setStartStandTime] = useState("");
//   const [endStandTime, setEndStandTime] = useState("");
//   const [selectedStartLocation, setSelectedStartLocation] = useState("");
//   const [selectedEndLocation, setSelectedEndLocation] = useState("");

//   return (
//     <SelectedVehicleTypeContext.Provider
//       value={{
//         selectedVehicleType,
//         setSelectedVehicleType,
//         startStandTime,
//         setStartStandTime,
//         endStandTime,
//         setEndStandTime,
//         selectedStartLocation,
//         setSelectedStartLocation,
//         selectedEndLocation,
//         setSelectedEndLocation,
//       }}
//     >
//       {children}
//     </SelectedVehicleTypeContext.Provider>
//   );
// };

// export const useTravelContext = () => useContext(SelectedVehicleTypeContext);

// export default SelectedVehicleTypeContext;

