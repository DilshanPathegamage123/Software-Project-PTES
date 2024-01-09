// App.tsx
import React from 'react';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
  <>
    
      
        <div>
          <Routes>
            <Route path='/'  element={<Home/>} />
            <Route path='/SignIn' element={<SignIn/>} />
            <Route path='/SignUP' element={<SignUp></SignUp>} />
            </Routes>
        </div>
      
  </>
  );
}

export default App;
