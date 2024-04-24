
import React, { useState } from 'react'
import BusRegistrationPage from './Pages/BusRegistrationPage/BusRegistrationPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BusOwnerPage from './Pages/BusOwnerPage/BusOwnerPage';
import CreateBusJourneyPage from './Pages/CreateBusJourneyPage/CreateBusJourneyPage';
import RegisteredBusPage from './Pages/RegisteredBusPage/RegisteredBusPage';
import ScheduledBusPage from './Pages/ScheduledBusPage/ScheduledBusPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BusOwnerPage/>}></Route>
        <Route path='/BusRegistrationPage' element={<BusRegistrationPage/>}></Route>
        <Route path='/CreateBusJourneyPage' element={<CreateBusJourneyPage/>}></Route>
        <Route path='/RegisteredBusPage' element={<RegisteredBusPage/>}></Route>
        <Route path='/ScheduledBusPage' element={<ScheduledBusPage/>}></Route>
      </Routes>
    </BrowserRouter>
    // <>
    //   <BusRegistrationPage/>
    // </>
  );
}

export default App;
