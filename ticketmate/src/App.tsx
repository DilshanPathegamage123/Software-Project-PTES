import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BusRegistrationPage from './Pages/BusRegistrationPage/BusRegistrationPage';
import BusOwnerPage from './Pages/BusOwnerPage/BusOwnerPage';
import RegisteredBusPage from './Pages/RegisteredBusPage/RegisteredBusPage';
import ScheduledBusPage from './Pages/ScheduledBusPage/ScheduledBusPage';
import BusSchedulePage from './Pages/BusSchedulePage/BusSchedulePage';
import LoginPage from './Pages/loginPage/loginPage';
import Home from './Pages/HomePage/Home';
import TrainOwnerPage from './Pages/TrainOwnerPage/TrainOwnerPage';
import ScheduledBusInfo from './Components/ScheduledBusInfo/ScheduledBusInfo';
import TrainRegistrationPage from './Pages/TrainRegistrationPage/TrainRegistrationPage';
import RegisteredLocomitivePage from './Pages/RegisteredLocomitivePage/RegisteredLocomitivePage';
import RegisteredCarriagePage from './Pages/RegisteredCarriagePage/RegisteredCarriagePage'
import ScheduledTrainPage from './Pages/ScheduledTrainPage/ScheduledTrainPage';
import TrainSchedulePage from './Pages/TrainSchedulePage/TrainSchedulePage';
import Test from './Pages/Test/test';
import UpdateBusRegInfoPage from './Pages/UpdateBusRegInfoPage/UpdateBusRegInfoPage';
import BusScheduleFormUpdatePage from './Pages/BusScheduleFormUpdatePage/BusScheduleFormUpdatePage';
import BusScheduleFormUpdatePage2 from './Pages/BusScheduleFormUpdatePage/BusScheduleFormUpdatePage2';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/BusOwnerPage' element={<BusOwnerPage />} />
        <Route path='/BusRegistrationPage' element={<BusRegistrationPage />} />
        <Route path='/RegisteredBusPage' element={<RegisteredBusPage />} />
        <Route path='/ScheduledBusPage' element={<ScheduledBusPage />} />
        <Route path='/BusSchedulePage' element={<BusSchedulePage />} />
        <Route path='/TrainOwnerPage' element={<TrainOwnerPage />} />
        <Route path='/TrainRegistrationPage' element={<TrainRegistrationPage />} />
        <Route path='RegisteredLocomitivePage' element={<RegisteredLocomitivePage />}/>
        <Route path='/RegisteredCarriagePage' element={<RegisteredCarriagePage />} />
        <Route path='/ScheduledTrainPage' element={<ScheduledTrainPage />} />
        <Route path='/TrainSchedulePage' element={<TrainSchedulePage />} />
        <Route path='/UpdateBusRegInfoPage' element={<UpdateBusRegInfoPage />} />
        <Route path='/BusScheduleFormUpdatePage' element={<BusScheduleFormUpdatePage />} />
        <Route path='/BusScheduleFormUpdatePage2' element={<BusScheduleFormUpdatePage2/>} />
        
      </Routes>
    </BrowserRouter>

    
        // <>
        //   <BusScheduleFormUpdatePage/>
        // </>
  );
}

export default App;
