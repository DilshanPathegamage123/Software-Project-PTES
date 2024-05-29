
import React, { useState } from 'react'
import BusRegistrationPage from './Pages/BusRegistrationPage/BusRegistrationPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BusOwnerPage from './Pages/BusOwnerPage/BusOwnerPage';
import RegisteredBusPage from './Pages/RegisteredBusPage/RegisteredBusPage';
import ScheduledBusPage from './Pages/ScheduledBusPage/ScheduledBusPage';
import BusSchedulePage from './Pages/BusSchedulePage/BusSchedulePage';
import LoginPage from './Pages/loginPage/loginPage';
import Home from './Pages/HomePage/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Home/>}></Route> 
        <Route path='/LoginPage' element={<LoginPage/>}></Route>
        <Route path='/BusOwnerPage' element={<BusOwnerPage/>}></Route>
        <Route path='/BusRegistrationPage' element={<BusRegistrationPage/>}></Route>
        <Route path='/RegisteredBusPage' element={<RegisteredBusPage/>}></Route>
        <Route path='/ScheduledBusPage' element={<ScheduledBusPage/>}></Route>
        <Route path='/BusSchedulePage' element={<BusSchedulePage/>}></Route>
        

      </Routes>
    </BrowserRouter>
    // <>
    //   <BusOwnerPage/>
    // </>
  );
}

export default App;
