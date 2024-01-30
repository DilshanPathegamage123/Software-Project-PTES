import React from 'react'
import './VehicleType.css'

function VehicleType  () {
  return (
    <div className='VahicleType'>
      <div className="dropdown">
  <button className=" btn  dropdown-toggle class3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Select Vehicle Type
  </button>
  <ul className="dropdown-menu ">
    <li><a className="dropdown-item" href="#">Bus</a></li>
    <li><a className="dropdown-item" href="#">Train</a></li>
    
  </ul>
</div>
</div>
  )
}

export default VehicleType
