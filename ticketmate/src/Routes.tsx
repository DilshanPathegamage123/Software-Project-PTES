import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";
import PassengerForm from "./pages/registration_pages/passenger_form";
import AdminPage from "./pages/AdminDashboard/AdminPage";
import Paymentmain from "./pages/loginPage/paymentmain";
import Payment2 from "./pages/loginPage/payment2";
import Payment3 from "./pages/loginPage/payment3";
import Driver1 from "./Driver/Driver1";
import Driver2 from "./Driver/Driver2";
import Notification from "./Passenger/Notification";


function AppRoutes  ()  {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<PassengerForm />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/paymentmain" element={<Paymentmain/>} />
        <Route path="/payment2" element={<Payment2/>} />
        <Route path="/payment3" element={<Payment3/>} />
        <Route path="/Driver1" element={<Driver1/>}/>
        <Route path="/Driver2" element={<Driver2/>}/>
        <Route path="/Notification" element={<Notification />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;