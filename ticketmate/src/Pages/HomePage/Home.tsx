import React from 'react'
import TotalBlock from '../../Components/TravelSearchBlock/TotalBlock'
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar'
import './Home.css'
import Background from './assests/Bus-Train.png'
import HomeContent from '../../Components/HomePageContent/HomeContent'
const Home = () => {
  return (
    <div className='HomePage'>
        <div><PrimaryNavBar/></div>
        <div className='HomeBackground'> <img src={Background} alt="Background" /></div>
        <div className='SearchTravel'><TotalBlock/></div>
        <br /> <br /> <br /> <br /> <br /> 
        <div className='para1'>
           <HomeContent/>
            
        </div>
    </div>
  )
}

export default Home
