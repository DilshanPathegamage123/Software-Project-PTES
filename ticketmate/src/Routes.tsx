import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";
import PassengerForm from "./pages/registration_pages/passenger_form";
import AdminPage from "./pages/AdminDashboard/AdminPage";



function AppRoutes  ()  {
  return (
    <Router>
      <Routes>

      <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<PassengerForm />} />
        <Route path="/AdminPage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;