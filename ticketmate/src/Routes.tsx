import { Route, Router, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";
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
import Paymentmain from "./pages/loginPage/paymentmain";
import Payment3 from "./pages/loginPage/payment3";
import Payment4 from "./pages/loginPage/payment4";
import Driver2 from "./Driver/Driver2";
import MapView from "./Passenger/MapView";



import BusRegistrationPage from './pages/BusRegistrationPage/BusRegistrationPage';
import RegisteredBusPage from './pages/RegisteredBusPage/RegisteredBusPage';
import ScheduledBusPage from './pages/ScheduledBusPage/ScheduledBusPage';
import BusSchedulePage from './pages/BusSchedulePage/BusSchedulePage';
import TrainOwnerPage from './pages/TrainOwnerPage/TrainOwnerPage';
import ScheduledBusInfo from './Components/ScheduledBusInfo/ScheduledBusInfo';
import TrainRegistrationPage from './pages/TrainRegistrationPage/TrainRegistrationPage';
import RegisteredLocomitivePage from './pages/RegisteredLocomitivePage/RegisteredLocomitivePage';
import RegisteredCarriagePage from './pages/RegisteredCarriagePage/RegisteredCarriagePage'
import ScheduledTrainPage from './pages/ScheduledTrainPage/ScheduledTrainPage';
import TrainSchedulePage from './pages/TrainSchedulePage/TrainSchedulePage';
import UpdateBusRegInfoPage from './pages/UpdateBusRegInfoPage/UpdateBusRegInfoPage';
import BusScheduleFormUpdatePage from './pages/BusScheduleFormUpdatePage/BusScheduleFormUpdatePage';
import BusScheduleFormUpdatePage2 from './pages/BusScheduleFormUpdatePage/BusScheduleFormUpdatePage2';
import BusScheduleFormUpdatePage3 from './pages/BusScheduleFormUpdatePage/BusScheduleFormUpdatePage3';
import UpdateCarriageRegInfoPage from './pages/UpdateCarriageRegInfoPage/UpdateCarriageRegInfoPage';
import UpdateLocomotiveRegInfoPage from './pages/UpdateLocomotiveRegInfoPage/UpdateLocomotiveRegInfoPage';
import TrainShceduleUpdatePage from './pages/TrainShceduleUpdatePage/TrainShceduleUpdatePage';
import TrainShceduleUpdatePage2 from './pages/TrainShceduleUpdatePage/TrainShceduleUpdatePage2';
import TrainShceduleUpdatePage3 from './pages/TrainShceduleUpdatePage/TrainShceduleUpdatePage3';
import TrainShceduleUpdatePage4 from './pages/TrainShceduleUpdatePage/TrainShceduleUpdatePage4';
import TrainShceduleUpdatePage5 from './pages/TrainShceduleUpdatePage/TrainShceduleUpdatePage5';
import OwnerPage from "./pages/OwnerPage/OwnerPage";
import NotificationComponent from "./Passenger/Notification";




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
          //  <Router >
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
{/* <!--       <Route path="/passenger-profile" element={<Passenger />} /> -->
<!--       <Route path="/login" element={<LoginPage />} /> -->
<!--       <Route path="/AdminPage" element={<AdminPage />} /> -->
<!--       <Route path="/register" element={<PassengerForm />} /> -->
<!--       <Route path="/BusOwnerPage" element={<BusOwnerPage />} />
    --> */}
       {/* <Route path="/" element={<LoginPage />} /> --> */}
       <Route path="/paymentmain" element={<Paymentmain />} />
        <Route path="/Payment3" element={<Payment3 />} />
        <Route path="/Payment4" element={<Payment4 />} />
        <Route path="/passenger" element={<Passenger />} />
        <Route path="/register" element={<PassengerForm />} />
        <Route path="/AdminPage" element={<AdminPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/BusOwnerPage" element={<BusOwnerPage/>}/>
        <Route path="/UpdatePassengerProfile" element={   <UpdatePassengerProfile/>}/>
        <Route path="/UpdateOwnerProfile" element={<UpdateOwnerProfile />} />
        <Route path="/UpdateDriverProfile" element={<UpdateDriverProfile />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/driver2" element={<Driver2 />} />
        <Route path="/paymentmain" element={<Paymentmain />} />
        <Route path="/Mapview" element={<MapView />} />
        <Route path="/notification" element={<NotificationComponent />} />
      


        {/* malinga scheduling */}
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
        <Route path='/OwnerPage' element={<OwnerPage/>}/>



      </Routes>
    // </Router>
  );
};
export default AppRoutes;
