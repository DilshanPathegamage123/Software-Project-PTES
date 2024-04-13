import React from 'react'
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar'
import ProfileSection from '../../Components/ProfileSection/ProfileSection'
import SquareButton from '../../Components/Buttons/SquareButton/SquareButton'
import './BusOwnerPage.css'
import Footer from '../../Components/Footer/Footer'

function BusOwnerPage() {
  return (
    <>
        <PrimaryNavBar/>
        <div className='container-fluid pt-3'>
          <div>
            <ProfileSection/>
          </div>
          <div className='row'>
            <div className='col-lg-2'>
              <div>
                <SquareButton text="Register a new Bus" link="/BusRegistrationPage"/>
              </div>
              <div>
                <SquareButton text="Create a new travel session" link="/BusRegistrationPage"/>
              </div>  
            </div>

            <div className='col-lg-10 rounded-4'>
             
            </div>
          </div>
          
            
        </div>
        <Footer/>
        
    </>
  )
}

export default BusOwnerPage
