import PrimaryNavBar from "../Components/NavBar/PrimaryNavBar";
import ProfileSection from "./ProfileSection";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Footer from "../Components/Footer/footer";
import Notification from "./Notification";
import { useEffect, useState } from 'react'

function Passenger() {
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
            
            <div className='col-lg-12 col-sm-10 rounded-4 p-3 px-4'>
              <div className='d-flex flex-row'>
                <PrimaryButton value="My Bookings" color="secondary"></PrimaryButton>
                <PrimaryButton value="Travel History" color="secondary"></PrimaryButton>
                <PrimaryButton value="Notifications" color="primary"></PrimaryButton>
              </div>
              <div className='p-4 rounded-4' style={{background:"#F1F1F1"}}>
                <Notification/>
                <Notification/>
                <Notification/>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
        
    </>
  )
}




export default Passenger;