import { useState } from 'react'
import { BrowserRouter as Router, Route, Link, BrowserRouter ,Routes} from 'react-router-dom';
import LoginPage from './pages/loginPage/loginPage'
import PassengerForm from './pages/registration_pages/passenger_form'
import PassengerFormComponent from './pages/registration_pages/passengerFormComponent';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
    <Routes>
     
      <Route path="/passenger_form" element={<PassengerForm />} />
    </Routes>
    </BrowserRouter>
     
    
    
     
      
  
      

    </>
  )
}

export default App
