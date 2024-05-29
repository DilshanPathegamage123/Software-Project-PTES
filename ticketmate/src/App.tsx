
import React, { useState } from 'react'
import BusRegistrationPage from './Pages/BusRegistrationPage/BusRegistrationPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BusOwnerPage from './Pages/BusOwnerPage/BusOwnerPage';
import CreateBusJourneyPage from './Pages/CreateBusJourneyPage/CreateBusJourneyPage';
import RegisteredBusPage from './Pages/RegisteredBusPage/RegisteredBusPage';
import ScheduledBusPage from './Pages/ScheduledBusPage/ScheduledBusPage';
import BusSchedulePage from './Pages/BusSchedulePage/BusSchedulePage';
import LoginPage from './Pages/loginPage/loginPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<BusOwnerPage/>}></Route>
        <Route path='/BusRegistrationPage' element={<BusRegistrationPage/>}></Route>
        <Route path='/CreateBusJourneyPage' element={<CreateBusJourneyPage/>}></Route>
        <Route path='/RegisteredBusPage' element={<RegisteredBusPage/>}></Route>
        <Route path='/ScheduledBusPage' element={<ScheduledBusPage/>}></Route>
        <Route path='/BusSchedulePage' element={<BusSchedulePage/>}></Route>
        <Route path='/LoginPage' element={<LoginPage/>}></Route>

      </Routes>
    </BrowserRouter>
    // <>
    //   <BusOwnerPage/>
    // </>
  );
}

export default App;
