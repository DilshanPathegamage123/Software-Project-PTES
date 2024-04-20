import React from "react";
import AppRoutes from "./Routes";
import AdminPage from "./pages/AdminDashboard/AdminPage";
import PassengerForm from "./pages/registration_pages/passenger_form";
import Home from "./pages/HomePage/Home";




function App() {
  return (
    <div className="App" id="app">
      <AppRoutes/>
      {/* <PassengerForm/> */}
     {/* <Home/> */}
    </div>
      

  );
}

export default App;
