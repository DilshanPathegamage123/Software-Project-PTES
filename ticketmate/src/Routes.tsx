import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";
import PassengerForm from "./pages/registration_pages/passenger_form";



function AppRoutes  ()  {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<PassengerForm />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;