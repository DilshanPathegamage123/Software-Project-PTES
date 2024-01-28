import { useState } from 'react'
import './App.css'
import PrimaryButton from './Components/Buttons/PrimaryButton'
import PrimaryNavBar from './Components/NavBar/PrimaryNavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PrimaryNavBar/>
      <br />
    </>
  )
}

export default App
