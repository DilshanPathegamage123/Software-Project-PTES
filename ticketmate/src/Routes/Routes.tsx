import React from "react";
// import { BrowserRouter as Router, Routes as ReactRoutes, Route } from "react-router-dom";
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Paymentmain from "../pages/loginPage/paymentmain";
import Paymentvisa from "../Components/payment/Paymentvisa";
import Payment3 from "../pages/loginPage/payment3";
import Payment4 from "../pages/loginPage/payment4";
import Driver1 from "../Driver/Driver1";
import Driver2 from "../Driver/Driver2";
import Notification from "../Passenger/Notification";

function Routers() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Paymentmain/>} />
        <Route path="/Payment3" element={<Payment3 />} />
        <Route path="/Payment4" element={<Payment4 />} />
        <Route path="/Driver1" element={<Driver1/>}/>
        <Route path="/Driver2" element={<Driver2/>}/>
        <Route path="/Notification" element={<Notification />} />
       </Routes>
      </Router>
    </>
  );
}
export default Routers;