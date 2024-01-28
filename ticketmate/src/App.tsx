import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <button type="button" className="btn btn-primary">Primary</button>
    <input className="btn btn-primary" type="reset" value="Reset"></input>
      
    </>
  )
}

export default App
