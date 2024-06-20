// import React from 'react'
import './footer.css'
import f_logo from '../../assets/icon1.png'
import i_logo from '../../assets/icon2.png'
import t_logo from '../../assets/icon3.png'

function Footer() {
  return (

      <div className='futter mt-3'>
        <div className="container">
        <footer className="py-3 mb-0 mt-4">
            <div className='row h-auto'>
            <div className='col'>
            <ul className="nav justify-content-left pb-3 mb-3">
                <li className="nav-item"><a href="#" className="nav-link px-2">About us</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2">Discover</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2">Explore</a></li>
            </ul>
            </div>
            <div className='col'>
            <ul className="nav justify-content-end pb-3 mb-3">
                <li className="nav-item"><img src={f_logo} alt="Icon 1" /></li>
                <li className="nav-item"><img src={i_logo} alt="Icon 2" /></li>
                <li className="nav-item"><img src={t_logo} alt="Icon 3" /></li>
            </ul>
            </div>
            </div>
            

            <ul className="nav justify-content-end border-top pb-2 mb-3 pt-2">
            <li className="nav-item"><a href="#" className="text-white fs-6 fw-normal font-family-Inter m-0 px-3 py-2">Terms of Service</a></li>
            <li className="nav-item"><a href="#" className="text-white fs-6 fw-normal font-family-Inter m-0 px-3 py-2">Privacy Policy</a></li>
            </ul>
            {/* nav-link px-2 text-muted */}
        </footer>
        </div>
    </div>
  )
}

export default Footer