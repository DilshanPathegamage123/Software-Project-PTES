import { useState } from 'react'
import BusOwnerPage from './Pages/BusOwnerPage/BusOwnerPage'
import BusRegistrationPage from './Pages/BusRegistrationPage/BusRegistrationPage'
import CreateBusJourneyPage from './Pages/CreateBusJourneyPage/CreateBusJourneyPage'
import RegisteredBusInfoSec from './Components/RegisteredBusInfoSec/RegisteredBusInfoSec'
import EditRegisteredBusInfo from './Pages/EditRegisteredBusInfo/EditRegisteredBusInfo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BusRegistrationPage/>
    </>
  )
}

export default App
