import React from 'react'
import StartLocationSelector from './StartLocationSelector'
import EndLocationSelector from './EndLocationSelector'
import './TotalBlock.css'
import VehicleType from './VehicleType'
import DatePicker from './DatePicker'
import SearchButton from './SearchButton'

export default function TotalBlock() {
  return (
    <div className='TotalBlock'>
    
       <div className='item1'><VehicleType/></div>
       <div className='item1'><StartLocationSelector/></div>

       <div className='item1'><EndLocationSelector/></div>

       <div className='item1'><DatePicker/></div>

       <div className='item1'><SearchButton/></div>

    </div>
  )
}
