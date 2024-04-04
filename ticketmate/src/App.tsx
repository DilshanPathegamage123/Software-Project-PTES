import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../src/pages/loginPage/loginPage";
import PassengerForm from "./pages/registration_pages/passenger_form";
import PrimaryNavBar from "./Components/NavBar/PrimaryNavBar";
import PassengerFormComponent from "./pages/registration_pages/passengerFormComponent";
import HomeContent from "./Components/HomePageContent/HomeContent";
import OwnerFormComponent from "./pages/registration_pages/ownerFormComponent";
import MyForm from "./pages/registration_pages/myform";
import AppRoutes from "./Routes";
import AdminPage from "./pages/AdminDashboard/AdminPage";


function App() {
  return (
    <div className="App" id="app">
      {/* <AppRoutes/> */}
      <AdminPage/>
    </div>
  );
}

export default App;
