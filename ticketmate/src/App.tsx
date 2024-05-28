// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
 
// } from "react-router-dom";
import Payment1 from "./pages/loginPage/payment1";
import Payment2 from "./pages/loginPage/payment2";
import Payment from "./pages/loginPage/paymentmain";
import Payment3 from "./pages/loginPage/payment3";
import Payment4 from "./pages/loginPage/payment4";
import Paymentmain from "./pages/loginPage/paymentmain";
import SuccessBox from "./Components/payment/SuccessBox";
// import Selection from "./Components/payment/Selection";
import Paymentvisa from "./Components/payment/Paymentvisa";
import Paassenger from "./Components/payment/Passenger";
import Passenger1 from "./Passenger/passenger1";
import TravelHistory from "./Passenger/TravelHistory";
import Driver2 from "./Driver/Driver2";
import Driver1 from "./Driver/Driver1";
import PayNowbtn from "./Components/payment/PayNowbtn";
import MyBookings from "./Passenger/MyBookings";
import Routers from "./Routes/Routes";

function App() {
  return (
    <>
    {/* <Payment1/> */}
    {/* <Paymentmain/> */}
    {/* <Payment3/> */}
    {/* <Payment4/> */}
     {/* <Passenger1/>  */}
    {/* <Driver1/> */}
    {/* <Paymentvisa/> */}
   <Routers/>

    </>
  );
}

export default App;
