import AppRoutes from "./Routes/Routes";
import React from 'react'
import Driver1 from "./Driver/Driver1";
import Payment3 from "./pages/loginPage/payment3";
import SuccessBox from "./Components/payment/SuccessBox";
import Paymentvisa from "./Components/payment/Paymentvisa";
import Passenger from "./Passenger/passenger1";
import Stripe_test from "./Test/Stripe_test";
import Payment2 from "./pages/loginPage/payment2";



function App() {

  

  return (
    <div className="App" id="app">
      <AppRoutes/>
      {/* <Payment3/> */}
      {/* <SuccessBox/> */}
      {/* <Driver1/> */}
      {/* <Passenger/> */}
      
    </div>
  //   <>
  //  <Payment2/>

  //   </>
  );
}

export default App;
