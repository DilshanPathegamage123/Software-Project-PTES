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
import { Route, Routes } from "react-router-dom";
import PassengerForm from "./pages/registration_pages/passenger_form";
import AdminPage from "./pages/AdminDashboard/AdminPage";
import Passenger from './Passenger/passenger1';
import Home from "./pages/HomePage/Home";
import BusOwnerPage from "./pages/BusOwnerPage/BusOwnerPage";
import Driver from "./Driver/Driver1";
import TravelOptionsPage from "./pages/TravelOptionsPage/TravelOptionsPage";
import BusBookingPage from "./pages/Bus-BookingPage/BusBookingPage";
import BusBookingUpdatePage from "./pages/BusBookingUpdatePage/BusBookingUpdatePage";
import TrainBookingUpdatePage from "./pages/TrainBookingUpdatePage/TrainBookingUpdatePage";
import TrainBookingPage from "./pages/Bus-BookingPage/TrainBookingPage";
import { SearchResult } from "./SearchResult";
import UpdatePassengerProfile from "./pages/UpdateProfilePages/updatePassengerProfile";
import UpdateOwnerProfile from "./pages/UpdateProfilePages/UpdateOwnerProfile";
import UpdateDriverProfile from "./pages/UpdateProfilePages/UpdateDriverProfile";


interface AppRoutesProps {
  onSearch: React.Dispatch<React.SetStateAction<SearchResult[] | null>>;
  setSelectedStartLocation: React.Dispatch<React.SetStateAction<string>>;
  setSelectedEndLocation: React.Dispatch<React.SetStateAction<string>>;
}


const AppRoutes: React.FC<AppRoutesProps> = ({
  onSearch,
  setSelectedStartLocation,
  setSelectedEndLocation,
}) => {
  return (
          <Router>
    <Routes>
      <Route
        path="/"
        element={
          <Home
            onSearch={onSearch}
            setSelectedStartLocation={setSelectedStartLocation}
            setSelectedEndLocation={setSelectedEndLocation}
          />
        }
      />
      <Route path="/travel-options" element={<TravelOptionsPage />} />
      <Route path="/bus-booking" element={<BusBookingPage />} />
      <Route path="/bus-booking-update" element={<BusBookingUpdatePage />} />
      <Route
        path="/train-booking-update"
        element={<TrainBookingUpdatePage />}
      />
      <Route path="/train-booking" element={<TrainBookingPage />} />
<!--       <Route path="/passenger-profile" element={<Passenger />} /> -->
<!--       <Route path="/login" element={<LoginPage />} /> -->
<!--       <Route path="/AdminPage" element={<AdminPage />} /> -->
<!--       <Route path="/register" element={<PassengerForm />} /> -->
<!--       <Route path="/BusOwnerPage" element={<BusOwnerPage />} />
    -->
<!--       <Route path="/" element={<LoginPage />} /> -->
        <Route path="/passenger" element={<Passenger />} />
        <Route path="/register" element={<PassengerForm />} />
        <Route path="/AdminPage" element={<AdminPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/BusOwnerPage" element={<BusOwnerPage/>}/>
        <Route path="/UpdatePassengerProfile" element={   <UpdatePassengerProfile/>}/>
        <Route path="/UpdateOwnerProfile" element={<UpdateOwnerProfile />} />
        <Route path="/UpdateDriverProfile" element={<UpdateDriverProfile />} />
        <Route path="/driver" element={<Driver />} />
      
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
    </Router>
  );
};
export default AppRoutes;
