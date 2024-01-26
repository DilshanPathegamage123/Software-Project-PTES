import { useState } from 'react'
import './App.css'
import PrimaryButton from './Components/Buttons/PrimaryButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PrimaryButton type="button" value="Click Me" color="primary" IsSmall={true}/>
      <br />
      <PrimaryButton type="button" value="Click Me" color="secondary"/>
      <br />
      <PrimaryButton type="button" value="Click Me" color="third" width="400px"/>
      <br />
      <PrimaryButton type="button" value="Click Me" color="yellow" width="400px"/>
      <br />
      <PrimaryButton type="button" value="Click Me" color="primary" IsBlock={true}/>
      <br />
      <PrimaryButton type="button" value="Click Me" color="secondary" IsBlock={true}/>
      <br />
      <PrimaryButton type="button" value="Click Me" color="third" IsBlock={true}/>
      <br />
      <PrimaryButton type="button" value="Click Me" color="yellow" IsBlock={true}/>
    </>
  )
}

export default App
