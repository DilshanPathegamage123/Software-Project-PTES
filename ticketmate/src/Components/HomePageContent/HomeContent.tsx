import React from 'react'
import './HomeContent.css'
import HomeImg1 from './AssertHomePage/HomeImg2.png'

export default function HomeContent() {
  return (
    <div>
    <div className='HomeContent'>
      <div className='HomeTextContent1'>
        <div className='para1'>
          <h2><b> Welcome to TicketMate Booking Hub </b> </h2>
        </div> 
<br />
        <div className='para2'>
          <h5>Simplifying Your Daily Commute</h5>
        </div>
<br />
        <div className='para3'>
            <p>TicketMate is your go-to platform for effortless 
                daily travel. Say goodbye <br /> to the complexities of 
                daily commuting and embrace a stress-free <br /> journey 
                with our comprehensive public transport booking system</p>
        </div>
      </div>

       <div className='HomeImg1'>
        <img src= {HomeImg1} alt="HomeImg1" />
       </div>


    </div>
        


      </div>
    
  )
}
