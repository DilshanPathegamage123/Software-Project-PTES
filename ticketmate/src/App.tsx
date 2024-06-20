
import React from "react";
import AppRoutes from "./Routes";
import AdminPage from "./pages/AdminDashboard/AdminPage";
import PassengerForm from "./pages/registration_pages/passenger_form";
import VehicleLocation from "./pages/MapLocationWindow/LocationWindow";
import StartRideButton from '../src/Components/Buttons/MapButton/StartRideButton';
import LocationWindow from '../src/pages/MapLocationWindow/LocationWindow';
// import { GoogleMap, useLoadScript,Loadscript,Marker } from '@react-google-maps/api';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import EndRideButton from "./Components/Buttons/MapButton/EndRideButton";

function App() {
  const rideId = 1;
  return (

     <div className="App" id="app">
      {/* <h1>Bus Tracking System</h1>
            <StartRideButton rideId={1} />
            <EndRideButton rideId={1} connectionId=""/>
            <VehicleLocation rideId={1} /> */}
       <AppRoutes/>

    </div>
      
  //   <>
  //  <Payment2/>

  //   </>
  );
}

export default App;


