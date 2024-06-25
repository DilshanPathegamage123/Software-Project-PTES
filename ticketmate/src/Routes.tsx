import { Route, Routes } from "react-router-dom";
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
          // <Router>
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
        <Route path="/passenger" element={<Passenger />} />
        <Route path="/register" element={<PassengerForm />} />
        <Route path="/AdminPage" element={<AdminPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/BusOwnerPage" element={<BusOwnerPage/>}/>
        <Route path="/UpdatePassengerProfile" element={   <UpdatePassengerProfile/>}/>
        <Route path="/UpdateOwnerProfile" element={<UpdateOwnerProfile />} />
        <Route path="/UpdateDriverProfile" element={<UpdateDriverProfile />} />
        <Route path="/driver" element={<Driver />} />


      </Routes>
  //  </Router>
  );
};
export default AppRoutes;
