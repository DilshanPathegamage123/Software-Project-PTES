import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";
import PassengerForm from "./pages/registration_pages/passenger_form";
import AdminPage from "./pages/AdminDashboard/AdminPage";
import Passenger from './Passenger/passenger1';
import Home from "./pages/HomePage/Home";
import BusOwnerPage from "./pages/BusOwnerPage/BusOwnerPage";



function AppRoutes  ()  {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/passenger" element={<Passenger />} />
        <Route path="/register" element={<PassengerForm />} />
        <Route path="/AdminPage" element={<AdminPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/BusOwnerPage" element={<BusOwnerPage/>}/>
      </Routes>
    </Router>
  );
};
export default AppRoutes;