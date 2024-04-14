import React from 'react'
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar'
import ProfileSection from '../../Components/ProfileSection/ProfileSection'
import SquareButton from '../../Components/Buttons/SquareButton/SquareButton'
import PrimaryButton from '../../Components/Buttons/PrimaryButton'
import './AdminPage.css'
import Footer from '../../Components/Footer/Footer';
import { useEffect, useState } from 'react'

function AdminPage() {
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         
        </div>
        <Footer/>
        
    </>
  )
}

export default AdminPage
