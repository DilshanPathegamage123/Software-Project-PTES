
import React, { useState } from 'react'
import BusRegistrationPage from './Pages/BusRegistrationPage/BusRegistrationPage';


function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<BusOwnerPage/>}></Route>
    //     <Route path='/BusRegistrationPage' element={<BusRegistrationPage/>}></Route>
    //     <Route path='/CreateBusJourneyPage' element={<CreateBusJourneyPage/>}></Route>
    //   </Routes>
    // </BrowserRouter>
    <>
      <BusRegistrationPage/>
    </>
  );
}

export default App;
