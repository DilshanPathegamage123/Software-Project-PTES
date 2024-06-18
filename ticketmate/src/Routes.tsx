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
import BusScheduleFormUpdatePage3 from './Pages/BusScheduleFormUpdatePage/BusScheduleFormUpdatePage3';
import UpdateCarriageRegInfoPage from './Pages/UpdateCarriageRegInfoPage/UpdateCarriageRegInfoPage';
import UpdateLocomotiveRegInfoPage from './Pages/UpdateLocomotiveRegInfoPage/UpdateLocomotiveRegInfoPage';
import TrainShceduleUpdatePage from './Pages/TrainShceduleUpdatePage/TrainShceduleUpdatePage';
import TrainShceduleUpdatePage2 from './Pages/TrainShceduleUpdatePage/TrainShceduleUpdatePage2';
import TrainShceduleUpdatePage3 from './Pages/TrainShceduleUpdatePage/TrainShceduleUpdatePage3';
import TrainShceduleUpdatePage4 from './Pages/TrainShceduleUpdatePage/TrainShceduleUpdatePage4';
import TrainShceduleUpdatePage5 from './Pages/TrainShceduleUpdatePage/TrainShceduleUpdatePage5';

function AppRoutes() {
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
        <Route path='/BusScheduleFormUpdatePage3' element={<BusScheduleFormUpdatePage3 />} />
        <Route path='/UpdateCarriageRegInfoPage' element={<UpdateCarriageRegInfoPage />} />
        <Route path='/UpdateLocomotiveRegInfoPage' element={<UpdateLocomotiveRegInfoPage />} />
        <Route path='/TrainShceduleUpdatePage' element={<TrainShceduleUpdatePage />} />
        <Route path='/TrainShceduleUpdatePage2' element={<TrainShceduleUpdatePage2 />} />
        <Route path='/TrainShceduleUpdatePage3' element={<TrainShceduleUpdatePage3 />} />
        <Route path='/TrainShceduleUpdatePage4' element={<TrainShceduleUpdatePage4 />} />
        <Route path='/TrainShceduleUpdatePage5' element={<TrainShceduleUpdatePage5 />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
