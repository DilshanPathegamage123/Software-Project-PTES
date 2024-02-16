import { useState } from 'react'
import BusOwnerPage from './Pages/BusOwnerPage/BusOwnerPage'
import BusRegistrationPage from './Pages/BusRegistrationPage/BusRegistrationPage'
import ScheduledBusInfo from './Components/ScheduledBusInfo/ScheduledBusInfo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BusOwnerPage/>
    </>
  )
}

export default App
