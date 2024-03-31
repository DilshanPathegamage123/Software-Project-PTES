import { useState } from 'react'
import BusOwnerPage from './Pages/BusOwnerPage/BusOwnerPage'
import BusRegistrationPage from './Pages/BusRegistrationPage/BusRegistrationPage'
import CreateBusJourneyPage from './Pages/CreateBusJourneyPage/CreateBusJourneyPage'
import RegisteredBusInfoSec from './Components/RegisteredBusInfoSec/RegisteredBusInfoSec'
import { BrowserRouter ,Routes, Route} from 'react-router-dom'
import BusOwnerPage2 from './Pages/BusOwnerPage2/BusOwnerPage2'
import FormValidation from './Pages/sample/FormValidation'
import SelectBusSeatStructure from './Components/SelectBusSeatStructure/SelectBusSeatStructure'

function App() {
  const [count, setCount] = useState(0)

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
  )
}

export default App
