import React from 'react'
import './TravelHistory.css'
import BusIcon from './images/fa6-solid_bus.png'
import BusIcon2 from './images/Group 391.png'
import PrimaryButton from '../Components/Buttons/PrimaryButton'

function TravelHistory() {
  return (
    <>
    <div className='row p-5 rounded-4 sec shadow m-4'>
        <div className='col-lg-2'>
            <img src={BusIcon} alt="BusIcon" />
        </div>
        <div className='col-lg-2'>
            <h5>Colomo</h5>
            <p>oct 10, 5:50am</p>
        </div>
        <div className='col-lg-2'>
            <img src={BusIcon2} alt="BusIcon2" />
        </div>
        <div className='col-lg-3'>
            <h5>Badulla</h5>
            <p>oct 10, 5:50am</p>
        </div>
        <div className='col-lg-3'>
            <PrimaryButton value="Give Feedback" type="button" color="primary"/>
        </div>
        
    </div>
    </>
  )
}

export default TravelHistory