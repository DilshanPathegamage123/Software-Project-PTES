import React from "react";
// import { BrowserRouter as Router, Routes as ReactRoutes, Route } from "react-router-dom";
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Paymentmain from "../pages/loginPage/paymentmain";
//import Paymentvisa from "../Components/payment/Paymentvisa";
import Payment3 from "../pages/loginPage/payment3";
import Payment4 from "../pages/loginPage/payment4";

function Routers() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Paymentmain />} />
        {/* <Route path="/Payment3" element={<Payment3 />} />
        <Route path="/Payment4" element={<Payment4 />} /> */}
      </Routes>
      </Router>
    </>
  );
}
export default Routers;