import { useState } from 'react'
import BusOwnerPage from './Pages/BusOwnerPage/BusOwnerPage'
import BusRegistrationPage from './Pages/BusRegistrationPage/BusRegistrationPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BusRegistrationPage/>
    </>
  )
}

export default App
