import { useState } from 'react'
import BusOwnerPage from './Pages/BusOwnerPage/BusOwnerPage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BusRegistrationPage/>
    </>
  )
}

export default App
