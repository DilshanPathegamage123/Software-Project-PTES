import React from 'react'
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar'
import ProfileSection from '../../Components/ProfileSection/ProfileSection'
import SquareButton from '../../Components/Buttons/SquareButton/SquareButton'
import PrimaryButton from '../../Components/Buttons/PrimaryButton'
import './BusOwnerPage.css'
import Footer from '../../Components/Footer/footer';
import { useEffect, useState } from 'react'
import ScheduledBusInfo from '../../Components/ScheduledBusInfo/ScheduledBusInfo'

function BusOwnerPage() {
  const [divWidth, setDivWidth] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      const width = document.getElementById('getWidth')?.offsetWidth;
      setDivWidth(width || 0);
    }

    handleResize(); // Get initial width
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
        <PrimaryNavBar/>
        <div className='container-fluid pt-3'>
          <div>
            <ProfileSection/>
          </div>
          <div className='row'>

            <div className='col-lg-2 col-sm-4 m-0'id="getWidth">
              <div>
                <SquareButton text="Register a Bus" link="/BusRegistrationPage" bwidth={divWidth}/>
              </div>
              <div>
                <SquareButton text="Schedule a new travel journey" link="/BusRegistrationPage" bwidth={divWidth}/>
              </div>  
            </div>
            <div className='col-lg-10 col-sm-8 rounded-4 p-3 px-4'>
              <div className='d-flex flex-row'>
                <PrimaryButton value="Scheduled buses" color="primary"></PrimaryButton>
                <PrimaryButton value="Registered Buses" color="secondary"></PrimaryButton>
                <PrimaryButton value="Reports" color="secondary"></PrimaryButton>
              </div>
              <div className='p-4 rounded-4' style={{background:"#F1F1F1"}}>
                <ScheduledBusInfo/>
                <ScheduledBusInfo/>
                <ScheduledBusInfo/>
              </div>
            </div>
          </div>

        </div>
        <Footer/>
        
    </>
  )
}

export default BusOwnerPage
