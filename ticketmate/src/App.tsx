import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './Routes';



function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Home />} />
    //     <Route path='/LoginPage' element={<LoginPage />} />
    //     <Route path='/BusOwnerPage' element={<BusOwnerPage />} />
    //     <Route path='/BusRegistrationPage' element={<BusRegistrationPage />} />
    //     <Route path='/RegisteredBusPage' element={<RegisteredBusPage />} />
    //     <Route path='/ScheduledBusPage' element={<ScheduledBusPage />} />
    //     <Route path='/BusSchedulePage' element={<BusSchedulePage />} />
    //     <Route path='/TrainOwnerPage' element={<TrainOwnerPage />} />
    //     <Route path='/TrainRegistrationPage' element={<TrainRegistrationPage />} />
    //     <Route path='RegisteredLocomitivePage' element={<RegisteredLocomitivePage />}/>
    //     <Route path='/RegisteredCarriagePage' element={<RegisteredCarriagePage />} />
    //     <Route path='/ScheduledTrainPage' element={<ScheduledTrainPage />} />
    //     <Route path='/TrainSchedulePage' element={<TrainSchedulePage />} />
    //     <Route path='/UpdateBusRegInfoPage' element={<UpdateBusRegInfoPage />} />
    //     <Route path='/BusScheduleFormUpdatePage' element={<BusScheduleFormUpdatePage />} />
    //     <Route path='/BusScheduleFormUpdatePage2' element={<BusScheduleFormUpdatePage2/>} />
    //     <Route path='/BusScheduleFormUpdatePage3' element={<BusScheduleFormUpdatePage3 />} />
    //     <Route path='/UpdateCarriageRegInfoPage' element={<UpdateCarriageRegInfoPage />} />
    //     <Route path='/UpdateLocomotiveRegInfoPage' element={<UpdateLocomotiveRegInfoPage />} />
    //     <Route path='/TrainShceduleUpdatePage' element={<TrainShceduleUpdatePage />} />
    //     <Route path='/TrainShceduleUpdatePage2' element={<TrainShceduleUpdatePage2 />} />
    //     <Route path='/TrainShceduleUpdatePage3' element={<TrainShceduleUpdatePage3 />} />
    //     <Route path='/TrainShceduleUpdatePage4' element={<TrainShceduleUpdatePage4 />} />
    //     <Route path='/TrainShceduleUpdatePage5' element={<TrainShceduleUpdatePage5 />} />
        
    //   </Routes>
    // </BrowserRouter>

    <AppRoutes/>
        // <>
        //   <BusScheduleFormUpdatePage/>
        // </>
  );
}

export default App;
