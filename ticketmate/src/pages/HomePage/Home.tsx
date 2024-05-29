import React from 'react'
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <PrimaryNavBar />
      <Link to="/LoginPage"><button className='btn btn-primary d-flex justify-content-center'>Log in</button></Link>
    </>
  )
}

export default Home

